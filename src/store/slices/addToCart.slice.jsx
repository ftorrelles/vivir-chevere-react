import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
    name: "addToCart",
    initialState: {},
    reducers: {
        setAddToCart: (state, action) => {
            return action.payload;
        },
    },
});

export const { setAddToCart } = addToCartSlice.actions;

export default addToCartSlice.reducer;
