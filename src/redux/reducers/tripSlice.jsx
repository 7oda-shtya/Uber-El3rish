import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentTrip: {
		id: "trip_001",
		clientId: "c_99",
		driverId: null,
		from: { lat: 31.132, lng: 33.803, name: "ميدان الرفاعي - العريش" },
		to: { lat: 31.115, lng: 33.752, name: "جامعة سيناء - المساعيد" },
		status: "pending",
		price: 0,
		ridersCount: 1,
		createdAt: "2:30 PM",
		startTime: "3:00 PM",
	},
	offers: [
		{ id: "o_1", driverId: "d_50", driverName: "أحمد منصور", price: 50, rate: 4.8, car: "فيرنا فيراني", timeToReach: "4 دقائق", startTime: "3:05 PM" },
		{ id: "o_2", driverId: "d_62", driverName: "إسلام علوان", price: 55, rate: 4.9, car: "لانوس بيضاء", timeToReach: "6 دقائق", startTime: "3:15 PM" }
	],
	history: [
		{ id: "trip_098", from: { name: "ميدان رمسيس" }, to: { name: "مدينة نصر" }, driverName: "أحمد منصور", car: "فيرنا فيراني", price: 45, date: "2024-06-12", time: "3:30 PM", status: "completed" },
		{ id: "trip_095", from: { name: "المعادي" }, to: { name: "وسط البلد" }, driverName: "إسلام علوان", car: "لانوس بيضاء", price: 38, date: "2024-06-09", time: "11:10 AM", status: "completed" },
		{ id: "trip_090", from: { name: "الدقي" }, to: { name: "مدينة نصر" }, driverName: "محمود سعيد", car: "تويوتا كورولا", price: 0, date: "2024-06-02", time: "8:00 PM", status: "cancelled" },
	],
};
const tripSlice = createSlice({
	name: "trip",
	initialState,
	reducers: {
		addTripToHistory: (state, action) => {
			state.history.unshift(action.payload)
		},
	}
});
export const { addTripToHistory } = tripSlice.actions;
export default tripSlice.reducer;