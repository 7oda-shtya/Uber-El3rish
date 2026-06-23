import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  ratesList: [
    {
      id: "r-1",
      rateerName: "الكابتن أحمد السويركي",
      rateedId: "c_1", 
      tripId: "trip-101",
      date: "2026-06-21"
    },
    {
      id: "r-2",
      rateerName: "الكابتن محمد شتية",
      rateedId: "c_1", 
      tripId: "trip-204",
      date: "2026-06-19"
    },
    {
      id: "r-3",
      rateerName: "الكابتن إبراهيم علي",
      rateedId: "c_2", 
      tripId: "trip-300",
      comment: "العميل كان يتحدث بحدة.",
      date: "2026-06-15"
    }
  ]
}
console.log( new Date().toISOString().split('T')[0])

const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    addrate: (state, action) => {
      const newrate = {
        id: `r_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...action.payload
      }
      state.ratesList.push(newrate)
    },
    deleterate: (state, action) => {
      state.ratesList = state.ratesList.filter(rate => rate.id !== action.payload)
    }
  }
})

export const { addrate, deleterate } = ratesSlice.actions
export default ratesSlice.reducer