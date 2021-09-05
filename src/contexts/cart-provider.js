import {useState, useContext, createContext,useReducer} from 'react';
import axios from 'axios';
import {useAuth} from './auth-context'

export const CartContext = createContext();

export function CartDataProvider({children}){
   const [state,dispatchCart] = useReducer(reducer, ({
       cart  : []
   }))

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
            if(response.status === 200){
                dispatchCart({
                    type : "ADD_TO_CART",
                    payload : product
                })
            }
       }catch(error){
           console.error(error);
       }
    
        
    }

    async function removeFromCartHandler(product,quantity){
        try{
            const response = await axios.post(removefromcarturl,
                {productId : product._id},
                {headers : { authorization : token}})
                
                console.log(response,"from remove cart")
                if(response.status === 200){
                    dispatchCart({
                        type : "REMOVE_FROM_CART",
                        payload : product,
                        quantity
                    })
                }
        }catch(error){
            console.log(error)
        }
    
    }

    return(
        <CartContext.Provider value={{cart  : state.cart, 
        dispatchCart,
        addToCartHandlerContext,
        removeFromCartHandler}}>
            {children}
        </CartContext.Provider>
    )
}

export function useDataCart(){
    return useContext(CartContext)
}

export function reducer(state,{type,payload,quantity}){
    switch(type){
        case "UPDATE_CART" : {
            console.log(payload,'from update cart reducer')
            return{
                ...state,
                cart : [...payload]
            }
        }

        case "ADD_TO_CART" : {
            const prod = state.cart.find(item => item.product === payload)
            if(prod === undefined){
                console.log("if called")
                return{
                    ...state,
                    cart : state.cart = [...state.cart,  {product : payload, quantity : 1}] 
                } 
                
            }else{
                console.log("else called")
                return{
                    ...state,
                    cart :  state.cart.map(item => item.product === payload ? {...item, quantity : item.quantity + 1} : item)
                } 
               
            }
        }

        case "REMOVE_FROM_CART" : {
            console.log(quantity,'from remove quantity')
            if(quantity === 1){
                return {
                    ...state,
                    cart : state.cart.filter((item) => item.product._id !== payload._id)
                }
            }else {
                return{
                    ...state,
                    cart : state.cart.map(item => item.product === payload ? {...item, quantity : item.quantity -1} : item)
                }
            }
          
        }
        default : return {...state}
    }
}

function cartHandler(cart , product){

}