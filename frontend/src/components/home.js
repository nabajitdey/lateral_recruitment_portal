import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from './login';
import AdminManager from '../admin_manager/adminManager.js';
import HiringManager from '../hiring_manager/hiringManager.js';
import TalentManager from '../talent_manager/talentManager.js';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

const Home = () => {
    const userInfo = useSelector(state => state.userInfoReducer);
    const isLogin = useSelector(state => state.loggedReducer);
    
    if (isLogin != true) {
        return (
            <BrowserRouter>
                <Route path="/login/" component={Login} />
                <Redirect to="/login/" />
            </BrowserRouter>
        );
    }

    if (userInfo != null && userInfo.user.designation[0].designation == "Admin") {
        return (
            <BrowserRouter>
                <Route path="/adminManager/" component={AdminManager} />
                <Redirect to="/adminManager/" />
            </BrowserRouter>
        );
    }

    else if (userInfo != null && userInfo.user.designation[0].designation == "Hiring Manager") {
        return (
            <BrowserRouter>
                <Route path="/hiringManager/" component={HiringManager} />
                <Redirect to="/hiringManager/" />
            </BrowserRouter>
        );
    }

    else if (userInfo != null && userInfo.user.designation[0].designation == "Talent Manager") {
        return (
            <BrowserRouter>
                <Route path="/talentManager/" component={TalentManager} />
                <Redirect to="/talentManager/" />
            </BrowserRouter>
        );
    }

    return (
        <div>Home Page</div>
    );
}

export default Home;