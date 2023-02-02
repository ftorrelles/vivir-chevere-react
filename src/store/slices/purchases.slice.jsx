import { createSlice } from "@reduxjs/toolkit";

export const purchasesSlice = createSlice({
    name: "purchases",
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload;
        },
    },
});

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
