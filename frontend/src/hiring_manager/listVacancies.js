import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
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
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
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
        paddingLeft: "530px"
    },

    error2: {
        color: "red",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "720px"
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
        paddingLeft: "515px"
    },

    success2: {
        color: "#77FF69",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "695px"
    },
    content: {
       marginLeft:theme.spacing(90),
       marginRight:theme.spacing(-5),

       marginTop:theme.spacing(5),
       width:'20%',

    }



}));


const ListVacancies = () => {
    const initialValue2 = [
        {
            skill_name: ""
        }];
    const classes = myStyles()
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success1, setSuccess1] = useState(false);
    const [success2, setSuccess2] = useState(false);
    const [skills, setSkill] = useState(initialValue2);


    const colDefs3 = [{
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
        headerName: "name", field: "vac_name",
        sortable: true,
        filter: true,
    }, {
        headerName: "date of posting", field: "date_of_posting",
        sortable: true,
        filter: true,
    }, {
        headerName: "status", field: "status",
        sortable: true,
        filter: true,
        cellStyle: function(params) {
            if (params.value=='Ongoing') {
                return {color: '#77FF69'};}
            else{
                return {color: 'red'};
            }
            }
    }, {
        headerName: "designation", field: "vac_designation",
        sortable: true,
        filter: true,
    }, {
        headerName: "number of vacancies", field: "no_of_vacancies",
        sortable: true,
        filter: true,
    }, {
        headerName: "project name", field: "project_name",
        sortable: true,
        filter: true,
    }, {
        headerName: "years of experience", field: "yrs_of_exp",
        sortable: true,
        filter: true,
    }, {
        headerName: "comments", field: "comments",
        sortable: true,
        filter: true,
    }, {
        headerName: "location", field: "vac_location",
        children: [{ headerName:"location", field: 'vac_location.location',
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
    }, {
        headerName: "hiring manager", field: "hiringManager",
        children: [{headerName:"name", field: 'hiringManager.emp_name' }],
        sortable: true,
        filter: true,
    },]

    const colDefs2 = [{
        headerName: "id", field: "id",
        sortable: true,
        filter: true,
        checkboxSelection: true
    }, {
        headerName: "name", field: "vac_name",
        sortable: true,
        filter: true,
    }, {
        headerName: "date of posting", field: "date_of_posting",
        sortable: true,
        filter: true,
    }, {
        headerName: "status", field: "status",
        sortable: true,
        filter: true,
        cellStyle: function (params) {
            if (params.value == 'Ongoing') {
                return { color: '#77FF69' };
            }
            else {
                return { color: 'red' };
            }
        }
    }, {
        headerName: "designation", field: "vac_designation",
        sortable: true,
        filter: true,
    }, {
        headerName: "project name", field: "project_name",
        sortable: true,
        filter: true,
    }, {
        headerName: "years of experience", field: "yrs_of_exp",
        sortable: true,
        filter: true,
    }, {
        headerName: "comments", field: "comments",
        sortable: true,
        filter: true,
    }, {
        headerName: "location", field: "vac_location",
        children: [{  headerName: "location", field: 'vac_location.location',
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
    }, {
        headerName: "hiring manager", field: "hiringManager",
        children: [{  headerName: "name", field: 'hiringManager.emp_name' }],
        sortable: true,
        filter: true,
    },]

    const [level1, setLevel1] = useState(true);
    const [level2, setLevel2] = useState(false);
    const [info2, setInfo2] = useState(null);
    const [curr_ind_vac, set_ind_vac] = useState();

    const initialValue = [
        {
            vac_name: "", date_of_posting: "", vac_designation: "", no_of_vacancies: 0,
            project_name: "", yrs_of_exp: 0, comments: "",
            skills: [{ skill_name: "" }],
            vac_location: { location: "" }, hiringManager: { emp_name: "" }
        }];


        const [info, setInfo] = useState(initialValue);
        const userInfo = useSelector(state => state.userInfoReducer);

        useEffect(() => {
            console.log("useEffect");
            const manager={ 'userId':userInfo.user.id }
            axios.post('http://127.0.0.1:8000/hiringManager/getVacancyList/',manager)
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
            if(selectedData[0]!= undefined){
            const temps = selectedData[0].skills;
            const frmdetails = [];
            for( let i=0; i<temps.length; ++i){
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

        const onButtonClick = () => {

            const selectedNodes = gridApi.getSelectedNodes()
            console.log(selectedNodes)
            const selectedData = selectedNodes.map(node => node.data)
            if (selectedData[0] != undefined) {
            console.log(selectedData[0])
            const vacInfo = { 'vacId': selectedData[0].id }
    
            axios.post('http://127.0.0.1:8000/talentManager/getIndividualVacancyList/', vacInfo)
                .then(
                    data => {
                        console.log(data.data);
                        // loc = JSON.stringify(data.data);
                        //locations=data.data
                        setInfo2(data.data);
                        setLevel1(false);
                        setLevel2(true);
                        console.log("level 2")
                        setError2(false);
                        setSuccess2(false);
                        setError1(false);
                        setSuccess1(false);
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

        
    const onButtonClick2 = () => {

        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData[0] != undefined) {
        console.log(selectedData[0])
        const vacInfo = { 'vacId': selectedData[0].id }

        axios.post('http://127.0.0.1:8000/hiringManager/indVacRemove/', selectedData[0])
            .then(
                data => {
                    console.log(data.data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo(null);
                    setError2(false);
                    setSuccess2(true);
                    //console.log(userInfo);

                }
            ).catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //invalid creds
                    setError2(true);
                    setSuccess2(false);
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


        axios.post('http://127.0.0.1:8000/talentManager/getIndividualVacancyList/', vacInfo)
            .then(
                data => {
                    console.log(data.data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo2(data.data);
                    setLevel1(false);
                    setLevel2(true);
                    console.log("level 2")
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

    const onButtonClick3 = () => {

        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData[0] != undefined) {
        console.log(selectedData[0])
        
        axios.post('http://127.0.0.1:8000/hiringManager/vacancyRemove/', selectedData[0])
            .then(
                data => {
                    console.log(data.data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo(null);
                    setError1(false);
                    setSuccess1(true);

                    //console.log(userInfo);

                }
            ).catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //invalid creds
                    setError1(true);
                    setSuccess1(false);
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

            const manager={ 'userId':userInfo.user.id }
            axios.post('http://127.0.0.1:8000/hiringManager/getVacancyList/',manager)
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
    }

    const goBack1 = () => {
        setLevel2(false);
        setLevel1(true);
    }
    
    
        return (
            // LEVEL 1 VACANCY
            <div>
            {level1 && <div
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
                    show skills required
                </ColorButton>
                <ColorButton className={classes.submit} variant="outlined" onClick={onButtonClick3} >
                    remove vacancy
                </ColorButton>
                <ColorButton className={classes.submit} variant="outlined" onClick={onButtonClick} >
                    get sub vacancies
                </ColorButton>
                {success1 && <FormHelperText className={classes.success} >
                <DoneOutlinedIcon fontSize="medium" />
                vacancy removed!
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
                            columnDefs={colDefs3}
                            rowData={skills}>
                        </AgGridReact>
                        <link rel="stylesheet" href="style.css" />
                        </div>
                    
                </Modal>
        
    
            </div>}

            {/* LEVEL 2 IND VAC */}
            {level2 && <div
                className="ag-theme-alpine-dark"
                style={{
                    height: '450px',
                    width: '1200px'
                }}
            >
                <AgGridReact
                    onGridReady={params => setGridApi(params.api)

                    }
                    columnDefs={colDefs2}
                    rowData={info2}>
                </AgGridReact>
                <link rel="stylesheet" href="style.css" />
                <ArrowBackIosOutlinedIcon onClick={goBack1} />
                <ColorButton className={classes.submit} variant="outlined" onClick={handleShow} >
                    show required skills
                </ColorButton>
                <ColorButton className={classes.submit} variant="outlined" onClick={onButtonClick2} >
                    remove sub vacancy
                </ColorButton>
                {success2 && <FormHelperText className={classes.success2} >
                <DoneOutlinedIcon fontSize="medium" />
                sub vacancy removed!
                </FormHelperText>}
                {error2 && <FormHelperText className={classes.error2} >
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
                            columnDefs={colDefs3}
                            rowData={skills}>
                        </AgGridReact>
                        <link rel="stylesheet" href="style.css" />
                    </div>

                </Modal>

            </div>}

            </div>
        );
    }
    export default ListVacancies;