import {useState,createContext,useContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({children}){

    const { isUserLoggedIn, token: savedToken } = JSON.parse(
        localStorage?.getItem("login")
      ) || { isUserLoggedIn: false, token: null };

    const [isUserLogin , setUserLogin] = useState(isUserLoggedIn);
    const [token , setToken] = useState(savedToken);

    const loginurl = "https://chess21-1.chetandhangar.repl.co/users/login"
    function loginService(username , password){
        return axios.post(loginurl,{
            username,
            password
        }) 
    }

     async function loginWithCredential(username , password){
        try{
            const response = await loginService(username , password);
            console.log(response,"from auth login")
            if(response.status === 200){
                loginUser(response.data)
            }
        }catch(err){
            console.log(err)
        }
    }

    function loginUser({token,username}){
        setToken(token)
        setUserLogin(true)  
        localStorage?.setItem("login", JSON.stringify({isUserLoggedIn : true, token, username}))
    }

    return(
        <AuthContext.Provider value={{isUserLogin, setUserLogin, loginWithCredential,token,setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}