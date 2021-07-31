import React from 'react';
import { PRODUCTS } from '../shared/products'
import { useCart} from '../contexts/cartContext';




export const ProductListing = () => {

const {cartItem , setCartItem} = useCart();

function addToCartHandler(product){
    const newItem = [...cartItem, product]
    setCartItem(newItem)
}

   return(
    <div>
        <h1>Products</h1>
        <div>
            {PRODUCTS.map((product) =>(
                <div key={product.id} className="card">
                    <h1>{product.name}</h1>
                    <h3>{`Price: ${product.price}`}</h3>
                    <button onClick={() => addToCartHandler(product)}>add to cart</button>
                    <button>see Details</button>
                </div>
            ))}
        </div>
    </div>
   )
}