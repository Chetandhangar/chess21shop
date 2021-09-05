import {useState,createContext,useContext} from 'react';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom'


const AuthContext = createContext();

export function AuthProvider({children}){

    const { isUserLoggedIn, token: savedToken , username} = JSON.parse(
        localStorage?.getItem("login")
      ) || { isUserLoggedIn: false, token: null , username : ""};

    const navigate = useNavigate();
    const {state} = useLocation();

    const [isUserLogin , setUserLogin] = useState(isUserLoggedIn);
    const [token , setToken] = useState(savedToken);
    const [userName ,setUserName] = useState(username);
    const [loading , setLoading] = useState(false)
    const loginurl = "https://chess21-1.chetandhangar.repl.co/users/login";

    function loginService(username , password){
        return axios.post(loginurl,{
            username,
            password
        }) 
    }

     async function loginWithCredential(username , password){
        try{
            setLoading(true)
            const response = await loginService(username , password);
            console.log(response,"from auth login")
            if(response.status === 200){
                loginUser(response.data)
                setLoading(false)
            }
        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    function loginUser({token,username}){
        setToken(token)
        setUserLogin(true)  
        localStorage?.setItem("login", JSON.stringify({isUserLoggedIn : true, token, username}))
        state != null ? navigate(state.from) : navigate('/')
    }

    function logout(){
        setToken(null)
        setUserLogin(false)
        localStorage?.removeItem('login')
    }

    return(
        <AuthContext.Provider value={{isUserLogin, 
        userName, setUserName,
        loading,
        setUserLogin, 
        loginWithCredential,
        token,
        setToken,
        logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}