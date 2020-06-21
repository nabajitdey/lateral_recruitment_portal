import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalTitle from 'react-bootstrap/ModalTitle'
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
import "bootstrap/dist/css/bootstrap.min.css";
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
        paddingLeft: "720px"
    },

    error2: {
        color: "red",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "630px"
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
        paddingLeft: "695px"
    },
    content: {
        marginLeft: theme.spacing(90),
        marginRight: theme.spacing(-5),

        marginTop: theme.spacing(5),
        width: '20%',

    }



}));


const ListApplicants = () => {

    const initialValue2 = [
        {
            skill_name: ""
        }];

    const classes = myStyles()
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success1, setSuccess] = useState(false);
    const [skills, setSkill] = useState(initialValue2);


    const colDefs2 = [{
        headerName: "id", field: "id",
        sortable: true,
        filter: true,
    }, {
        headerName: "Skills", field: "skill_name",
        sortable: true,
        filter: true,
    }];

    const colDefs = [{
        headerName: "id", field: "id",
        sortable: true,
        filter: true,
        checkboxSelection: true
    }, {
        headerName: "Name", field: "app_name",
        sortable: true,
        filter: true,
    }, {
        headerName: "status", field: "complete_status",
        sortable: true,
        filter: true,
        cellStyle: function (params) {
            if (params.value == 'Ongoing') {
                return { color: '#77FF69' };
            }
            else if (params.value == 'Shortlisted') {
                return { color: '#FFD869' };

            }
            else {
                return { color: 'red' };
            }
        }
    }, {
        headerName: "interview result", field: "result",
        sortable: true,
        filter: true,
        cellStyle: function (params) {
            if (params.value == 'Passed') {
                return { color: '#77FF69' };
            }
            else if (params.value == 'Failed') {
                return { color: 'red' };

            }

        }
    }, {
        headerName: "email", field: "email",
        sortable: true,
        filter: true,
    }, {
        headerName: "latest interview level", field: "current_level",
        sortable: true,
        filter: true,
        cellStyle: function (params) {
            if (params.value != "") {
                return { color: '#FFD869' };
            }
        }
    }, {
        headerName: "date of registration", field: "date_of_registration",
        sortable: true,
        filter: true,
    },{
        headerName: "hire status", field: "hire_status",
        sortable: true,
        filter: true,
        cellStyle: function(params) {
            if (params.value=='Hired') {
                return {color: '#77FF69'};}
            else{
                return {color: 'red'};
            }
        }    
    }, {
        headerName: "years  of experience", field: "yrs_of_exp",
        sortable: true,
        filter: true,
    }, {
        headerName: "preffered location", field: "preffered_location",
        children: [{ headerName: "location",field: 'preffered_location.location',
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
        }],
        sortable: true,
        filter: true,
    },]

    const initialValue = [
        {
            app_name: "", email: "", date_of_registration: "", yrs_of_exp: 0,
            skills: [{ skill_name: "" }],
            preffered_location: { location: "" },
        }];


    const [info, setInfo] = useState(initialValue);

    useEffect(() => {
        console.log("useEffect");
        axios.get('http://127.0.0.1:8000/talentManager/getApplicantList/')
            .then(
                data => {
                    console.log(data.data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo(data.data);
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
        console.log(selectedData[0])

        axios.post('http://127.0.0.1:8000/talentManager/removeApplicant/', selectedData[0])
            .then(
                data => {
                    console.log(data.data);
                    setInfo(null);
                
                    setSuccess(true);
                    setError1(false);
                   
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
                    setError1(true);
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

            axios.get('http://127.0.0.1:8000/talentManager/getApplicantList/')
            .then(
                data => {
                    console.log(data.data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo(data.data);
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

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setSkill(null)
    };
    const handleShow = () => {
        setShow(true)
        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData[0] != undefined) {
            const temps = selectedData[0].skills;
            const frmdetails = [];
            for (let i = 0; i < temps.length; ++i) {
                const vals = {
                    'id': temps[i].id,
                    'skill_name': temps[i].skill_name,
                }
                frmdetails[i] = vals;
            }
            console.log(frmdetails)
            setSkill(frmdetails)
        }

    };

    const ColorButton = withStyles((theme) => ({
        root: {

            borderColor: '#E7A9FF',
            '&:hover': {
                backgroundColor: "#9B08EE",
                borderColor: "#9B08EE"
            },
        },
    }))(Button);

    return (
        // <div>List vacs</div>
        <div
            className="ag-theme-alpine-dark"
            style={{
                height: '500px',
                width: '1200px'
            }}
        >
            <AgGridReact
                onGridReady={
                    params => setGridApi(params.api)

                }
                columnDefs={colDefs}
                rowData={info}>
            </AgGridReact>
            <link rel="stylesheet" href="style.css" />
            <ColorButton className={classes.submit} variant="outlined" onClick={handleShow} >
                show applicant's skills
            </ColorButton>
            <ColorButton className={classes.submit} variant="outlined" onClick={onButtonClick} >
                remove applicant
            </ColorButton>
            {success1 && <FormHelperText className={classes.success} >
                <DoneOutlinedIcon fontSize="medium" />
            applicant removed!
            </FormHelperText>}
            {error1 && <FormHelperText className={classes.error} >
                <SmsFailedOutlinedIcon fontSize="medium" />
            error try again!
            </FormHelperText>}

            <Modal className={classes.content} show={show} onHide={handleClose}>

                <div
                    className="ag-theme-alpine-dark"
                    style={{
                        height: '300px',
                        width: '420px'
                    }}
                >
                    <AgGridReact
                        columnDefs={colDefs2}
                        rowData={skills}>
                    </AgGridReact>
                    <link rel="stylesheet" href="style.css" />
                </div>

            </Modal>


        </div>
    );
}
export default ListApplicants;