import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { CartItem, Guitar, GuitarID } from "../types/index";

function useCart() {
  const initialCart = (): CartItem[] => {
    const localSorageCart = localStorage.getItem("cart");
    return localSorageCart ? JSON.parse(localSorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Guitar) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      const ubdateCart = [...cart];
      ubdateCart[itemExist].cantidad++;
      setCart(ubdateCart);
    } else {
      const newItem: CartItem = { ...item, cantidad: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: GuitarID) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const incrementarItems = (id: GuitarID) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.cantidad < 10) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const decrementarItems = (id: GuitarID) => {
    const updateCart = cart.map((item) => {
      if (item.id === id) {
        if (item.cantidad === 1) {
          removeFromCart(id);
        } else {
          return {
            ...item,
            cantidad: item.cantidad - 1,
          };
        }
      }
      return item;
    });
    setCart(updateCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  // state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.cantidad * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    incrementarItems,
    decrementarItems,
    clearCart,
    isEmpty,
    cartTotal,
  };
}
export default useCart;
