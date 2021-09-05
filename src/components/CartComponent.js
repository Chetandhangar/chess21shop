import React,{useEffect, useState} from 'react'
import {useCart} from '../contexts/data-context';
import {useDataCart} from '../contexts/cart-provider';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {useAuth} from '../contexts/auth-context';


export function CartItems() {
    const {cart , dispatchCart, removeFromCartHandler, addToCartHandlerContext} = useDataCart();
    const [loading , setLoading] = useState(false)
    const {token} = useAuth();
  
    const navigate = useNavigate();
    const carturl = "https://chess21-1.chetandhangar.repl.co/cart"

    useEffect(() => {
        (async() => {
            try{
                setLoading(true)
                const response = await axios.get(carturl , {headers : {authorization : token}}) 
                console.log(response)
                if(response.status === 200){
                    setLoading(false)
                    dispatchCart({
                        type : "UPDATE_CART",
                        payload : response.data.cart
                    })
                    
                }
            }catch(error){
                if (error.status === 401) {
                    setLoading(false)
                    return navigate("/login");
                  }
            }
           
        })();
    }, []) 

    return(
    <div>
        {console.log(cart,'from return')}
        {loading ?  <p>Loading ...</p>
         :
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