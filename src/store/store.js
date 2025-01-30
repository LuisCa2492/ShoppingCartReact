import { configureStore } from "@reduxjs/toolkit";
import { ShoppingCartSlice } from "./ShoppingCartSlice";

export const store = configureStore({
    reducer: {
        shopCart : ShoppingCartSlice.reducer,
    }
});