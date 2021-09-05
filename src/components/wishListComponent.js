import React, {useState} from 'react'
import { useCart } from '../contexts/data-context'
import {useAuth} from '../contexts/auth-context'

export const  WishList = () => {
    //cosnt [loading .setLoading] = useState(false)
    //const {isUserLogin,token} = useAuth()
    const {wishList, dispatch} = useCart();
    
    return(
        <div>
            <div>
                WishList
            </div>
            <div>
                {wishList.map((product) =>(
                    <div key ={product.id}>
                        <h3>{product.name}</h3>
                        <h3>{product.price}</h3>
                        <button onClick={() => dispatch({
                            type : "REMOVE_FROM_WISHLIST",
                            payload : product
                        })}>Remove from WishList</button>
                        <hr/>
                    </div>
                ))}
            </div>
        </div>
    )
}