import './App.css';
import { ProductListing, CartItems, WishList, Header , Signup,Login, ProductDetail} from './components';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useAuth} from './contexts/auth-context'


function App() {

  const {isUserLogin} = useAuth();

  function PrivateRoute({path,login,...props}){
    return login? <Route path={path} {...props}/>:<Navigate state={{from:path}} replace to="/login"/>
  }

   return (
    <div className="App">
     
     <div>
       <Header />
      <Routes>
        <Route path="/" element={<ProductListing />}/>
        <PrivateRoute path="/cart" login={isUserLogin} element={<CartItems />} />
        <PrivateRoute path="/wishlist" login={isUserLogin} element={<WishList />}/>
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