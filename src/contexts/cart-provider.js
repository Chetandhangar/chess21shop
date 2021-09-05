import {useState, useContext, createContext} from 'react';
import axios from 'axios';
import {useAuth} from './auth-context'

export const CartContext = createContext();

export function CartDataProvider({children}){
    const [cart,setCart] = useState(null)
    const carturl = "https://chess21-1.chetandhangar.repl.co/cart/add"
    const {token} = useAuth();
    async function addToCartHandlerContext(product){
       console.log("called from context", product)
       console.log(product._id , "product id from context")
        const response = await  axios.post(carturl,
            {productId : product._id},  
            {headers : {authorization : token}})
        console.log(response, "from server cart context")
    }

    return(
        <CartContext.Provider value={{cart, setCart, addToCartHandlerContext}}>
            {children}
        </CartContext.Provider>
    )
}

export function useDataCart(){
    return useContext(CartContext)
}