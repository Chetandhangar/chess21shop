import { useContext, createContext, useState, useReducer} from 'react';


export const CartContext = createContext();

export function CartProvider({children}){
    const [cartItem, setCartItem] = useState([]);
    const [state, dispatch] = useReducer(reducerFun,
         {
             sortBy : null,
             showMagneticOnly : false,
             showWoodenOnly : false,
             showFoldableOnly : false
         })
    return(
        <CartContext.Provider value={{cartItem,setCartItem,
         dispatch, 
         sortBy : state.sortBy,
         showMagneticOnly : state.showMagneticOnly }}> 
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

        case "SHOW_MAGNETIC_ONLY":   
        return{
            ...state,
            showMagneticOnly : !state.showMagneticOnly
            }

        default :
        return state;
    }
}