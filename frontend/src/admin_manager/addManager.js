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
import { green } from "@material-ui/core/colors";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
        paddingLeft: "475px"
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



const AddManager = () => {

    const classes = myStyles()

    const initialValueLoc = [
        { id: 0, location: "" }];
    const initialValueRole = [
        { id: 0, designation: "" }];
    const [locations, setLocations] = useState(initialValueLoc);
    const [roles, setRoles] = useState(initialValueRole);
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


        axios.get('http://127.0.0.1:8000/adminManager/getJobRole/')
            .then(
                data => {
                    console.log(data);
                    // loc = JSON.stringify(data.data);
                    //roles=data.data

                    setRoles(data.data);
                    console.log(roles);
                    roles.map((x) => {
                        console.log("yo");
                        console.log(x.designation);
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
        return <FormControlLabel {...field}
            control={<GreenRadio
                required="true"
            // checked="#9B08EE"


            />} label={label} />;
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
        username: yup
            .string()
            .required('This is required!'),
        password: yup
            .string()
            .required('This is required!')
            .min(6, 'Too short!')
            .max(13, 'Too long'),

        email: yup
            .string()
            .email('Invalid email')
            .required('This is required!')
            .max(30),

        emp_name: yup
            .string()
            .required('This is required!'),

        location: yup
            .string()
            .required("This is required!"),

        designation: yup
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
                emp_name: "",
                username: "",
                password: "",
                email: "",
                designation: [],
                location: "",

            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                // make async call
                console.log("submit: ", data);
                setSubmitting(false);
                axios.post('http://127.0.0.1:8000/adminManager/register/',
                    data)
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
                    <div  >
                        <MyTextField label="name of employee" placeholder="name of employee" name="emp_name" />
                        <MyTextField label="username" placeholder="username" name="username" />
                    </div>
                    <div>
                        <MyTextField type="password" label="password" placeholder="password" name="password" />
                        <MyTextField label="email" placeholder="email" name="email" />
                    </div>

                    <div className={classes.paper}>
                        <div >Job Locations:</div>
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
                    <div >
                        <div>Job Roles:</div>
                        <ul >
                            {
                                roles.map((y) => {
                                    return (
                                        <MyCheck
                                            name="designation"
                                            type="checkbox"
                                            value={y.designation}
                                            label={y.designation}
                                        />)
                                })
                            }
                        </ul>
                    </div>


                    <div>
                        <ColorButton className={classes.submit} variant="outlined" disabled={isSubmitting} type="submit" >
                            submit
                        </ColorButton>
                        {success1 &&
                            <FormHelperText className={classes.success}>
                                <DoneOutlinedIcon fontSize="medium" />
                                  user created!
                            </FormHelperText>}
                        {error1 &&
                            <FormHelperText className={classes.error}>
                                <SmsFailedOutlinedIcon fontSize="medium" />
                            username or email already exists!
                            </FormHelperText>}
                    </div>
                    {/* <pre color="white">{JSON.stringify(values, null, 2)}</pre>
                    <pre color="white">{JSON.stringify(errors, null, 2)}</pre> */}
                </Form>
            )}
        </Formik>


    )
}
export default AddManager;