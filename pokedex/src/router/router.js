import React from 'react';
import Pokedex from '../components/pokedex';
import Login from '../components/login';
import Home from '../components/home';
import PokeDetails from '../components/pokedetails';

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
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} /> 
                    <Route path="/pokedex" component={Pokedex} /> 
                    <Route path="/details" component={PokeDetails} />

                    <Redirect from='/login' to='/pokedex' />
                    <Redirect from='/pokedex' to='/details' />
                </Switch>
            </div>
        </Router>
    );
}

