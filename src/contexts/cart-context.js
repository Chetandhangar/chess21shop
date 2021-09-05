import React , {useState, useReducer, createContext, useContext} from 'react';
import axios from 'axios';
import {useAuth} from './auth-context';

export const CartContext = createContext();

export function CartDataProvider({children}){
    return(
        <CartContext.Provider>
            {children}
        </CartContext.Provider>
    )
}

export function useCartData(){
    return useContext(CartContext)
}