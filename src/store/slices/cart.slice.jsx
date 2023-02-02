import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";
import getConfig from "../../utils/getConfig";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        },
    },
});

export const getCarThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then((resp) => {
            /*console.log(resp.data.data);*/
            dispatch(setCart(resp.data.data));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const cartThunk = (cart) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .post(
            "https://e-commerce-api.academlo.tech/api/v1/cart",
            cart,
            getConfig()
        )
        .then((resp) => dispatch(getCarThunk()))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
