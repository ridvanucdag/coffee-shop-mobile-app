import { Coffee } from "@/src/type/coffee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// CoffeeState arayüzünü güncelle
interface CoffeeState {
  coffees: Coffee[];
}

// Başlangıç durumu tanımlandı
const initialState: CoffeeState = {
  coffees: [],
};

const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {
    setCoffees(state, action: PayloadAction<Coffee[]>) {
      state.coffees = action.payload.map((coffee) => ({
        ...coffee,
        quantity: 1,
      }));
    },
    toggleFavourite(state, action: PayloadAction<string>) {
      const coffee = state.coffees.find((c) => c.id === action.payload);
      if (coffee) {
        coffee.favourite = !coffee.favourite;
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const coffee = state.coffees.find((c) => c.id === action.payload.id);
      if (coffee) {
        coffee.quantity = action.payload.quantity;
      }
    },
  },
});

export const { setCoffees, toggleFavourite, updateQuantity } =
  coffeeSlice.actions;
export default coffeeSlice.reducer;
