// خدمات الخرائط - Nominatim للبحث/الأسماء و OSRM لحساب الطريق الفعلي
// كلاهما مجاني وما يحتاج API key، بنناديهم مباشرة من الفرونت حاليًا
// TODO: لما الباكاند يجهز، الأفضل تتحول الطلبات دي لسيرفرنا (proxy + كاش) بدل النداء المباشر من المتصفح
// TODO: الراوتنج هنا مبني على OSRM المجاني كحل مبدئي بس - لما تتركب مكتبة الطرق الأدق المنوي استخدامها، فقط استبدل fetchRoute بنداء المكتبة الجديدة مع نفس الشكل الراجع { coordinates, distanceKm, durationMin }
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';
const OSRM_URL = 'https://router.project-osrm.org';

// محيط مدينة العريش تقريبًا - لتحسين نتائج البحث (مش إلزامي)
const EL_ARISH_VIEWBOX = '33.6,31.3,34.0,31.0';

// حقول العنوان اللي تعتبر "اسم منطقة محلي" - مقصودًا مستبعدين المحافظة/المدينة/الدولة
const LOCAL_NAME_FIELDS = ['neighbourhood', 'suburb', 'quarter', 'residential', 'hamlet', 'village', 'road'];

function extractLocalName(address) {
  if (!address) return null;
  for (const field of LOCAL_NAME_FIELDS) {
    if (address[field]) return address[field];
  }
  return null;
}

// المسافة بين نقطتين بالمتر (Haversine)
export function distanceMeters(a, b) {
  if (!a || !b) return Infinity;
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h = sinDLat * sinDLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// رجوع اسم محلي بس (بدون مدينة/محافظة) - لو مفيش اسم واضح بيرجع localName: null عشان نطلب من اليوزر يقترح اسم
export async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(`${NOMINATIM_URL}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=ar`);
    if (!res.ok) throw new Error('reverse geocode failed');
    const data = await res.json();
    return { localName: extractLocalName(data.address), fullName: data.display_name || null };
  } catch {
    return { localName: null, fullName: null };
  }
}

export async function searchPlaces(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const params = new URLSearchParams({
      format: 'jsonv2',
      q: query,
      'accept-language': 'ar',
      limit: '6',
      addressdetails: '1',
      viewbox: EL_ARISH_VIEWBOX,
    });
    const res = await fetch(`${NOMINATIM_URL}/search?${params.toString()}`);
    if (!res.ok) throw new Error('search failed');
    const data = await res.json();
    return data.map((item) => ({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      localName: extractLocalName(item.address),
      fullName: item.display_name,
    }));
  } catch {
    return [];
  }
}

// points: [{lat, lng}, ...] بالترتيب من نقطة الانطلاق للنهاية (وبينهم المحطات لو موجودة)
// بيرجع مصفوفة خيارات طريق (الأساسي + بدائل لو OSRM لقى أي طريق تاني)، كل خيار { coordinates, distanceKm, durationMin }
export async function fetchRouteOptions(points) {
  if (!points || points.length < 2) return [];
  const coordsParam = points.map((p) => `${p.lng},${p.lat}`).join(';');
  try {
    const res = await fetch(`${OSRM_URL}/route/v1/driving/${coordsParam}?overview=full&geometries=geojson&alternatives=true`);
    if (!res.ok) throw new Error('route failed');
    const data = await res.json();
    const routes = data.routes || [];
    return routes.map((route) => ({
      coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
      distanceKm: route.distance / 1000,
      durationMin: route.duration / 60,
    }));
  } catch {
    return [];
  }
}

// تقدير سعر مبدئي للعرض على اليوزر فقط - التسعير الحقيقي هيحسبه الباكاند
// TODO: لما الباكاند يجهز، السعر ده هيتحط بمنطق تسعير حقيقي (وقت/مسافة/طلب) بدل الصيغة المبسطة دي
export function estimateFare(distanceKm = 0) {
  const base = 10;
  const perKm = 3.5;
  return Math.max(base, Math.round(base + distanceKm * perKm));
}
