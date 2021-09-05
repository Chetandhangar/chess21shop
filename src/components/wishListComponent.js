import React from 'react'

import {useWishList} from '../contexts/wishlist-context'


export const  WishList = () => {
    //cosnt [loading .setLoading] = useState(false)
    //const {isUserLogin,token} = useAuth()
    const {wishlist, removeFromWishList, loading} = useWishList();
    console.log(wishlist, "from wishlist context")

  

    return(
        <div>
            <div>
                WishList
            </div>
            <div>
                {loading ? <p>Loading .....</p> : 
                <div>
                    {wishlist?.length <= 0 && <p>No items in wishlist</p>}
                       {wishlist?.map((product) =>(
                    <div key ={product._id}>
                        <h3>{product.name}</h3>
                        <h3>{product.price}</h3>
                        <button onClick={() => removeFromWishList(product)}>Remove from WishList</button>
                        <hr/>
                    </div>
                ))}
                </div>
                }
            </div>
        </div>
    )
}