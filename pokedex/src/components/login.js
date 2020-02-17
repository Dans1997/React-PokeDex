import React from 'react';
import '../css/login.css'

class Login extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state = {email: "", password: ""};
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        let email = this.state.email;
        let password = this.state.password;

        console.log(email);
        console.log(password);

        this.props.history.push({
            pathname: '/pokedex',
            state: {email: email, password: password}
        })
    }

    onChangeEmail = (event) => {
        this.setState( { email: event.target.value } )
    }

    onChangePassword = (event) => {
        this.setState( { password: event.target.value } )
    }

    render () 
    {
        return (
            <div className="center Login" >
                <h2> Sign In </h2>
                <form  onSubmit={this.onSubmit}>
                    <label> Email: </label> <br/>  
                    <input type="text" value={this.state.email} onChange={this.onChangeEmail} /> <br/> <br/> 
                    <label> Password: </label> <br/>
                    <input type="text " value={this.state.password} onChange={this.onChangePassword} />  <br/> <br/>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}

export default Login;