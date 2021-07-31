import {useCart} from '../contexts/cartContext';

export function CartItems() {
    const {cartItem: cartProduct, setCartItem} = useCart();  
    
    console.log(cartProduct);

    function removeCartItemHandler(index){
        const newItemList = [...cartProduct];
        newItemList.splice(index,1) 
        setCartItem(newItemList);
        alert(`Item Removed ${index}`)
    }

    return(
    <div>
        <div>
         <h2>Cart Items{cartProduct.length}</h2>
        </div>  
        <div>
            {
                cartProduct.map((product, index) =>(
                    <div key ={index}>
                        <h1>{product.name} {product.id}</h1>
                        <h3>{`Rs : ${product.price}`}</h3>
                        <button onClick ={() => removeCartItemHandler(index)}>Remove From cart</button>
                    </div>
                ))
            }
        </div>
      
    </div>
    )
}