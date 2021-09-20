import React,{useState} from 'react'
import './styles.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Container,CssBaseline,Typography,Avatar,TextField,Grid,Link,
    Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

export const Signup = () =>{
    const [firstname,setFirstname] = useState("")
    const [lastname , setLastname] = useState("");
    const [password , setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [loading , setLoading] = useState(false);
    const classes = useStyles();

    const signupurl = "https://chess21-1.chetandhangar.repl.co/users/signup"
    const navigate = useNavigate();

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
            navigate('/login')
        }  
       }catch(err){
            console.log(err)
            setLoading(false)
       }
         
    }

    return(
       <Container  component="main" maxWidth="xs">
         <CssBaseline>
             <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstname"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstname"
                            label="First Name"
                            autoFocus
                            value={firstname}
                            onChange={(e) => setFirstname(firstname => firstname = e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="lastname"
                            autoComplete="lname"
                            value={lastname}
                            onChange={(e) => setLastname(lastname => lastname = e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(username => username = e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(email => email = e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(password => password = e.target.value)}
                        />
                    </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                       {loading ? "Registering..." : "Sign Up"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                </Grid>
                </form>
             </div>
         </CssBaseline>
       </Container>
    )
}