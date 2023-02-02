import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./slices/isLoading.slice";
import productsSlice from "./slices/products.slice";
import cartSlice from "./slices/cart.slice";
import purchasesSlice from "./slices/purchases.slice";

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: productsSlice,
        cart: cartSlice,
        purchases: purchasesSlice,
    },
});
