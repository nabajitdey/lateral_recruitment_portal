import React, {useState} from 'react'
import './App.css'
import { Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import Login from './components/login.js'
import Home from './components/home.js'
//import {Redirect} from 'react-router-dom';

function App(){

    const [ userInfo, setUserInfo ] = useState('') 
   
    const userLogin = (data) => {
        console.log(data)
        console.log("hi")
        setUserInfo(data)
        
    }

    return (
        <div className="App">
            <BrowserRouter>
            {/* <Switch> */}
                <Route path="/login/" component ={Login}/>
                <Redirect to="/login/" />
                {/* <Login userLogin={userLogin}/> */}
                {/* <Home/> */}
                {/* <Home userInfo={userInfo}/> */}
                {/* <Route path="" component ={Login} userLogin={userLogin}/> */}
                {/* <Redirect from='' to="/home/" /> */}
                <Route path="/home/" component ={Home}/>
            {/* </Switch>  */}
             </BrowserRouter>
             {/* <Login userLogin={userLogin}/> */}
        </div>
    );
}

export default App;