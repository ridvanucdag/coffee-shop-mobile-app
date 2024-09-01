import { configureStore } from "@reduxjs/toolkit";
import coffeeReducer from "./slices/coffeeSlice";
import favoriteReducer from "./slices/favoriteSlice";
import basketReducer from "./slices/basketSlice";

export const store = configureStore({
  reducer: {
    coffee: coffeeReducer,
    favorite: favoriteReducer,
    cart: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
