import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import InputNumber from 'react-input-number';
import FormHelperText from "@material-ui/core/FormHelperText";

import * as yup from "yup";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';

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
        marginBottom: theme.spacing(4),
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
        paddingLeft: "490px"
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
        paddingLeft: "513px"
    },
    number:{
        width:'4%',
        height:'2%',
        marginTop:'10px'
    }



}));




const ApplicantRegistration = () => {

    const classes = myStyles()

    const userInfo = useSelector(state => state.userInfoReducer);

    const initialValueLoc = [
        { id: 0, location: "" }];
    const initialValueSkill = [
        { id: 0, skill_name: "" }];
    const [locations, setLocations] = useState(initialValueLoc);
    const [skills, setSkills] = useState(initialValueSkill);
    const [error1, setError] = useState(false);
    const [success1, setSuccess] = useState(false);

    //var locations, roles;
    useEffect(() => {
        console.log("useEffect");
        axios.get('http://127.0.0.1:8000/adminManager/getJobLoc/')
            .then(
                data => {
                    console.log(data);
                    // loc = JSON.stringify(data.data);
                    //locations=data.data
                    setLocations(data.data);
                    console.log(locations);

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


        axios.get('http://127.0.0.1:8000/adminManager/getSkillSet/')
            .then(
                data => {
                    console.log(data);
                    // loc = JSON.stringify(data.data);
                    //roles=data.data

                    setSkills(data.data);
                    console.log(skills);
                    skills.map((x) => {
                        console.log("yo");
                        console.log(x.skill_name);
                    });
                    //console.log(roles);

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
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    // if (locations === {initialValueLoc} || roles === {initialValueRole}) {
    //     return (
    //         <ThemeProvider theme={theme}>
    //             <div>Server Down</div>
    //         </ThemeProvider>
    //     );
    // }
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

    const MyCheck = ({ label, ...props }) => {
        const [field] = useField(props);
        return (
            <FormControlLabel
                {...field}
                control={
                    <GreenCheckbox
                        className={classes.check}
                    />
                }
                label={label}
            />)
    };

    const MyRadio = ({ label, ...props }) => {
        const [field] = useField(props);
        return <FormControlLabel {...field} control={<GreenRadio required="true" />} label={label} />;
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

    const GreenCheckbox = withStyles({
        root: {
            color: '#E7A9FF',
            "&$checked": {
                color: "#9B08EE"
            }
        },
        checked: ""
    })(props => <Checkbox color="default" {...props} />);

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



    const validationSchema = yup.object({
        app_name: yup
            .string()
            .required('This is required!'),
        email: yup
            .string()
            .email('Invalid email')
            .required('This is required!')
            .max(30),

        yrs_of_exp: yup
            .number()
            .positive()
            .min(1, "Invalid")
            .max(10, "Invalid")
            .required('This is required!'),

        location: yup
            .string()
            .required("This is required!"),

        skills: yup
            .array()
            .required("At least one is required!")

    });



    return (
        // <div>
        //     dasd
        // </div>
        <Formik
            validateOnChange={true}
            initialValues={{
                app_name: "",
                email: "",
                yrs_of_exp: 0,
                skills: [],
                location: "",

            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                // make async call
                console.log("submit: ", data);
                setSubmitting(false);

                const postData = {
                    'email': data.email,
                    'app_name': data.app_name,
                    'yrs_of_exp': data.yrs_of_exp,
                    'skills': data.skills,
                    'preffered_location': data.location
                };
                console.log(postData);
                axios.post('http://127.0.0.1:8000/talentManager/register/',
                    postData)
                    .then(
                        data => {
                            console.log(data);
                            setError(false);
                            setSuccess(true);

                        }
                    ).catch((error) => {
                        // Error
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            //invalid creds
                            setError(true);
                            setSuccess(false);
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
                <Form className={classes.paper}>
                    <MyTextField label="applicant name "placeholder="applicant name" name="app_name" />
                    <MyTextField label="email" placeholder="email" name="email" />
                    
                    <div>years of experience:</div>
                    <Field
                        name="yrs_of_exp"
                        type={"number"}
                        defaultValue={1}
                        placeholder="yrs_of_exp"
                        className={classes.number}
                    />
                    <div className={classes.paper}>
                        <div>preffered locations:</div>
                        <ul>
                            {
                                locations.map((x) => {
                                    return (<MyRadio
                                        name="location"
                                        type="radio"
                                        value={x.location}
                                        label={x.location}
                                    />)
                                })
                            }
                        </ul>
                    </div>

                    <div>skills required:</div>
                    <ul>
                        {
                            skills.map((y) => {
                                return (
                                    <MyCheck
                                        name="skills"
                                        type="checkbox"
                                        value={y.skill_name}
                                        label={y.skill_name}
                                    />)
                            })
                        }
                    </ul>

                    <div>
                        <ColorButton className={classes.submit} variant="outlined" disabled={isSubmitting} type="submit" >
                            submit
                        </ColorButton>
                        {success1 &&
                            <FormHelperText className={classes.success}>
                                <DoneOutlinedIcon fontSize="medium" />
                                  applicant registered!
                            </FormHelperText>}
                        {error1 &&
                            <FormHelperText className={classes.error}>
                                <SmsFailedOutlinedIcon fontSize="medium" />
                            same email already exists!
                            </FormHelperText>}
                    </div>
                    {/* <pre color="white">{JSON.stringify(values, null, 2)}</pre>
                    <pre color="white">{JSON.stringify(errors, null, 2)}</pre> */}
                </Form>
            )}
        </Formik>


    );
}

export default ApplicantRegistration;