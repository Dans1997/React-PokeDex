import React from 'react';
import Fetch from '../api/fetch';
import { withRouter } from "react-router-dom";

class Pokedex extends React.Component
{
    constructor(props) 
    {
        super(props);

        this.state = { search: " " }
    }

    renderLoginCredentials = () => {
        return (
            <div>
                Your email: {this.props.location.state.email} <br />
                Your password: {this.props.location.state.password}
            </div>
        );
    }

    // Updates search bar term
    onChange = (event) => {
        this.setState( { search: event.target.value } )
    }

    // Calls API
    onSubmit = (event) => {
        event.preventDefault();

        console.log(this.state.search)
        
    }

    render () 
    {
        return (
            <div>
                <h1> This is the Pokedex!</h1>
                <h2> Everything you need to know about Pokemon! </h2>
                <form onSubmit={this.onSubmit} >
                    <input type="text" placeholder="Search something..." size="50" value={this.state.search} onChange={this.onChange} /> 
                    <p> Need a hint? Try pokemon/ditto/, pokemon/1/ , type/3/ or ability/4/. </p>
                    <input type="submit" value="Search"></input>
                </form> <br />
                <Fetch search={this.state.search} />
            </div>
        );
    }
}

export default Pokedex;

const PokedexWithRouter = withRouter(Pokedex);