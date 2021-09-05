import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './contexts/data-context';
import {ProductProvider} from './contexts/products-context';
import {CartDataProvider} from './contexts/cart-provider'
import {AuthProvider} from './contexts/auth-context'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartDataProvider>
          <CartProvider>
            <Router>
              <App />
            </Router>
          </CartProvider>
        </CartDataProvider>
      </ProductProvider>
    </AuthProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
