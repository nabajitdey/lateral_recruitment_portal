// import React from 'react';

// const AdminManager = () =>{

//     return (
//         <div>Admin hain</div>
//     );
// }

// export default AdminManager;




import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { useSelector, useDispatch } from 'react-redux';
//import ProfileLists  from './profileList';
import Login from '../components/login';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AdminManager from '../admin_manager/adminManager.js';
import HiringManager from '../hiring_manager/hiringManager.js';
import { NavLink, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ApplicantRegistration from './applicantRegistration';
import ListApplicants from './listApplicants';
import ListVacancies from './listVacancies';
import InterviewProcess from './interviewProcess';
import InterviewHistory from './interviewHistory';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import { logout, islogout } from '../components/actions';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#9B08EE"
        //9B08EE D100FF
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        fontSize: 22,
        fontWeight: 400,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    navlink: {
        color: "white",
        backgroundColor: "white",
        '&:hover': {
            color: "white",
        },
        // '&:focus': {
        //     color: "#E7A9FF",
        // },
        // '&:visited': {
        //     color: "#E7A9FF",
        // },
        // '&:active': {
        //     color: "#E7A9FF",
        // }
        '&$selected': {
            backgroundColor: '#004C9B',
            color: 'black',
            fontWeight: theme.typography.fontWeightMedium,
        },
        // "& .MuiTouchRipple-root span":{
        //     backgroundColor: 'red!important',
        //     opacity: .3,
        //   },
    },
    icons: {
        color: "#CF55FF",
        '&:hover': {
            color: "#E7A9FF",
        }
        //CF55FF D100FF DF8CFF F0CAFF E7A9FF
    }
}));

const TalentManager = () => {

    const routes = [
        {
            path: '/talentManager/applicantRegistration/',
            component: ApplicantRegistration
        },
        {
            path: '/talentManager/listVacancies/',
            component: ListVacancies
        },
        {
            path: '/talentManager/Listapplicants/',
            component: ListApplicants
        },
        {
            path: '/talentManager/interviewProcess',
            component: InterviewProcess
        },
        {
            path: '/talentManager/interviewHistory/',
            component: InterviewHistory
        }
    ]


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

    const [am, setAM] = useState(false);
    const [hm, setHM] = useState(false);
    const [check, setCheck] = useState(true);

    const clicked = () => {
        setCheck(false)
    }

    const toAM = () => {
        setAM(true);
    }

    const toHM = () => {
        setHM(true);
    }



    const userInfo = useSelector(state => state.userInfoReducer);
    const isLogin = useSelector(state => state.loggedReducer);
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(islogout());
        dispatch(logout())
        return (
            <BrowserRouter>
                <Route path="/adminManager/" component={AdminManager} />
                <Redirect to="/adminManager/" />
            </BrowserRouter>
        );
    }

    var isAdminManager = false;
    var isHiringManager = false;
    if (userInfo != null)
        console.log(userInfo.user.designation.length);
    if (userInfo != null && userInfo.user.designation.length == 3) {
        isAdminManager = true;
        isHiringManager = true;

    }

    else if (userInfo != null && userInfo.user.designation.length == 2) {
        userInfo.user.designation.map((i) => i.id != 3 ? i.id == 1 ? isAdminManager = true : isHiringManager = true : 1);

    }



    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    if (isLogin != true) {
        return (
            <BrowserRouter>
                <Route path="/login/" component={Login} />
                <Redirect to="/login/" />
            </BrowserRouter>
        );
    }

    if (am == true) {
        return (
            <BrowserRouter>
                <Route path="/adminManager/" component={AdminManager} />
                <Redirect to="/adminManager/" />
            </BrowserRouter>
        );

    }

    if (hm == true) {
        return (
            <BrowserRouter>
                <Route path="/hiringManager/" component={HiringManager} />
                <Redirect to="/hiringManager/" />
            </BrowserRouter>
        );
    }


    return (<ThemeProvider theme={theme}>
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Talent Manager
                        </Typography>
                        <Typography fontFamily='Arial'>hi {userInfo.user.username}!</Typography>

                        <IconButton color="inherit">
                            {/* <Badge badgeContent={4} color="secondary"> */}
                            {/* <NotificationsIcon /> */}
                            {/* </Badge> */}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <NavLink to="/talentManager/applicantRegistration/" className={classes.navlink} onClick={clicked}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Applicant registration" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/talentManager/listVacancies/" className={classes.navlink} onClick={clicked}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Vacancies" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/talentManager/Listapplicants/" className={classes.navlink} onClick={clicked}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                    <BarChartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Applicants" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/talentManager/interviewProcess/" className={classes.navlink} onClick={clicked}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                    <LayersIcon />
                                </ListItemIcon>
                                <ListItemText primary="Interview process" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/talentManager/interviewHistory/" className={classes.navlink} onClick={clicked}>
                            <ListItem button>
                                <ListItemIcon className={classes.icons}>
                                    <LayersIcon />
                                </ListItemIcon>
                                <ListItemText primary="Interview histories" />
                            </ListItem>
                        </NavLink>
                    </List>
                    <Divider />
                    <List>
                        <div>
                            {(isAdminManager || isHiringManager) && <ListSubheader inset>Other Profiles</ListSubheader>}
                            {isHiringManager && <ListItem button onClick={toHM}>
                                <ListItemIcon className={classes.icons}>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Hiring Manager" />
                            </ListItem>}
                            {isAdminManager && <ListItem button onClick={toAM}>
                                <ListItemIcon className={classes.icons}>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Admin" />
                            </ListItem>}

                        </div>
                    </List>
                    <Divider />
                    <List>
                        <div>
                            <ListSubheader inset>Actions</ListSubheader>
                            <ListItem button onClick={signOut}>
                                <ListItemIcon className={classes.icons}>
                                    <PowerSettingsNewOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sign Out" />
                            </ListItem>

                        </div>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <div style={{ flex: 1, padding: '10px' }}>
                            {routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                    onClick={clicked}
                                />
                            ))}
                            {check && <ApplicantRegistration />}
                        </div>


                    </Container>
                </main>
            </div>
        </BrowserRouter>
    </ThemeProvider>
    );
}

export default TalentManager;