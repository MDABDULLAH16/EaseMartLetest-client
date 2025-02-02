import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "@/types/TProducts";
import { toast } from "react-toastify";

// Utility function to sync cart to localStorage
const syncCartToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

// Load cart items from localStorage when app initializes
const loadCartFromLocalStorage = (userId: string): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const allItems: CartItem[] = JSON.parse(savedCart);
        return allItems.filter((item) => item.userId === userId); // Filter by userId
      } catch {
        console.error("Failed to parse cart data from localStorage.");
      }
    }
  }
  return [];
};

export interface CartItem extends TProduct {
  userId: string; // Add userId to associate the cart item with a specific user
}

interface CartState {
  items: CartItem[];
}

const getUserFromStorage = (): string | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("userInfo");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && typeof parsedUser.id === "string") {
          return parsedUser.id;
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }
  return null;
};

const currentUser = getUserFromStorage();

const initialState: CartState = {
  items: currentUser ? loadCartFromLocalStorage(currentUser) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: TProduct; userId: string }>) => {
      const { product, userId } = action.payload;

      const existingItem = state.items.find(
        (cartItem) => cartItem._id === product._id && cartItem.userId === userId
      );

      if (existingItem) {
        toast.warning("This product is already added to your cart.");
      } else {
        state.items.push({ ...product, userId, stockQuantity: 1 });
        toast.success("Product added to cart successfully!")
      }

      syncCartToLocalStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number; userId: string }>
    ) => {
      const { id, quantity, userId } = action.payload;

      const existingItem = state.items.find(
        (item) => item._id === id && item.userId === userId
      );

      if (existingItem && quantity > 0) {
        existingItem.stockQuantity = quantity;
      }

      syncCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; userId: string }>) => {
      const { id, userId } = action.payload;

      state.items = state.items.filter(
        (item) => !(item._id === id && item.userId === userId)
      );

      syncCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      syncCartToLocalStorage(state.items);
    },
    clearCartForUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      state.items = state.items.filter((item) => item.userId !== userId);

      syncCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, clearCartForUser } =
  cartSlice.actions;

export default cartSlice.reducer;