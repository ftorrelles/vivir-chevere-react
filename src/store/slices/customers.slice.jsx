import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";
import { setSelectedCustomer } from "./selectedCustomer.slice";

export const customersSlice = createSlice({
    name: "customers",
    initialState: [],
    reducers: {
        setCustomers: (state, action) => {
            return action.payload; // Actualizar el estado correctamente.
        },
    },
});

export const getCustomersThunk = () => (dispatch) => {
    const config = getConfig();
    dispatch(setIsLoading(true));
    axios
        .get(
            "https://back-end-vivirchevere.onrender.com/api/v1/customers",
            config
        )
        .then((resp) => dispatch(setCustomers(resp.data.customers)))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const filterCustomersThunk = (filterOptions) => (dispatch) => {
    const config = getConfig();
    dispatch(setIsLoading(true));
    axios
        .get("https://back-end-vivirchevere.onrender.com/api/v1/customers", {
            params: filterOptions,
            ...config,
        })
        .then((resp) => dispatch(setCustomers(resp.data.customers)))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const createCustomerThunk = (data) => (dispatch) => {
    // const config = getConfig();
    dispatch(setIsLoading(true));
    return axios
        .post(
            "https://back-end-vivirchevere.onrender.com/api/v1/customers",
            data
        )
        .then((resp) => {
            // console.log(resp);
            dispatch(getCustomersThunk());
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const updateCustomerThunk = (data) => (dispatch) => {
    const config = getConfig();
    dispatch(setIsLoading(true));
    return axios
        .patch(
            `https://back-end-vivirchevere.onrender.com/api/v1/customers/${data.id}`,
            data,
            config
        )
        .then((resp) => {
            // console.log(resp);
            dispatch(getCustomersThunk(), dispatch(setSelectedCustomer(null)));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const deleteCustomerThunk = (data) => (dispatch) => {
    const config = getConfig();
    dispatch(setIsLoading(true));
    return axios
        .delete(
            `https://back-end-vivirchevere.onrender.com/api/v1/customers/${data.id}`,
            config
        )
        .then(() => dispatch(getCustomersThunk()))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const { setCustomers } = customersSlice.actions;

export default customersSlice.reducer;
