import React from 'react';
import { PRODUCTS } from '../shared/products'
import { useCart} from '../contexts/data-context';




export const ProductListing = () => {

const {cartItem , setCartItem ,dispatch, sortBy,  
    showMagneticOnly,showWoodenOnly,showFoldableOnly , wishList} = useCart();

function addToCartHandler(product){
    //const newItem = [...cartItem, {...product, quantity : 1}]
    //setCartItem(newItem)
    let ind = cartItem.findIndex((cartItem) => cartItem.id === product.id);
    if (ind === -1) {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      alert("Item added to cart")
    } else {
      cartItem[ind].quantity = cartItem[ind].quantity + 1;
      setCartItem([...cartItem]);
      alert("Item Added to cart")
    }
}

    function getSortedList(productList , sortBy){
    if(sortBy && sortBy === "SORT_HIGH_TO_LOW"){
        return productList.sort((a,b) => b["price"] - a["price"])
    }
    if(sortBy && sortBy === "SORT_LOW_TO_HIGH"){
        return productList.sort((a,b) => a["price"] - b["price"])
    }
    else return productList
    }

    function getFilteredData(productList, 
        { showMagneticOnly,showWoodenOnly,showFoldableOnly}){
        
        return productList
            .filter(({isFolding}) =>  showFoldableOnly ? isFolding : true)
            .filter(({isMagnetic}) =>  showMagneticOnly ? isMagnetic : true)
            .filter(({isWooden}) =>  showWoodenOnly ? isWooden : true)
          
    }

const sortedData = getSortedList(PRODUCTS, sortBy);
const filteredData = getFilteredData(sortedData, 
    {   showMagneticOnly, showWoodenOnly,showFoldableOnly})


   return(
    <div>
        <div>
            <fieldset>
                <legend>SortBy</legend>
                <label>
                    <input 
                    type = "radio"
                    name = "sort"
                    onChange ={() => dispatch({type : "SORT", payload : "SORT_HIGH_TO_LOW"})}
                    //checked = {sortBy && sortBy === "SORT_HIGH_TO_LOW"}
                    />
                    High_To_Low
                </label>
                <label>
                    <input 
                    type = "radio"
                    name = "sort"
                    onChange ={() => dispatch({type : "SORT", payload : "SORT_LOW_TO_HIGH"})}
                    //checked = {sortBy && sortBy === "SORT_LOW_TO_HIGH"}
                    />
                    LOW_To_High
                </label>
            </fieldset>
        </div>
        <div>
            <fieldset>
                <legend>Filter</legend>
                <label>
                    <input 
                    type = "checkbox"
                    name = "filter"
                    onChange ={() => dispatch({
                        type : "SHOW_MAGNETIC_ONLY"
                    })}
                    />
                    Magnetic
                </label>
                <label>
                    <input 
                    type = "checkbox"
                    name = "filter"
                    onChange ={() => dispatch({
                        type : "SHOW_WOODEN_ONLY"
                    })}
                    />
                    Wooden
                </label>
                <label>
                    <input 
                    type = "checkbox"
                    name = "filter"
                    checked={showFoldableOnly}
                    onChange ={() => dispatch({
                        type : "SHOW_FOLDABLE_ONLY"
                    })}
                    />
                    Foldable
                </label>
            </fieldset>
        </div>
        <h1>Products</h1>
        <div>
            {filteredData.map((product) =>(
                <div key={product.id} className="card">
                    <h1>{product.name}</h1>
                    <h3>{`Price: ${product.price}`}</h3>
                    <h4>{product.isMagnetic ? <strong>Magnetic</strong> : <strong>Non-Magnetic</strong>}</h4>
                    <h4>{product.isWooden ? <strong>Wooden</strong> : <strong>Plastic</strong>}</h4>
                    <h4>{product.isFolding ? <strong>Foldable</strong> : <strong>Non-Foldable</strong>}</h4>
                    <button onClick={() => addToCartHandler(product)}>add to cart</button>
                    <button>see Details</button>
                    <button onClick = {() => dispatch({
                        type : "ADD_TO_WISH_LIST",
                        payload : product
                    })}>Add To WishList</button>
                    <hr/>
                </div>
            ))}
        </div>
    </div>
   )
}