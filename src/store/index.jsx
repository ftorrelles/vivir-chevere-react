import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoading.slice";
import customersSlice from "./slices/customers.slice";
import selectedCustomerSlice from "./slices/selectedCustomer.slice";

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        customers: customersSlice,
        selectedCustomer: selectedCustomerSlice,
    },
});
