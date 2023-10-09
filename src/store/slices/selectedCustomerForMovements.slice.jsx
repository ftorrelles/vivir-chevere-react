import { createSlice } from "@reduxjs/toolkit";

export const selectedCustomerForMovementsSlice = createSlice({
    name: "selectedCustomerForMovements",
    initialState: null,
    reducers: {
        setSelectedCustomerForMovements: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSelectedCustomerForMovements } =
    selectedCustomerForMovementsSlice.actions;

export default selectedCustomerForMovementsSlice.reducer;
