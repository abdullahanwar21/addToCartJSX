import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};
console.log(initialState);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const find = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    getCartTotal: (state) => {
      let { totalPrice, totalQuantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalQuantity: 0,
          totalPrice: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },
    increaseQuantity: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    },
    decreaseQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});
export const {
  addToCart,
  getCartTotal,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
