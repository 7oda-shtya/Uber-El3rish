import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "أحمد منصور",
	phone: "01012345678",
	car: {
		model: "فيرنا فيراني",
		plateNumber: "12345",

	},
	username: "ahmedmansour",
	ID: "d_50",
	old: 30,
	pic: "https://via.placeholder.com/150",
	password: "********",
	rates: {
		sent: [
			{ id: "rate_1", clientId: "c_99", driverId: "d_50", value: 5, comment: "سائق متعاون" },
			{ id: "rate_2", clientId: "c_99", driverId: "d_62", value: 4, comment: "خدمة جيدة" }
		],
		received: []
	},
	reports: {
		sent: [
			{ id: "report_1", clientId: "c_99", reason: "تأخر السائق عن الموعد المحدد", attachment: "https://via.placeholder.com/150", time: "2024-06-01 14:30" },
			{ id: "report_2", clientId: "c_99", reason: "السائق كان غير مهذب", attachment: "https://via.placeholder.com/150", time: "2024-06-01 14:30" }
		],
		received: []
	}

};
const driverSlice = createSlice({
	name: "driver",
	initialState,
	reducers: {
		updateDriverInfo: (state, action) => {
			Object.assign(state, action.payload)
		},
		addRate: (state, action) => {
			state.rates.sent.push({ id: `rate_${Date.now()}`, ...action.payload })
		},
		receiveRate: (state, action) => {
			state.rates.received.push({ id: `rate_${Date.now()}`, ...action.payload })
		},
		addReport: (state, action) => {
			state.reports.sent.push({ id: `report_${Date.now()}`, ...action.payload })
		},
		receiveReport: (state, action) => {
			state.reports.received.push({ id: `report_${Date.now()}`, ...action.payload })
		}
	}
});
export const { updateDriverInfo, addRate, receiveRate, addReport, receiveReport } = driverSlice.actions;
export default driverSlice.reducer;