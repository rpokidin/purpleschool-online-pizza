import { configureStore } from "@reduxjs/toolkit";
import { JWT_PERSISTENT_STATE, userSlice } from "./user.slice";
import { CART_PERSISTENT_STATE, cartSlice } from "./cart.slice";
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer
  }
})

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE)
  saveState(store.getState().cart, CART_PERSISTENT_STATE)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch