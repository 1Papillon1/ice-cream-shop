import { configureStore, createSlice } from "@reduxjs/toolkit"
import cartReducer from "../icecreams/cartSlice";
import productsReducer from "../icecreams/productsSlice";





const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const selectIcecreams = (state:RootState) => state;

export default store;

