import {useState, useContext, createContext} from 'react';
import axios from 'axios';
import {useAuth} from './auth-context'

export const CartContext = createContext();

export function CartDataProvider({children}){
    const [cart,setCart] = useState(null)
    const addtocarturl = "https://chess21-1.chetandhangar.repl.co/cart/add"
    const removefromcarturl = "https://chess21-1.chetandhangar.repl.co/cart/remove"
    const {token} = useAuth();

    async function addToCartHandlerContext(product){
       console.log("called from context", product)
       console.log(product._id , "product id from context")
       try{
        const response = await  axios.post(addtocarturl,
            {productId : product._id},  
            {headers : {authorization : token}})
            console.log(response, "from server cart context")
       }catch(error){
           console.error(error);
       }
    
        
    }

    async function removeFromCartHandler(product){
        try{
            const response = await axios.post(removefromcarturl,
                {productId : product._id},
                {headers : { authorization : token}})
                
                console.log(response,"from remove cart")
        }catch(error){
            console.log(error)
        }
    
    }

    return(
        <CartContext.Provider value={{cart, setCart, addToCartHandlerContext, removeFromCartHandler}}>
            {children}
        </CartContext.Provider>
    )
}

export function useDataCart(){
    return useContext(CartContext)
}