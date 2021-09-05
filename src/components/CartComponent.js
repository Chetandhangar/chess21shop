import React,{useEffect, useState} from 'react'
import {useCart} from '../contexts/data-context';
import {useDataCart} from '../contexts/cart-provider';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {useAuth} from '../contexts/auth-context';


export function CartItems() {
    const {cartItem: cartProduct, setCartItem} = useCart();  
    const {cart , setCart} = useDataCart();
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
                if (error.response.status === 401) {
                    setLoading(false)
                    return navigate("/login");
                  }
            }
           
        })();
    }, []) 

    function removeCartItemHandler(index){
        const newItemList = cartProduct.filter((item) => item.id !== index );
        setCartItem(newItemList);
    
    }
    function incQuantity(currentQuantity, product){
        const newProduct = cartProduct.map((item) => item.id === product.id ? {...product , quantity : product.quantity + 1}: item)
        setCartItem(newProduct)
    }

    return(
    <div>
        {console.log(cart,'from return')}
        {cart === null && <p>Loading ....</p>}
        {cart?.length <= 0 ? <p>No items in cart</p> : (
            <div>
                {cart?.map(({product}) => (
                    <div key={product._id}>
                    <h1>{product.name}</h1>    
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