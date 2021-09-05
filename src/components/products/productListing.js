import { useCart} from '../../contexts/data-context';
import {useProducts} from '../../contexts/products-context'
import {useDataCart} from '../../contexts/cart-provider';
import {useWishList} from '../../contexts/wishlist-context'


export const ProductListing = () => {

    const {addToCartHandlerContext} = useDataCart()
    const {addToWishList} = useWishList();
    const {dispatch, sortBy, showMagneticOnly,showWoodenOnly,showFoldableOnly } = useCart();

    const {products,} = useProducts();

    console.log(products, "from context")


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
        if(productList === null){
            return
        }
        else return productList
            .filter(({isFolding}) =>  showFoldableOnly ? isFolding : true)
            .filter(({isMagnetic}) =>  showMagneticOnly ? isMagnetic : true)
            .filter(({isWooden}) =>  showWoodenOnly ? isWooden : true)
          
    }

const sortedData = getSortedList(products, sortBy);
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
            {!filteredData && <p>Loading ....</p>}
            {filteredData?.map((product) =>(
                <div key={product.id} className="card">
                    <h1>{product.name}</h1>
                    <h3>{`Price: ${product.price}`}</h3>
                    <img src={product.imageurl} alt={product.name}/>
                    <h4>{product.isMagnetic ? <strong>Magnetic</strong> : <strong>Non-Magnetic</strong>}</h4>
                    <h4>{product.isWooden ? <strong>Wooden</strong> : <strong>Plastic</strong>}</h4>
                    <h4>{product.isFolding ? <strong>Foldable</strong> : <strong>Non-Foldable</strong>}</h4>
                    <button onClick={() =>  addToCartHandlerContext(product)}>add to cart</button>
                    <button>see Details</button>
                    <button onClick = {() => addToWishList(product)}>Add To WishList</button>
                    <hr/>
                </div>
            ))}
    
         
        </div>
    </div>
   )
}