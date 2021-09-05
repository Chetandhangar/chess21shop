import React, {useEffect} from 'react'
import {useAuth} from '../contexts/auth-context';
import {useWishList} from '../contexts/wishlist-context'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

export const  WishList = () => {
    //cosnt [loading .setLoading] = useState(false)
    //const {isUserLogin,token} = useAuth()
    const {wishlist, removeFromWishList, loading, setLoading,dispatchWishList} = useWishList();
    console.log(wishlist, "from wishlist context")
    const navigate = useNavigate();
    const {token} = useAuth();
    const wishlisturl = "https://chess21-1.chetandhangar.repl.co/wishlist";

    useEffect(() => {
        (async() =>{
            try{
                setLoading(true)
                const response = await axios.get(wishlisturl, 
                    {headers : {authorization : token}})
                console.log(response,'from wishlist response')
                if(response.status === 200){
                    setLoading(false)
                    dispatchWishList({
                        type : "UPDATE",
                        payload : response.data.wishlist
                    })
                }
            }catch(error){
                console.log(error);
                setLoading(false)
                return navigate('/login')

            }
        })();
        
    },[])

    return(
        <div>
            <div>
                WishList
            </div>
            <div>
                {loading ? <p>Loading .....</p> : 
                <div>
                       {wishlist?.map((product) =>(
                    <div key ={product._id}>
                        <h3>{product.name}</h3>
                        <h3>{product.price}</h3>
                        <button onClick={() => removeFromWishList(product)}>Remove from WishList</button>
                        <hr/>
                    </div>
                ))}
                </div>
                }
            </div>
        </div>
    )
}