import { useContext, createContext, useState} from 'react';


export const CartContext = createContext();

export function CartProvider({children}){
    const [cartItem, setCartItem] = useState([]);
    
    return(
        <CartContext.Provider value={{cartItem,setCartItem}}> 
            {children}
        </CartContext.Provider>
    )
}


export function useCart(){
 return useContext(CartContext)
}