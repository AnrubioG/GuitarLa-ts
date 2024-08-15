import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localSorageCart = localStorage.getItem("cart");
  return localSorageCart ? JSON.parse(localSorageCart) : [];
};

export const initialSatate: CartState = {
  data: db,
  cart: initialCart(),
};

export const cartReducer = (
  state: CartState = initialSatate,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const itemExist = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );

    let updateCart: CartItem[] = [];

    if (itemExist) {
      updateCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.cantidad < 10) {
            return { ...item, cantidad: item.cantidad + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, cantidad: 1 };
      updateCart = [...state.cart, newItem];
    }
    return {
      ...state,
      cart: updateCart,
    };
  }

  if (action.type === "remove-from-cart") {
    const cart = state.cart.filter((item) => item.id !== action.payload.id);
    return {
      ...state,
      cart,
    };
  }

  if (action.type === "decrease-quantity") {
    let updateCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.cantidad > 1) {
        return {
          ...item,
          cantidad: item.cantidad - 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: updateCart,
    };
  }

  if (action.type === "increase-quantity") {
    const updateCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.cantidad < 10) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: updateCart,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
