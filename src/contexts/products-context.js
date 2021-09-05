import {useEffect} from 'react'
import {useState,createContext,useContext} from 'react';
import axios from 'axios';

const ProductContext = createContext();

export function ProductProvider({children}){
    const [products, setProducts] = useState(null);
    const producturl = "https://chess21-1.chetandhangar.repl.co/products"

    useEffect(() =>{
        (async ()  =>{
            try{
                const response = await axios.get(producturl)
                if(response.status === 200){
                    setProducts(response.data.products)
                }
                
            }catch(err){
                console.log(err)
            }
            
        })();
    },[])

    return(
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts(){
    return useContext(ProductContext);
}