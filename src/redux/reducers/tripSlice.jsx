import { createSlice } from '@reduxjs/toolkit';
import { distanceMeters } from '../../utils/geo';

// الحالات اللي تعتبر "رحلة شغالة" - طالما الرحلة في واحدة منهم العميل ميقدرش يطلب رحلة جديدة
export const ACTIVE_TRIP_STATUSES = ['pending', 'ongoing'];

// نطاق المنطقة المسماة - أي نقطة جوه الدايرة دي بتاخد نفس الاسم
export const NAMED_AREA_RADIUS_M = 20;

// بيدور على أقرب منطقة متسماة قبل كدا حوالين النقطة دي (لو موجودة)
export const findNamedArea = (namedAreas, lat, lng) => namedAreas.find(area => distanceMeters(area, { lat, lng }) <= area.radiusM) || null;

const emptyTrip = () => ({
  id: null,
  clientId: null,
  driverId: null,
  driverName: null,
  car: null,
  startPin: null,
  endPin: null,
  waypoints: [],
  route: null, // { coordinates, distanceKm, durationMin, price } - جاي من OSRM
  status: 'idle', // idle | pending | ongoing | completed | cancelled
  price: 0,
  ridersCount: 1,
  createdAt: null,
  startTime: null,
});

const toHistoryEntry = (trip, status) => ({
  id: trip.id || `trip_${Date.now()}`,
  clientId: trip.clientId,
  startPin: trip.startPin,
  endPin: trip.endPin,
  waypoints: trip.waypoints,
  driverName: trip.driverName,
  car: trip.car,
  price: trip.price,
  distanceKm: trip.route?.distanceKm,
  durationMin: trip.route?.durationMin,
  date: new Date().toLocaleDateString('ar-EG'),
  time: new Date().toLocaleTimeString('ar-EG'),
  status,
});

const initialState = {
  currentTrip: emptyTrip(),
  savedTrips: [
    // هنا سيتم حفظ الرحلات
  ],
  // أسماء المناطق المقترحة من اليوزرز - لحد ما يبقى فيه لوحة أدمن تدير اللستة دي رسميًا
  namedAreas: [
    // { id, lat, lng, radiusM: 20, name, suggestions: [{ name, at }] }
  ],
  offers: [
    { id: 'o_1', driverId: 'd_50', driverName: 'أحمد منصور', price: 50, rate: 4.8, car: 'فيرنا فيراني', timeToReach: '4 دقائق', startTime: '3:05 PM' },
    { id: 'o_2', driverId: 'd_62', driverName: 'إسلام علوان', price: 55, rate: 4.9, car: 'لانوس بيضاء', timeToReach: '6 دقائق', startTime: '3:15 PM' },
  ],
  history: [
    { id: 'trip_098', clientId: 'a_01', startPin: { name: 'ميدان رمسيس', lat: 30.0444, lng: 31.2357 }, endPin: { name: 'مدينة نصر', lat: 30.1211, lng: 31.3452 }, waypoints: [], driverName: 'أحمد منصور', car: 'فيرنا فيراني', price: 45, date: '2024-06-12', time: '3:30 PM', status: 'completed' },
    { id: 'trip_095', clientId: 'a_01', startPin: { name: 'المعادي', lat: 29.9561, lng: 31.22 }, endPin: { name: 'وسط البلد', lat: 30.0611, lng: 31.2446 }, waypoints: [], driverName: 'إسلام علوان', car: 'لانوس بيضاء', price: 38, date: '2024-06-09', time: '11:10 AM', status: 'completed' },
    { id: 'trip_090', clientId: 'a_01', startPin: { name: 'الدقي', lat: 30.0794, lng: 31.1997 }, endPin: { name: 'مدينة نصر', lat: 30.1211, lng: 31.3452 }, waypoints: [], driverName: 'محمود سعيد', car: 'تويوتا كورولا', price: 0, date: '2024-06-02', time: '8:00 PM', status: 'cancelled' },
  ],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    updateStartPin: (state, action) => {
      state.currentTrip.startPin = action.payload;
    },
    updateEndPin: (state, action) => {
      state.currentTrip.endPin = action.payload;
    },
    addWaypoint: (state, action) => {
      state.currentTrip.waypoints.push(action.payload);
    },
    updateWaypoint: (state, action) => {
      const { index, pin } = action.payload;
      state.currentTrip.waypoints[index] = pin;
    },
    removeWaypoint: (state, action) => {
      state.currentTrip.waypoints.splice(action.payload, 1);
    },
    clearWaypoints: state => {
      state.currentTrip.waypoints = [];
    },
    setRoute: (state, action) => {
      state.currentTrip.route = action.payload;
    },
    saveTrip: (state, action) => {
      const newTrip = {
        ...action.payload,
        id: `saved_${Date.now()}`,
        createdAt: new Date().toLocaleString('ar-EG'),
        status: 'saved',
      };
      state.savedTrips.unshift(newTrip);
    },
    removeSavedTrip: (state, action) => {
      state.savedTrips = state.savedTrips.filter(t => t.id !== action.payload);
    },
    // يحمّل رحلة محفوظة في الرحلة الحالية عشان اليوزر يطلبها تاني من غير ما يعيد تحديد النقط
    loadSavedTrip: (state, action) => {
      const saved = action.payload;
      state.currentTrip.startPin = saved.startPin;
      state.currentTrip.endPin = saved.endPin;
      state.currentTrip.waypoints = saved.waypoints || [];
      state.currentTrip.route = null;
    },
    // اقتراح اسم لمنطقة غير معروفة - مؤقتًا بيتقبل الاسم على طول لحد ما تتجهز لوحة الأدمن لمراجعة/اختيار الاسم من اللستة
    // TODO: لما لوحة الأدمن تجهز، الاسم المعروض للمستخدمين لازم يتحول لاسم "معتمد من الأدمن" بدل أول اقتراح بيوصل
    suggestAreaName: (state, action) => {
      const { lat, lng, name } = action.payload;
      const trimmedName = name.trim();
      if (!trimmedName) return;
      const existing = findNamedArea(state.namedAreas, lat, lng);
      if (existing) {
        existing.suggestions.push({ name: trimmedName, at: new Date().toLocaleString('ar-EG') });
        if (!existing.name) existing.name = trimmedName;
      } else {
        state.namedAreas.push({
          id: `area_${Date.now()}`,
          lat,
          lng,
          radiusM: NAMED_AREA_RADIUS_M,
          name: trimmedName,
          suggestions: [{ name: trimmedName, at: new Date().toLocaleString('ar-EG') }],
        });
      }
    },
    // ... داخل الـ reducers في tripSlice.js


    requestTrip: (state, action) => {
      const { clientId, price, startTime, pickupDistanceM, farFromPickupNote, scheduledTime, customerNote, passengerCount } = action.payload;

      // تحديث الـ currentTrip ببيانات الطلب
      state.currentTrip = {
        ...state.currentTrip,
        status: 'pending',
        id: `TRIP_${Date.now()}`,
        clientId: clientId,
        price: price,
        // حفظ وقت الطلب وتاريخه
        requestedStartTime: startTime || new Date().toLocaleTimeString('ar-EG'),
        createdAt: new Date().toISOString(), // تنسيق ISO للتعامل الأسهل برمجياً
        pickupDistanceM: pickupDistanceM,
        farFromPickupNote: farFromPickupNote,
        scheduledTime: scheduledTime || null,
        customerNote: customerNote || null,
        passengerCount: passengerCount || state.currentTrip.ridersCount || 1,
      };

      // ممكن هنا نفضي العروض القديمة أو نجهزها لاستقبال عروض جديدة
      state.offers = [];
    },

    acceptOffer: (state, action) => {
      const offer = action.payload;
      // بنحدث حالة الرحلة لـ ongoing وبنربطها ببيانات السواق
      state.currentTrip = {
        ...state.currentTrip,
        driverId: offer.driverId,
        driverName: offer.driverName,
        car: offer.car,
        price: offer.price,
        status: 'ongoing',
      };
    },

    cancelTrip: state => {
      // قبل ما نصفر الرحلة، بنضيفها للهيستوري
      if (state.currentTrip.startPin) {
        state.history.unshift(toHistoryEntry(state.currentTrip, 'cancelled'));
      }
      state.currentTrip = emptyTrip(); // إعادة الستيت لحالتها الفاضية
    },
    // TODO: مؤقت لحد ما الباكاند يبعت إشعار إنهاء حقيقي من تطبيق السائق - هنا بنخلص الرحلة يدويًا
    completeTrip: state => {
      state.history.unshift(toHistoryEntry(state.currentTrip, 'completed'));
      state.currentTrip = emptyTrip();
    },
    addTripToHistory: (state, action) => {
      state.history.unshift(action.payload);
    },
    clearCurrentTrip: state => {
      state.currentTrip = emptyTrip();
    },
  },
});

export const { updateStartPin, updateEndPin, addWaypoint, updateWaypoint, removeWaypoint, clearWaypoints, setRoute, saveTrip, removeSavedTrip, loadSavedTrip, suggestAreaName, requestTrip, acceptOffer, cancelTrip, completeTrip, addTripToHistory, clearCurrentTrip } = tripSlice.actions;

export default tripSlice.reducer;
