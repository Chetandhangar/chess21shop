import React from 'react'
import {Form,FormGroup, Label, Input , Button, } from 'reactstrap';
import {Link} from 'react-router-dom'

export const Login = () => {


    let username, password;

    const handleLogin = () =>{

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
                   innerRef = {(input) => username = input}
                   />
               </FormGroup>
               <FormGroup>
                   <Label>Password</Label>
                   <Input
                   type="password"
                   id="password"
                   name="password"
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