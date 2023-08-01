import { createSlice } from "@reduxjs/toolkit";

export const selectedCustomerSlice = createSlice({
    name: "selectedCustomer",
    initialState: null,
    reducers: {
        setSelectedCustomer: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSelectedCustomer } = selectedCustomerSlice.actions;

export default selectedCustomerSlice.reducer;
