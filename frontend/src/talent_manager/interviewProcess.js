import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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



const InterviewProcess = () => {

    const initialValue2 = [
        {
            skill_name: ""
        }];

    const classes = myStyles()
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success1, setSuccess] = useState(false);
    const [skills, setSkill] = useState(initialValue2);

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
        children: [{ headerName: "location",field: 'vac_location.location',
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
        children: [{ headerName: "name",field: 'hiringManager.emp_name' }],
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
        children: [{ headerName: "location", field: 'vac_location.location',
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
        children: [{ headerName: "name", field: 'hiringManager.emp_name' }],
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
        children: [{headerName: "location", field: 'preffered_location.location',
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


    useEffect(() => {
        console.log("useEffect");
        axios.get('http://127.0.0.1:8000/talentManager/getVacancyList/')
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
        console.log(selectedData[0])
        const vacInfo = { 'vacId': selectedData[0].id }

        axios.post('http://127.0.0.1:8000/talentManager/getApplicantInterviewList/', vacInfo)
            .then(
                data => {
                    console.log(data.data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setInfo3(data.data);
                    setLevel2(false);
                    setLevel3(true);
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
            setLevel3(false);
            setLevel4(true);
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

    

    const MyTextField = ({
        type,
        label,
        placeholder,
        ...props
    }) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";
        return (
            <ValidationTextField
                type={type}
                label={label}
                required="true"
                placeholder={placeholder}
                {...field}
                helperText={errorText}
                error={!!errorText}
                className={classes.root}
                variant="outlined"
                color="#9B08EE"
                borderWidth="50px"
            />
        );
    };
    const MyRadio = ({ label, ...props }) => {
        const [field] = useField(props);
        return <FormControlLabel {...field} control={<GreenRadio />} label={label} />;
    };

    const GreenRadio = withStyles({
        root: {
            color: '#E7A9FF',
            "&$checked": {
                color: "#9B08EE"
            }
        },
        checked: ""
    })(props => <Radio color="default" {...props} />);

    const MyRadio2 = ({ label, ...props }) => {
        const [field] = useField(props);
        return <FormControlLabel {...field} control={<GreenRadio2 required="true" />} label={label} />;
    };

    const GreenRadio2 = withStyles({
        root: {
            color: 'green',
            "&$checked": {
                color: "#77FF69"
            }
        },
        checked: ""
    })(props => <Radio color="default" {...props} />);

    const MyRadio3 = ({ label, ...props }) => {
        const [field] = useField(props);
        return <FormControlLabel {...field} control={<GreenRadio3 required="true" />} label={label} />;
    };

    const GreenRadio3 = withStyles({
        root: {
            color: 'red',
            "&$checked": {
                color: "red"
            }
        },
        checked: ""
    })(props => <Radio color="default" {...props} />);
    

    const ValidationTextField = withStyles({
        root: {
            '& input:valid + fieldset': {
                borderColor: "#9B08EE",
                borderWidth: 2,
            },
            '& input:invalid + fieldset': {
                borderColor: '#E7A9FF',
                borderWidth: 2,
            },
            '& input:valid:focus + fieldset': {
                borderLeftWidth: 6,
                padding: '4px', // override inline-style
            },
        },
    })(TextField);


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
                        show applicant's skills
                </ColorButton>
                    <ColorButton className={classes.submit} variant="outlined" onClick={onButtonClick3} >
                        start interview
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

                </div>
                <div className={classes.shortlist}>
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            count: 0,

                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            // make async call
                            console.log("submit: ", data);
                            setSubmitting(false);

                            const postData = {
                                'id': curr_ind_vac,
                                'count': data.count,
                            };
                            console.log(postData);
                            axios.post('http://127.0.0.1:8000/talentManager/selectApplicantViewSetList/',
                                postData)
                                .then(
                                    data => {
                                        console.log(data);
                                        setInfo3(data.data)

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



                            // resetForm();
                        }}
                    >
                        {({ values, errors, isSubmitting }) => (
                            <Form>
                                <div>count:</div>
                                <Field
                                    name="count"
                                    type={"number"}
                                    defaultValue={1}
                                    placeholder="count"
                                    className={classes.number}
                                />
                                <div>
                                    <ColorButton className={classes.submit} variant="outlined" disabled={isSubmitting} type="submit" >
                                        Shortlist applicants
                            </ColorButton>
                                </div>
                                {/* <pre color="white">{JSON.stringify(values, null, 2)}</pre>
                            <pre color="white">{JSON.stringify(errors, null, 2)}</pre> */}
                            </Form>
                        )}
                    </Formik>
                </div>

            </div>}

            {/* LEVEL 4 INTERVIEW */}
            {level4 && <div>
                <div className={classes.intv_level}>{curr_inv_level}</div>
                <Formik
                    validateOnChange={true}
                    initialValues={{
                        comments: "",
                        pass_fail: "",
                        comp_pause: "",
                    }}
                    validationSchema={validationSchema2}
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        // make async call
                        console.log("submit: ", data);
                        setSubmitting(false);

                        const postData = {
                            'applicant': applicant_intv.id,
                            'comments': data.comments,
                            'result': data.pass_fail,
                            'interview_level': curr_inv_level,
                        };
                        console.log(postData);


                        if(true){
                        axios.post('http://127.0.0.1:8000/talentManager/registerHistory/',
                            postData)
                            .then(
                                data => {
                                    console.log(data);
                                    setInfo3(null);

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

                        if (data.comp_pause == "Complete" || curr_inv_level == max_lvl || data.pass_fail == "Failed") {
                            const postData2 = {
                                'applicant': applicant_intv.id,
                                'result': data.pass_fail,
                            };
                            console.log("postData2");

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


                        }
                        console.log(max_lvl)
                        if (curr_inv_level == max_lvl || data.comp_pause == "Pause" || data.pass_fail == "Failed" || data.comp_pause == "Complete") {
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

                        resetForm();
                    }}
                >
                    {({ values, errors, isSubmitting }) => (
                        <Form>
                            <MyTextField label="comments" placeholder="comments" name="comments" />
                            <div className={classes.intv}></div>
                            <ul>
                                        <MyRadio2
                                            name="pass_fail"
                                            type="radio"
                                            value="Passed"
                                            label="Passed"
                                        />
                                        <MyRadio3
                                            name="pass_fail"
                                            type="radio"
                                            value="Failed"
                                            label="Failed"
                                        />
                            </ul>
                            <div>

                                <div></div>
                                <ul>
                                    {
                                        comp_pause.map((x) => {
                                            return (<MyRadio
                                                name="comp_pause"
                                                type="radio"
                                                value={x}
                                                label={x}
                                            />)
                                        })
                                    }
                                </ul>
                                <div></div>
                                    <div>
                                {(curr_inv_level != max_lvl) && <ColorButton className={classes.submit} variant="outlined" onClick={skip} disabled={isSubmitting}>
                                    Skip
                                </ColorButton>}
                                </div>
                                <div>
                                <ColorButton className={classes.submit} variant="outlined" disabled={isSubmitting} type="submit" >
                                    Submit
                                </ColorButton>
                                </div>

                            </div>
                            {/* <pre color="white">{JSON.stringify(values, null, 2)}</pre>
                            <pre color="white">{JSON.stringify(errors, null, 2)}</pre> */}
                        </Form>
                    )}
                </Formik>


                            <div className={classes.intv}> 
                    <CancelOutlinedIcon fontSize="large" className={classes.icons} onClick={goBack3}/>
                    </div>
            </div>}

        </div>

    );
}
export default InterviewProcess;


{/* <link rel="stylesheet" href="style.css"/> */ }
