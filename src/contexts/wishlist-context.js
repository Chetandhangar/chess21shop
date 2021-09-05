import React,{useState,useReducer,createContext,useContext} from 'react';
import {useAuth} from './auth-context';
import axios from 'axios';


export const WishListContext = createContext();


export function WishListProvider({children}){
    const [state , dispatchWishList] = useReducer(reducer, ({
        wishlist : [],
    }))

    const [loading , setLoading] = useState(false); 
 

    const {token} = useAuth();
    const wishlisturl = "https://chess21-1.chetandhangar.repl.co/wishlist";
 
    async function addToWishList(product){
        try{
            const response = await axios.post("https://chess21-1.chetandhangar.repl.co/wishlist/add",
                {productId : product._id},
                {headers : {authorization : token}})
                console.log(response, 'ha bhai aya')
                if(response.status === 200){
                    dispatchWishList({
                        type : "ADD_TO_WISHLIST",
                        payload : product
                    })
                    alert("added to wislist successfully")
                }
        }catch(error){
            console.log(error)
        }
      
    }
    console.log(wishlisturl)

    async function removeFromWishList(product){
        try{
            const respone  = await axios.post(`https://chess21-1.chetandhangar.repl.co/wishlist/remove`,
            {productId : product._id},
            {headers : {authorization : token}})
            console.log("ha bhai remove huva")
            if(respone.status === 200){
                dispatchWishList({
                    type : "REMOVE_FROM_WISHLIST",
                    payload : product
                })
            }
        }catch(error){
            console.log(error)
        }
      
    }

    return(
        <WishListContext.Provider value={{wishlist : state.wishlist, 
            loading , setLoading,
        dispatchWishList,
        addToWishList,
        removeFromWishList}}>
            {children}
        </WishListContext.Provider>
    )
}

export function useWishList(){
    return useContext(WishListContext)
};

export function reducer(state,action){
    switch(action.type){
        case "UPDATE" : {
            return {
                ...state,
                wishlist : [...action.payload]
            }
        }
        case "ADD_TO_WISHLIST" :
            console.log(action.payload,'payload')
            console.log(state,'wishlist state')
            return{
                ...state,
                wishlist : [...state.wishlist, action.payload]
            }
        
        case "REMOVE_FROM_WISHLIST" : 
            console.log("ha remove reducer se" , action.payload)
            return{
                ...state,
                wishlist : state.wishlist.filter((product) => product._id !== action.payload._id)
            }

            default :
            return{...state}
    }
}

