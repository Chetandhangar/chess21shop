import { useContext, createContext, useState, useReducer} from 'react';


export const CartContext = createContext();

export function CartProvider({children}){
    const [cartItem, setCartItem] = useState([]);
    const [state, dispatch] = useReducer(reducerFun,
         {
             sortBy : null,
             showMagenticOnly : false,
             showWoodenOnly : false,
             showFoldableOnly : false
         })
    return(
        <CartContext.Provider value={{cartItem,setCartItem, dispatch, sortBy : state.sortBy}}> 
            {children}
        </CartContext.Provider>
    )
}


export function useCart(){
 return useContext(CartContext)
}

export function reducerFun(state, action){
    switch(action.type){
        case "SORT":
            return{
                ...state,
                sortBy : action.payload
            }

            default :
            return state;
    }
}