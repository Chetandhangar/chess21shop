import React,{useEffect, useState} from 'react'
import {Form , FormGroup, Label, Input, Button} from 'reactstrap';
import './styles.css'
import axios from 'axios'

export const Signup = () =>{
    const [firstname,setFirstname] = useState("")
    const [lastname , setLastname] = useState("");
    const [password , setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [username, setUsername] = useState("")
    const signupurl = "https://chess21-1.chetandhangar.repl.co/users/signup"
    const user = "https://chess21-1.chetandhangar.repl.co/user";
    const [loading , setLoading] = useState(false);

    /*useEffect(() =>{
        (async () =>{
            try{
            const response = await axios.get("https://chess21-1.chetandhangar.repl.co/users")
            console.log(response.data.user)
        }catch(err){
                alert(err)
            }
        })();
    })
    */

    async function handleSignUp(e){
        e.preventDefault();
        try{
        setLoading(true)
        const response = await axios.post(signupurl,{
          firstname,
          lastname,
          username,
          email,
          password
        }) 
        if(response.status === 200){
            setLoading(false)
            setFirstname("")
            setLastname("")
            setUsername("")
            setPassword("")
            setEmail("")
        }  
       }catch(err){
            console.log(err)
            setLoading(false)
       }
         
    }

    return(
        <div className="container">
            <Form onSubmit={handleSignUp}>        
                <FormGroup>
                    <Label htmlFor="firstname">FirstName</Label>
                    <Input 
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastname">LasttName</Label>
                    <Input 
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(lastname => lastname = e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input 
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(username => username = e.target.value)}
                    />
                </FormGroup>
                    
                 <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(password => password = e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="address">email</Label>
                    <Input 
                    type="text"
                    name="address"
                    id="address"
                    value={email}
                    onChange={(e) => setEmail(email => email = e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="btn-group">
    <Button className="btn-signup" type="submit" value="submit" colot="primary">{loading ? "Loading" : "Signup"}</Button>
                </FormGroup>

            </Form>
        </div>
    )
}