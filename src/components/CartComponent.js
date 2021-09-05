import React,{useEffect, useState} from 'react'
import {useCart} from '../contexts/data-context';
import {useDataCart} from '../contexts/cart-provider';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {useAuth} from '../contexts/auth-context';


export function CartItems() {
    const {cartItem: cartProduct, setCartItem,} = useCart();  
    const {cart , setCart, removeFromCartHandler, addToCartHandlerContext} = useDataCart();
    const [loading , setLoading] = useState(false)
    const {token} = useAuth();
  
    const navigate = useNavigate();
    console.log(cartProduct);

    const carturl = "https://chess21-1.chetandhangar.repl.co/cart"
    useEffect(() => {
        (async() => {
            try{
                setLoading(true)
                const response = await axios.get(carturl , {headers : {authorization : token}}) 
                console.log(response)
                if(response.status === 200){
                    setLoading(false)
                    setCart(response.data.cart)
                }
            }catch(error){
                if (error.status === 401) {
                    setLoading(false)
                    return navigate("/login");
                  }
            }
           
        })();
    }, []) 

    function removeCartItemHandler(index, product){
        removeFromCartHandler(product)
        const newItemList = cartProduct.filter((item) => item.id !== index );
        setCartItem(newItemList);
        
    
    }
    function incQuantity(currentQuantity, product){
        addToCartHandlerContext(product);
        const newProduct = cartProduct.map((item) => item.id === product.id ? {...product , quantity : product.quantity + 1}: item)
        setCartItem(newProduct)
    }

    return(
    <div>
        {console.log(cart,'from return')}
        {cart === null && <p>Loading ....</p>}
        {cart?.length <= 0 ? <p>No items in cart</p> : (
            <div>
                {cart?.map(({product,quantity}) => (
                    <div key={product._id}>
                     <h1>{product.name} {product.id}</h1>
                        <h3>Rs : {product.price * quantity}</h3>
                        <h3><button onClick={() => removeFromCartHandler(product)}>-</button>{`Quantity : ${quantity}`} <button onClick={() => incQuantity(quantity, product)}>+</button></h3>
                        <button onClick ={() => removeCartItemHandler(product._id, product)}>Remove From cart</button>
                    </div>
                ))}
            </div>
        )}
        <div>
         <h2>Cart Items{cartProduct.length}</h2>
        </div>  
        <div>
            {
                cartProduct.map((product, index) =>(
                    <div key ={index}>
                        <h1>{product.name} {product.id}</h1>
                        <h3>Rs : {product.price * product.quantity}</h3>
                        <h3>{`Quantity : ${product.quantity}`} <button onClick={() => incQuantity(product.quantity, product)}>+</button></h3>
                        <button onClick ={() => removeCartItemHandler(product.id)}>Remove From cart</button>
                    </div>
                ))
            }
        </div>
      
    </div>
    )
}