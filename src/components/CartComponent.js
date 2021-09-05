import React from 'react'
import {useDataCart} from '../contexts/cart-provider';



export function CartItems() {
    const {cart , removeFromCartHandler, addToCartHandlerContext, loading} = useDataCart();
   
    return(
    <div>
        {console.log(cart,'from return')}
        {loading ? <p>Loading ...</p> :
             <div>
             {cart?.length <= 0 ? <p>No items in cart</p> : (
             <div>
                 {cart?.map(({product,quantity}) => (
                     <div key={product._id}>
                      <h1>{product.name} {product.id}</h1>
                         <h3>Rs : {product.price * quantity}</h3>
                         <h3>
                         <button onClick={() => removeFromCartHandler(product,quantity)}>-</button>
                         {`Quantity : ${quantity}`}
                         <button onClick={() => addToCartHandlerContext(product)}>+</button>
                         </h3>
                         <button onClick ={() => removeFromCartHandler(product,quantity)}>Remove From cart</button>
                     </div>
                 ))}
             </div>
         )}
         </div>
        }
       
       
    
    </div>
    )
}