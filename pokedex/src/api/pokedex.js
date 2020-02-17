import React from 'react';

class Pokedex extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state = {email: "", password: ""};
    }

    render () 
    {
        return (
            <div>
                <h1> This is the Pokedex API! </h1>
                Your email: {this.state.email} <br />
                Your password: {this.state.password}
            </div>
        );
    }
}

export default Pokedex;