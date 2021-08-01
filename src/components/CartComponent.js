import {useCart} from '../contexts/data-context';

export function CartItems() {
    const {cartItem: cartProduct, setCartItem} = useCart();  
    
    console.log(cartProduct);

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