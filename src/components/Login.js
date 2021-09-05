import React,{useState} from 'react'
import {Form,FormGroup, Label, Input , Button, } from 'reactstrap';
import {Link} from 'react-router-dom'
import {useAuth} from '../contexts/auth-context'

export const Login = () => {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const {isUserLogin, setUserLogin, loginWithCredential} = useAuth();
    const handleLogin = (e) =>{
        e.preventDefault() 
        loginWithCredential(username,password)
        setUsername("")
        setPassword("")
    }

    

    return(
        <div className="container">
           <Form onSubmit={handleLogin}>
               <FormGroup>
                   <Label >Username</Label>
                   <Input 
                   type="text"
                   name = "username"
                   id="username"
                   value={username}
                   onChange={(e) => setUsername(username => username = e.target.value)}
                   />
               </FormGroup>
               <FormGroup>
                   <Label>Password</Label>
                   <Input
                   type="password"
                   id="password"
                   name="password"
                   value= {password}
                   onChange={(e) => setPassword(password => password = e.target.value)}
                   />
               </FormGroup>
               <FormGroup>
                   <Button type="submit" value="submit" colot="primary">Login</Button>
               </FormGroup>
               <FormGroup>
                   <p>Don't hane an account <Link to='/signup'>SignUp</Link></p>
               </FormGroup>
           </Form>
        </div>
    )
}