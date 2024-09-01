import { saveAsyncStorage } from "@/src/utils/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favoriteIds: string[];
}

const initialState: FavoriteState = {
  favoriteIds: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
        saveAsyncStorage("favorites", state.favoriteIds);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => id !== action.payload
      );
      saveAsyncStorage("favorites", state.favoriteIds);
    },
    setFavorites(state, action: PayloadAction<string[]>) {
      state.favoriteIds = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
