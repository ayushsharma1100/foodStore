'use client'
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({children}) {
    const [cart, setCart] = useState([]);
    function addToCart(item) {
        setCart(item);
    }
    function deleteIndex(idx) {
        let temp = cart?.filter((it, id)=>id!==idx);
        setCart(temp);
        localStorage.setItem('cart', JSON.stringify(temp));
    }
    function totalPrice(item) {
        let price = +item?.basePrice;
        if(item?.selectedSize?.price) price+= +item?.selectedSize?.price;
        if(item?.selectedIngredients?.length) item?.selectedIngredients?.map(it=>price+= +it?.price)
        return price;
    }
    return (
        <CartContext.Provider value={{cart, addToCart, totalPrice, deleteIndex}}>
            {children}
        </CartContext.Provider>
    );
}