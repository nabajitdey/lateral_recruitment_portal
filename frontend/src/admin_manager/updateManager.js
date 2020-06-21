import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
    Formik,
    Field,
    Form,
    useField,
    FieldAttributes,
    FieldArray
} from "formik";
import {
    TextField,
    Button,
    Checkbox,
    Radio,
    FormControlLabel,
    Select,
    MenuItem,
    withStyles
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import './styles.css';


const myStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(4),
        //display: 'flex',
        //flexDirection: 'column',
        alignItems: 'center',
        //marginTop: '100px'
        //paddingTop:'50px'
        alignContent: 'centre',
        alignSelf: 'centre'



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
        width: '25%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '25%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        // color: "#9B08EE",
        // //backgroundColor: "#61B6FA",
        // '&:hover': {
        //     color: "#E7A9FF",
        //     //opacity:'80',
        //     // fade:'100%' #7EC3FB 61B6FA

        // }
        //ideal color 90caf9
    },

    check: {
        color: '#9B08EE',
        '&$checked': {
            color: "#9B08EE",
        },
    },

    root: {
        width: '30%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        borderWidth: 5,
        color: '#9B08EE',
        '& label.Mui-focused': {
            color: '#9B08EE',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#9B08EE',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#E7A9FF',
            },
            '&:hover fieldset': {
                borderColor: '#E7A9FF',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#9B08EE',
            },
        },
    },

    error: {
        color: "red",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "480px"
    },

    error2: {
        color: "red",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "530px"
    },

    forgot_password: {
        fontFamily: "Segoe UI Symbol",
        color: "#3498DB"

    },

    success: {
        color: "#77FF69",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "535px"
    }



}));




const UpdateManager = () => {

    const loginUserInfo = useSelector(state => state.userInfoReducer);
    const isLogin = useSelector(state => state.loggedReducer);
    const classes = myStyles()
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success1, setSuccess] = useState(false);

    const colDefs = [{
        headerName: "id",
        field: "id",
        sortable: true,
        filter: true,
        checkboxSelection: true
    }, {
        headerName: "Name",
        field: "emp_name",
        sortable: true,
        filter: true,
    }, {
        headerName: "username",
        field: "username",
        sortable: true,
        filter: true,
    }, {
        headerName: "designation",
        field: "designation",
        sortable: true,
        filter: true,
        cellStyle: function(params) {
            if (params.value=='Admin') {
                return {color: '#FFE970'};}
            else if (params.value=='Talent Manager'){
                return {color: '#73FF70'};
            }
            else{
                return {color: '#70D5FF'};
            }
            }
    }, {
        headerName: "email",
        field: "email",
        sortable: true,
        filter: true,
    }, {
        headerName: "employee name",
        field: "emp_name",
        sortable: true,
        filter: true,
    }, {
        headerName: "location",
        field: "location",
        sortable: true,
        filter: true,
        cellStyle: function(params) {
            if (params.value=='Bengaluru') {
                return {color: '#77FF69'};}
            else if (params.value=='Kochi'){
                return {color: '#69FFF9'};
            }
            else{
                return {color: '#FF70E9'};
            }
            }
    }]

    const initialValue = [{
        username: "",
        emp_name: "",
        email: "",
        designation: [{ designation: "" }],
        location: { location: "" }
    }];
    const [userInfo, setInfo] = useState(initialValue);

    useEffect(() => {
        console.log("useEffect");
        axios.get('http://127.0.0.1:8000/adminManager/getUserList/')
            .then(
                data => {
                    console.log(data.data);
                    const temps = data.data;
                    const frmdetails = [];
                    let i = 0;
                    for (let a = 0; a < temps.length; ++a) {
                        for (let b = 0; b < temps[a].designation.length; ++b) {
                            const vals = {
                                'id': temps[a].id,
                                'username': temps[a].username,
                                'email': temps[a].email,
                                'emp_name': temps[a].emp_name,
                                'location': temps[a].location.location,
                                'designation': temps[a].designation[b].designation
                            }
                            frmdetails[i] = vals;
                            i++;
                        }
                    }
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo(frmdetails);
                    //console.log(userInfo);

                }
            ).catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //invalid creds

                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the 
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    //server down
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    //internal error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }, []);
    const [gridApi, setGridApi] = useState();
    const onButtonClick = () => {

        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData[0] != undefined && selectedData[0].id != loginUserInfo.user.id) {
        console.log(selectedData[0])

        axios.post('http://127.0.0.1:8000/adminManager/removeUser/', selectedData[0])
            .then(
                data => {
                    console.log(data.data);
                    setInfo(null);
                    if (data.data.success == true) {
                        setSuccess(true);
                        setError1(false);
                        setError2(false);
                    } else {
                        setSuccess(false);
                        setError1(true);
                        setError2(false);
                    }
                    // loc = JSON.stringify(data.data);
                    //locations=data.data

                    // console.log(info)
                    //console.log(userInfo);

                }
            ).catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //invalid creds
                    setSuccess(false);
                    setError1(false);
                    setError2(true);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the 
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    //server down
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    //internal error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        axios.get('http://127.0.0.1:8000/adminManager/getUserList/')
            .then(
                data => {
                    console.log(data.data);
                    const temps = data.data;
                    const frmdetails = [];
                    let i = 0;
                    for (let a = 0; a < temps.length; ++a) {
                        for (let b = 0; b < temps[a].designation.length; ++b) {
                            const vals = {
                                'id': temps[a].id,
                                'username': temps[a].username,
                                'email': temps[a].email,
                                'emp_name': temps[a].emp_name,
                                'location': temps[a].location.location,
                                'designation': temps[a].designation[b].designation
                            }
                            frmdetails[i] = vals;
                            i++;
                        }
                    }
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo(frmdetails);
                    //console.log(userInfo);

                }
            ).catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //invalid creds

                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the 
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    //server down
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    //internal error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }
    }

    const ColorButton = withStyles((theme) => ({
        root: {

            borderColor: '#E7A9FF',
            '&:hover': {
                backgroundColor: "#9B08EE",
                borderColor: "#9B08EE"
            },
        },
    }))(Button);

    return (<
        div className="ag-theme-alpine-dark"
        style={
            {
                height: '500px',
                width: '1200px'
            }
        } >
        <AgGridReact onGridReady={
            params => setGridApi(params.api)

        }
            columnDefs={colDefs}
            rowData={userInfo} >

        </AgGridReact>
        <link rel="stylesheet" href="style.css" />
        <ColorButton className={classes.submit} variant="outlined" onClick={onButtonClick} >
            remove user
        </ColorButton>
        {success1 && <FormHelperText className={classes.success} >
            <DoneOutlinedIcon fontSize="medium" />
        user removed!
        </FormHelperText>}
        {error1 && <FormHelperText className={classes.error} >
            <SmsFailedOutlinedIcon fontSize="medium" />
        cannot delete a superuser!
        </FormHelperText>}
        {error2 &&
            <FormHelperText className={classes.error2} >
                <SmsFailedOutlinedIcon fontSize="medium" />
        error try again!
        </FormHelperText>}
    </div>
    );
}
export default UpdateManager;