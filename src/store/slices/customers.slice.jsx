import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";

export const customersSlice = createSlice({
    name: "customers",
    initialState: [],
    reducers: {
        setCustomers: (state, action) => {
            return action.payload;
        },
    },
});

export const getCustomersThunk = () => (dispatch) => {
    const config = getConfig();
    dispatch(setIsLoading(true));
    axios
        .get("http://localhost:3000/api/v1/customers", config)
        .then((resp) => dispatch(setCustomers(resp.data)))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const filterCustomersThunk = (filterOptions) => (dispatch) => {
    const config = getConfig();
    dispatch(setIsLoading(true));
    axios
        .get("http://localhost:3000/api/v1/customers", {
            params: filterOptions,
            ...config,
        })
        .then((resp) => dispatch(setCustomers(resp.data)))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const { setCustomers } = customersSlice.actions;

export default customersSlice.reducer;
