import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "@/types/TProducts";
import { toast } from "react-toastify";

// Utility function to sync cart to localStorage
const syncCartToLocalStorage = (items: TProduct[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

// Load cart items from localStorage when app initializes
const loadCartFromLocalStorage = (): TProduct[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        console.error("Failed to parse cart data from localStorage.");
      }
    }
  }
  return [];
};

interface CartState {
  items: TProduct[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TProduct>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        // existingItem.stockQuantity += item.stockQuantity;
        toast.warning("this product already added");
      } else {
        state.items.push({ ...item });
      }

      // Sync to localStorage
      syncCartToLocalStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);

      if (existingItem && quantity > 0) {
        existingItem.stockQuantity = quantity;
      }

      // Sync to localStorage
      syncCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);

      // Sync to localStorage
      syncCartToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];

      // Sync to localStorage
      syncCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
