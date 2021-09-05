import './App.css';
import { ProductListing, CartItems, WishList, Header , Signup,Login, ProductDetail} from './components';
import { useState } from 'react';
import {Routes, Route} from 'react-router-dom'


function App() {


   return (
    <div className="App">
     
     <div>
       <Header />
      <Routes>
        <Route path="/" element={<ProductListing />}/>
        <Route path="/cart"  element={<CartItems />} />
        <Route path="/wishlist" element={<WishList />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:productId" element={<ProductDetail />}/>
      </Routes>
   
     </div>
     
    </div>
  );
}

export default App;
/*{ currentTab === "products" && <ProductListing />}
{currentTab === "cart" && <CartItems />}
{currentTab === "wishlist" && <WishList />}
<div>
<button onClick={() => tabHandler("products")}>Products</button>
<button onClick={() => tabHandler("cart")}>Cart</button>
<button onClick={() => tabHandler("wishlist")}>WishList</button>
</div>
*/