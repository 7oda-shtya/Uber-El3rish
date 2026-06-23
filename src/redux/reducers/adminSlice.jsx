import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "عبدالعزيز محمد",
	phone: "01098765432",
	username: "admin_aziz",
	E_mail:"admin@example.com",
	officeAddress: "شارع التحرير - القاهرة",
	password: "********",
};
const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {

	}
});
export const { } = adminSlice.actions;
export default adminSlice.reducer;