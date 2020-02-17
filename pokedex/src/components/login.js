import React from 'react';
import '../css/login.css'

class Login extends React.Component
{
    constructor(props) 
    {
        super(props);
    }

    onSubmit = (event) => {
        event.preventDefault();

        console.log("LUL");
        this.props.history.push('/pokedex');
    }

    render () 
    {
        return (
            <div className="center Login" >
                <h2> Sign In </h2>
                This is the login page! <br/> <br/> 
                <form  onSubmit={this.onSubmit}>
                    <label> Email: </label> <br/>  
                    <input type="text" /> <br/> <br/> 
                    <label> Password: </label> <br/>
                    <input type="text "/>  <br/> <br/>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}

export default Login;