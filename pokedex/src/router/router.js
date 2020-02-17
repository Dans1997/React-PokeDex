import React from 'react';
import Pokedex from '../components/pokedex';
import Login from '../components/login'
import Home from '../components/home'

import '../css/router.css'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export default function Routing() {
    return (
        <Router> 
            <div className="link">
                <Link to='/home'>Home</Link> <br/>    
                <Link to='/login'>Login</Link> <br/>

                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} /> 
                    <Route path="/pokedex" component={Pokedex} /> 

                    <Redirect from='/login' to='/pokedex' />
                </Switch>
            </div>
        </Router>
    );
}

