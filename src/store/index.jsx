import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoading.slice";
import customersSlice from "./slices/customers.slice";
import selectedCustomerSlice from "./slices/selectedCustomer.slice";
import statusEmailCodeSlice from "./slices/statusEmailCode.slice";
import loggedUserSlice from "./slices/loggedUser.slice";
import selectedCustomerForMovementsSlice from "./slices/selectedCustomerForMovements.slice";
import addToCartSlice from "./slices/addToCart.slice";
import selectedProductSlice from "./slices/selectedProduct.slice";

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        customers: customersSlice,
        selectedCustomer: selectedCustomerSlice,
        statusEmailCode: statusEmailCodeSlice,
        loggedUser: loggedUserSlice,
        selectedCustomerForMovements: selectedCustomerForMovementsSlice,
        addToCart: addToCartSlice,
        selectedProduct: selectedProductSlice,
    },
});
