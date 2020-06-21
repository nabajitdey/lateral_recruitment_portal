import React from 'react';
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
import { useSelector } from 'react-redux';
import { Link, Route, BrowserRouter, Redirect } from 'react-router-dom';
import UserProfile from './userProfile';
import AddSkills from './addSkills';
import AddManager from './addManager';
import UpdateManager from './updateManager';


const mainListItems = () => {

  // const routes = [
  //   {
  //     path: '/adminManager/userProfile/',
  //     component: UserProfile
  //   },
  //   {
  //     path: '/adminManager/addManager/',
  //     component: AddManager
  //   },
  //   {
  //     path: '/adminManager/updateManager/',
  //     component: UpdateManager
  //   },
  //   {
  //     path: '/adminManager/addSkills/',
  //     component: AddSkills
  //   }
  // ]


  return (
    <div>
      {/* <BrowserRouter> */}

        {/* <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/adminManager/userProfile/">user profile</Link></li>
          <li><Link to="/adminManager/addManager/">add manager</Link></li>
          <li><Link to="/adminManager/updateManager/">update manager</Link></li>
          <li><Link to="/adminManager/addSkills/">add skills</Link></li>
        </ul> */}

        <ListItem button  >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          {/* <Link to="/adminManager/userProfile/" /> */}
          <ListItemText primary="User profile" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          {/* <Link to="/adminManager/addManager/" /> */}
          <ListItemText primary="Add a manager" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          {/* <Link to="/adminManager/updateManager/" /> */}
          <ListItemText primary="Managers update section" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          {/* <Link to="/adminManager/addSkills/" /> */}
          <ListItemText primary="Skill set section" />
        </ListItem>

        {/* <div style={{ flex: 1, padding: '10px' }}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </div> */}
      {/* </BrowserRouter> */}

    </div>
  );
}

export default mainListItems;


