import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './styles.css';

const myStyles = makeStyles((theme) => ({

    paper: {
        width: "100%",
        marginTop: theme.spacing(4),
        paddingLeft: theme.spacing(20),

        //display: 'flex',
        //flexDirection: 'column',
        // alignItems: 'center',
        //marginTop: '100px'
        //paddingTop:'50px'
        // alignContent: 'centre',
        // alignSelf: 'centre'



    },
    avatar: {
        // margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.light,
        width: "50%",
        float: "left"


    },
    formControl: {
        marginTop: '-5px'
        // margin: theme.spacing.unit,
        //minWidth: 120,
        //paddingLeft: '-500px'
    },
    form: {
        width: '120%',
        marginTop: theme.spacing(-50),
        // marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(30),
        // marginRight: theme.spacing(1),
        float: "right"
    },
    submit2: {
        margin: theme.spacing(3, 0, 2),
        width: '70%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '25%',
        // marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(2),
        // marginLeft: theme.spacing(4),
        // marginRight: theme.spacing(4),
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
        paddingLeft: theme.spacing(8)
    },
    error2: {
        color: "red",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "430px"
    },

    label: {
        fontFamily: "Segoe UI Symbol",
        // color: "#3498DB"
        fontSize: 18

    },

    success: {
        color: "#77FF69",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: theme.spacing(13)
    },
    success2: {
        color: "#77FF69",
        fontSize: 16,
        fontFamily: "Segoe UI Symbol",
        alignItems: 'center',
        alignContent: 'centre',
        alignSelf: 'centre',
        paddingLeft: "450px"
    }



}));



const AddSkills = () => {

    const classes = myStyles()

    const colDefs = [{
        headerName: "id", field: "id",
        sortable: true,
        filter: true,
        checkboxSelection: true
    }, {
        headerName: "Skills", field: "skill_name",
        sortable: true,
        filter: true,
    }];
    const initialValue = [
        {
            skill_name: ""
        }];
    const [skills, setSkill] = useState(initialValue);
    const [error1, setError1] = useState(false);
    const [success1, setSuccess1] = useState(false);
    const [error2, setError2] = useState(false);
    const [success2, setSuccess2] = useState(false);
    const [gridApi, setGridApi] = useState();

    const MyTextField = ({
        label,
        type,
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

    const ColorButton = withStyles((theme) => ({
        root: {

            borderColor: '#E7A9FF',
            '&:hover': {
                backgroundColor: "#9B08EE",
                borderColor: "#9B08EE"
            },
        },
    }))(Button);


    useEffect(() => {
        console.log("useEffect");
        axios.get('http://127.0.0.1:8000/adminManager/getSkillSet/')
            .then(
                data => {
                    console.log(data.data);

                    setSkill(data.data);


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

    const validationSchema = yup.object({
        skill_name: yup
            .string()
            .required('This is required!'),
    });

    const onButtonClick = () => {

        const selectedNodes = gridApi.getSelectedNodes()
        console.log(selectedNodes)
        const selectedData = selectedNodes.map(node => node.data)
        console.log(selectedData[0])

        axios.post('http://127.0.0.1:8000/adminManager/removeSkill/', selectedData[0])
            .then(
                data => {
                    console.log(data.data);
                    setSkill(null);
                    setSuccess1(true);
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
                    setSuccess1(false);
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

        axios.get('http://127.0.0.1:8000/adminManager/getSkillSet/')
            .then(
                data => {
                    console.log(data.data);

                    setSkill(data.data);


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

    return (
        <div className={classes.paper}>
            <div className={classes.avatar}>
                <div
                    className="ag-theme-alpine-dark"
                    style={{
                        height: '450px',
                        width: '350px'
                    }}
                >
                    <AgGridReact
                        onGridReady={
                            params => setGridApi(params.api)

                        }
                        columnDefs={colDefs}
                        rowData={skills}>
                    </AgGridReact>
                    <link rel="stylesheet" href="style.css" />
                    <ColorButton className={classes.submit2} variant="outlined"
                        onClick={onButtonClick} > remove skill
                </ColorButton>
                    {success1 && <FormHelperText className={classes.success} >
                        <DoneOutlinedIcon fontSize="medium" />
        skill removed!
        </FormHelperText>}
                    {error1 && <FormHelperText className={classes.error} >
                        <SmsFailedOutlinedIcon fontSize="medium" />
        cannot delete, skill in use!
        </FormHelperText>}
                </div>
            </div>
            <div className={classes.form}>
                <div className={classes.label}>add a skill</div>
                <Formik
                    validateOnChange={true}
                    initialValues={{
                        skill_name: ""

                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        // make async call
                        console.log("submit: ", data);
                        setSubmitting(false);
                        axios.post('http://127.0.0.1:8000/adminManager/addSkill/',
                            data)
                            .then(
                                data => {
                                    console.log(data);
                                    setSkill(null);
                                    setError2(false);
                                    setSuccess2(true);

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

                        axios.get('http://127.0.0.1:8000/adminManager/getSkillSet/')
                            .then(
                                data => {
                                    console.log(data.data);

                                    setSkill(data.data);


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



                        resetForm();
                    }}
                >
                    {({ values, errors, isSubmitting }) => (
                        <Form>
                            <div  >
                                <MyTextField label="skill_name" placeholder="skill name" name="skill_name" />
                            </div>
                            <div>
                                <ColorButton className={classes.submit} variant="outlined" disabled={isSubmitting} type="submit" >
                                    submit
                            </ColorButton>
                                {success2 &&
                                    <FormHelperText className={classes.success2}>
                                        <DoneOutlinedIcon fontSize="medium" />
                                  skill added!
                            </FormHelperText>}
                                {error2 &&
                                    <FormHelperText className={classes.error2}>
                                        <SmsFailedOutlinedIcon fontSize="medium" />
                            skill already exists!
                            </FormHelperText>}
                            </div>
                            {/* <pre color="white">{JSON.stringify(values, null, 2)}</pre>
                    <pre color="white">{JSON.stringify(errors, null, 2)}</pre> */}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );

}
export default AddSkills;