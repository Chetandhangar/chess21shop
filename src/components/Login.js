import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../contexts/auth-context';
import {Container,CssBaseline,Typography,Avatar,TextField,
Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles'

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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export const Login = () => {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const {loginWithCredential , loading} = useAuth();

    const handleLogin = (e) =>{
        e.preventDefault();
        loginWithCredential(username,password);
        setUsername("")
        setPassword("")
        
    }
    const classes = useStyles();

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form className={classes.form} noValidate onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername((username) => username = e.target.value)}
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword((password) => password = e.target.value)}
                    />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                       {loading ? "Signing..." : "Sign In"}
                    </Button>
                    <Typography>
                    <Link to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Typography>
                    </form>
                </div>
            </CssBaseline>
        </Container>
    )
}