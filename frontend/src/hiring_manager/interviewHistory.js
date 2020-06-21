import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {
    Formik,
    Field,
    Form,
    useField,
    FieldAttributes,
    FieldArray,
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
import * as yup from "yup";

import { makeStyles } from '@material-ui/core/styles';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles.css';
import Modal from 'react-bootstrap/Modal';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormHelperText from "@material-ui/core/FormHelperText";




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

    error3: {
        color: "red",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "870px"
    },

    error4: {
        color: "red",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "905px"
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
    success3: {
        color: "#77FF69",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "900px"
    },
    content: {
        marginLeft: theme.spacing(90),
        marginRight: theme.spacing(-5),

        marginTop: theme.spacing(5),
        width: '20%',

    },
    content2: {
        marginLeft: theme.spacing(50),
        marginRight: theme.spacing(-5),

        marginTop: theme.spacing(5),
        width: '60%',

    },
    number: {
        width: '4%',
        height: '2%',
        marginTop: '10px'
    },

    shortlist: {
        marginTop: theme.spacing(15),
    },

    intv:{
        marginTop: theme.spacing(4),
    },
    icons:  {
        color:"#FF4444",
        '&:hover': {
            color: "red",
        }
        //CF55FF D100FF DF8CFF F0CAFF E7A9FF
    },

    intv_level: {
        // color: "#cf5afd",
        fontSize: 24,
        // fontFamily: "Segoe UI Symbol",
        // alignItems: 'center',
        // alignContent: 'centre',
        // alignSelf: 'centre',
        marginBottom: "50px"
    },




}));



const InterviewHistory = () => {

    const initialValue2 = [
        {
            skill_name: ""
        }];

    const classes = myStyles()
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    const [success1, setSuccess] = useState(false);
    const [success3, setSuccess3] = useState(false);
    const [skills, setSkill] = useState(initialValue2);
    const [history, setHistory]= useState(null);
    
    const colDefs5 = [{
        headerName: "id", field: "id",
        sortable: true,
        filter: true,
    }, {
        headerName: "comments", field: "comments",
        sortable: true,
        filter: true,
    }, {
        headerName: "interview date", field: "interview_date",
        sortable: true,
        filter: true,
    }, {
        headerName: "result", field: "result",
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
        headerName: "interview level", field: "interview_level",
        children: [{ headerName: "level name", field: 'interview_level.level_name', 
                    cellStyle: function (params) {
                        if (params.value != "") {
                            return { color: '#FFD869' };
                        }
                    } 
                }, 
        { headerName: "level hierarchy", field: 'interview_level.sequence_number' }],
        sortable: true,
        filter: true,
    }];

    const colDefs4 = [{
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
        children: [{headerName:"location", field: 'vac_location.location',
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


    const colDefs3 = [{
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
        children: [{headerName:"location", field: 'preffered_location.location',
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

    // const initialValue = [
    //     {
    //         id:0,vac_name: "", date_of_posting: "", vac_designation: "", no_of_vacancies: 0,
    //         project_name: "", yrs_of_exp: 0, comments: "",
    //         // skills: [{ skill_name: "" }],
    //         vac_location: { location: "" }, hiringManager: { emp_name: "" }
    //     }];

    const [level1, setLevel1] = useState(true);
    const [level2, setLevel2] = useState(false);
    const [level3, setLevel3] = useState(false);
    const [level4, setLevel4] = useState(false);
    const [complete, setComplete] = useState(false);


    const [info, setInfo] = useState(null);
    const [info2, setInfo2] = useState(null);
    const [curr_ind_vac, set_ind_vac] = useState();
    const [info3, setInfo3] = useState(null);
    const [curr_applicant, set_applicant] = useState();
    const [inv_levels, setInvLvl] = useState(null);
    const [curr_inv_level, setCurrInvLvl] = useState("");
    const [applicant_intv, setAppli] = useState(null);
    const pass_fail = ["Passed", "Failed"];
    const comp_pause = ["Complete", "Pause"];
    const [max_lvl, setMaxLvl] = useState("");


    const validationSchema = yup.object({

        count: yup
            .number()
            .positive()
            .min(1)
            .max(10)
            .required('This is required!'),


    });

    const validationSchema2 = yup.object({

        comments: yup
            .string()
            .required('This is required!'),

        pass_fail: yup
            .string()
            .required("This is required!"),


    });


     
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
                    // console.log(info)
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

        axios.get('http://127.0.0.1:8000/talentManager/getIntvLvl/')
            .then(
                data => {

                    // loc = JSON.stringify(data.data);
                    //locations=data.data

                    for (let i = 0; i < data.data.length - 1; ++i) {
                        for (let j = 0; j < data.data.length - 1 - i; ++j) {
                            if (data.data[j].sequence_number > data.data[j + 1].sequence_number) {
                                let temp = data.data[j]
                                data.data[j] = data.data[j + 1];
                                data.data[j + 1] = temp
                            }
                        }
                    }


                    setMaxLvl(data.data[data.data.length - 1].level_name)
                    console.log(data.data);


                    setInvLvl(data.data);
                    // console.log(info)
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

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    // const gridApi = useRef();
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );



    const [gridApi, setGridApi] = useState();
    const onButtonClick = () => {

        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
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

    const onButtonClick2 = () => {

        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData[0] != undefined) {
        console.log(selectedData[0])
        const vacInfo = { 'vacId': selectedData[0].id }

        axios.post('http://127.0.0.1:8000/talentManager/getAppInHistory/', vacInfo)
            .then(
                data => {
                    console.log(data.data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo3(data.data);
                    setLevel2(false);
                    setLevel3(true);
                    setSuccess3(false);
                    setError3(false);
                    setError4(false);
                    set_ind_vac(selectedData[0].id)
                    // console.log(info)
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
        console.log(selectedData[0])
        setAppli(selectedData[0])
        if (selectedData[0] != undefined) {
            if (selectedData[0].current_level == "") {
                setCurrInvLvl(inv_levels[0].level_name);
            }
            else {
                for (let i = 0; i < inv_levels.length; ++i) {
                    if (selectedData[0].current_level == inv_levels[i].level_name) {
                        setCurrInvLvl(inv_levels[i + 1].level_name);
                    }
                }
            }
           
        }

    }

    const goBack1 = () => {
        setLevel2(false);
        setLevel1(true);
    }

    const goBack2 = () => {
        setLevel3(false);
        setLevel2(true);
    }

    const goBack3 = () => {
        setLevel4(false);
        setLevel3(true);
    }
    const skip = () => {

        if (curr_inv_level == max_lvl) {
            const postData2 = {
                'applicant': applicant_intv.id,
                'result': "Passed",
            };
            console.log(postData2);

            axios.post('http://127.0.0.1:8000/talentManager/registerComplete/',
                postData2)
                .then(
                    data => {
                        console.log(data);

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
            const vacInfo = { 'vacId': curr_ind_vac }
            axios.post('http://127.0.0.1:8000/talentManager/getApplicantInterviewList/', vacInfo)
                .then(
                    data => {
                        console.log(data.data);
                        // loc = JSON.stringify(data.data);
                        //locations=data.data
                        setInfo3(data.data);

                        // console.log(info)
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



            setLevel4(false);
            setLevel3(true);

        }
        else {
            for (let i = 0; i < inv_levels.length; ++i) {
                if (inv_levels[i].level_name == curr_inv_level) {
                    setCurrInvLvl(inv_levels[i + 1].level_name);
                }
            }
        }
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

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => {
        setShow2(false)
        setHistory(null)
    };
    const handleShow2 = () => {
        setShow2(true)
        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData[0] != undefined) {
        axios.post('http://127.0.0.1:8000/talentManager/getHistory/',
        selectedData[0])
                .then(
                    data => {
                        console.log(data);
                        setHistory(data.data)
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

    };
    const hireApplicant = () => {
        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData[0] != undefined) {
        axios.post('http://127.0.0.1:8000/hiringManager/hireApplicant/',
        selectedData[0])
                .then(
                    data => {
                        console.log(data.data);
                        setInfo3(null);
                        if(data.data.success == true){
                            setSuccess3(true);
                            setError3(false);
                            setError4(false);
                        }
                        else{
                            setSuccess3(false);
                            setError3(true);
                            setError4(false);
                        }
                    }
                ).catch((error) => {
                    // Error
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        //invalid creds
                        setSuccess3(false);
                        setError3(false);
                        setError4(true);
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

                const vacInfo = { 'vacId': selectedData[0].id }

            axios.post('http://127.0.0.1:8000/talentManager/getAppInHistory/', vacInfo)
            .then(
                data => {
                    console.log(data.data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo3(data.data);
                    // console.log(info)
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
                    onGridReady={params => setGridApi(params.api)

                    }
                    columnDefs={colDefs}
                    rowData={info}>
                </AgGridReact>
                <link rel="stylesheet" href="style.css" />
                <ColorButton className={classes.submit} variant="outlined" onClick={handleShow} >
                    show required skills
            </ColorButton>
                <ColorButton className={classes.submit} variant="outlined" onClick={onButtonClick} >
                    get sub vacancies
            </ColorButton>
                <Modal className={classes.content} show={show} onHide={handleClose}>

                    <div
                        className="ag-theme-alpine-dark"
                        style={{
                            height: '300px',
                            width: '420px'
                        }}
                    >
                        <AgGridReact
                            columnDefs={colDefs4}
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
                    get shortlisted applicants
                </ColorButton>
                <Modal className={classes.content} show={show} onHide={handleClose}>

                    <div
                        className="ag-theme-alpine-dark"
                        style={{
                            height: '300px',
                            width: '420px'
                        }}
                    >
                        <AgGridReact
                            columnDefs={colDefs4}
                            rowData={skills}>
                        </AgGridReact>
                        <link rel="stylesheet" href="style.css" />
                    </div>

                </Modal>

            </div>}

            {/* LEVEL 3 APPLICANTS        */}
            {level3 && <div>
                <div
                    className="ag-theme-alpine-dark"
                    style={{
                        height: '500px',
                        width: '1200px'
                    }}
                >
                    <AgGridReact
                        onGridReady={params => setGridApi(params.api)

                        }
                        columnDefs={colDefs3}
                        rowData={info3}>
                    </AgGridReact>
                    <link rel="stylesheet" href="style.css" />
                    <ArrowBackIosOutlinedIcon onClick={goBack2} />
                    <ColorButton className={classes.submit} variant="outlined" onClick={handleShow} >
                        applicant's skills
                </ColorButton>
                    <ColorButton className={classes.submit} variant="outlined" onClick={handleShow2} >
                        applicant's interview history
                </ColorButton>
                <ColorButton className={classes.submit} variant="outlined" onClick={hireApplicant} >
                        hire applicant
                </ColorButton>
                {success3 && <FormHelperText className={classes.success3} >
                <DoneOutlinedIcon fontSize="medium" />
                applicant hired!
                </FormHelperText>}
                {error3 && <FormHelperText className={classes.error3} >
                <SmsFailedOutlinedIcon fontSize="medium" />
                cannot hire the applicant!
                </FormHelperText>}
                {error4 && <FormHelperText className={classes.error4} >
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
                                columnDefs={colDefs4}
                                rowData={skills}>
                            </AgGridReact>
                            <link rel="stylesheet" href="style.css" />
                        </div>

                    </Modal>
                    <Modal className={classes.content2} show={show2} onHide={handleClose2}>

                    <div
                        className="ag-theme-alpine-dark"
                        style={{
                            height: '300px',
                            width: '500px'
                        }}
                    >
                        <AgGridReact
                            columnDefs={colDefs5}
                            rowData={history}>
                        </AgGridReact>
                        <link rel="stylesheet" href="style.css" />
                    </div>

                </Modal>

                </div>
               

            </div>}

           
        </div>

    );
}
export default InterviewHistory;


{/* <link rel="stylesheet" href="style.css"/> */ }
