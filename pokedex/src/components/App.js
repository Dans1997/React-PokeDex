import React from 'react';
import ReactDOM from 'react-dom';
import Pokedex from '../api/pokedex';
import Login from './login'
import Router from '../router/router'

class App extends React.Component {
    render() {
        return (
            <div>
                <Router />
            </div>
        );
    }
}

export default App;