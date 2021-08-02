import './App.css';
import { ProductListing, CartItems, WishList } from './components';
import { useState } from 'react'

function App() {
  const [currentTab , setCurrentTab] = useState ("products")

  function tabHandler(item){
    setCurrentTab(item)
  }

   return (
    <div className="App">
      <div>
         <button onClick={() => tabHandler("products")}>Products</button>
         <button onClick={() => tabHandler("cart")}>Cart</button>
         <button onClick={() => tabHandler("wishlist")}>WishList</button>
      </div>
     <div>
     { currentTab === "products" && <ProductListing />}
     {currentTab === "cart" && <CartItems />}
     {currentTab === "wishlist" && <WishList />}
     </div>
     
    </div>
  );
}

export default App;
