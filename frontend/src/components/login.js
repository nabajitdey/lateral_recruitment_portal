import React, { useState } from 'react';
import axios from 'axios';
//import {Component} from 'react';
//import { useForm } from 'react-hook-form';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from "@material-ui/core/FormHelperText";
//import './login.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput } from 'mdbreact';
import App from '../App.js';
//import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, islogin } from './actions';
import Home from './home.js'
import Popup from "reactjs-popup";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import "bootstrap/dist/css/bootstrap.min.css";


const myStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //marginTop: '100px'
        //paddingTop:'50px'

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.light,

    },
    formControl: {
        marginTop: '-5px'
        // margin: theme.spacing.unit,
        //minWidth: 120,
        //paddingLeft: '-500px'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#61B6FA",
        '&:hover': {
            background: "#7EC3FB",
            //opacity:'80',
            // fade:'100%' #7EC3FB 61B6FA

        }
        //ideal color 90caf9
    },

    root: {
        '& label.Mui-focused': {
            color: '#90caf9',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#90caf9',
        },
        '& .MuiOutlinedInput-root': {
            // '& fieldset': {
            //     borderColor: 'white',
            // },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#90caf9',
            },
        },
    },

    error: {
        color: "#F5B7B1",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol"
    },

    forgot_password: {
        fontFamily: "Segoe UI Symbol",
        color: "#3498DB"

    },
    popup: {
        backgroundColor: "#363637",
        color: "#363637",
        marginLeft:"100px",
        width:"100%"

    },
    icon2: {
        color: "#949494",

    },
    popupText: {
        color: "black"
    }



}));

//***LOGIN  */
const Login = (props) => {
    const isloggedIn = useSelector(state => state.loggedReducer);
    const dispatch = useDispatch();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    const [hasError1, setErr1] = useState(false);
    const [hasError2, setErr2] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error1, setError] = useState('');
    const userfound = false
    const submitValue = (e) => {
        setError("")
        var check = true
        if (username == "") {
            setErr1(true)
            check = false
        }
        else
            setErr1(false)

        if (password == "") {
            setErr2(true)
            check = false
        }
        else
            setErr2(false)

        e.preventDefault()
        if (check == true) {
            const frmdetails = {
                'username': username,
                'password': password,

            }


            axios.post('http://127.0.0.1:8000/api/login/',
                frmdetails)
                .then(
                    data => {
                        console.log(data);
                        dispatch(islogin());
                        dispatch(login(data.data))

                    }
                ).catch((error) => {
                    // Error
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        //invalid creds
                        setError(error.response.data.non_field_errors)
                        setUsername("");
                        setPassword("");
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the 
                        // browser and an instance of
                        // http.ClientRequest in node.js
                        //server down
                        setError("Server is down :(")
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        //internal error
                        setError("Internal error :( ")
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });

        }

    }
    const classes = myStyles()

    if (isloggedIn) {
        return (
            <BrowserRouter>
                <Route path="/home/" component={Home} />
                <Redirect to="/home/" />
            </BrowserRouter>
        )
    }


    return (<ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">

                </Typography>
                <form className={classes.form} noValidate onSubmit={submitValue}>
                    <FormControl fullWidth error={hasError1}>
                        <TextField

                            variant="outlined"
                            margin="normal"
                            className={classes.root}
                            required="true"
                            fullWidth
                            id="username"
                            value={username}
                            label="username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {hasError1 && <FormHelperText className={classes.formControl}>This is required!</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth error={hasError2}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={password}
                            className={classes.root}
                            label="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {hasError2 && <FormHelperText className={classes.formControl}>This is required!</FormHelperText>}
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}

                    >
                        Sign In
      </Button>
                    {/* <Grid container> */}
                        {/* <Grid item xs>
                            <Link className={classes.forgot_password} href="#" variant="body2" >
                                Forgot password?
          </Link>

                        </Grid> */}
                        <Popup className={classes.popup} trigger={<InfoOutlinedIcon className={classes.icon2} />} position="bottom">
                            <div className={classes.popupText}>
                                <h8>LATERAL RECRUITMENT PORTAL</h8>
                                <p>
                                    Lateral recruitment is the process of hiring an 'applicant'
                                    for a job that needs to be filled. The applicant is usually from
                                    another organisation with certain experience. 
                                    </p>
                                    <p>There are 3 different profiles is this portal:</p>
                                <h10>ADMIN</h10> 
                                <p>
                                    Manage the portal.
                                </p>
                                <p>
                                   Add or remove new managers
                                </p>
                                <h10>HIRING MANAGER</h10>rr
                                <p>
                                    Manager of a project  who will post vacancies for the project
                                </p>
                                <p>
                                    Hire applicants who have passed the interviews.
                                </p>
                                <h10>TALENT MANAGER</h10>
                                <p>
                                    Register new applicants
                                </p>
                                <p>
                                    Check the vacancies posted by hiring managers
                                </p>
                                <p>
                                    Conduct interviews for applicants.
                                </p>
                            </div>
                        </Popup>
                    {/* </Grid> */}
                </form>
                {error1 &&
                    <FormHelperText className={classes.error}> {error1} </FormHelperText>}
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    </ThemeProvider>
    );


}

export default Login





