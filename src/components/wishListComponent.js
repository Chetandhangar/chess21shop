import { useCart } from '../contexts/data-context'

export const  WishList = () => {
    
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