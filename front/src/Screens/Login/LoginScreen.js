import React from 'react';
import { Redirect } from "react-router-dom";
import api from './../../Services/Api';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './LoginScreen.css';

class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }

        this.login = this.login.bind(this);
        this.redirect = this.redirect.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    async login() {
        let url = "login?username=" + this.state.username + "&password=" + this.state.password;

        const response = await api.get(url);
        if(response.data){
            this.props.setUser(response.data);
        }
    }

    updateField(e) {
        let newState = this.state;
        newState[e.target.id] = e.target.value;

        this.setState(newState);
    }

    redirect() {
        if(this.props.loggedUser){
            switch(this.props.loggedUser.type){
                case "Admin":
                    return (<Redirect to="/admin" />);
                
                case "Triator":
                    return (<Redirect to="/triator" />);
    
                case "Finisher":
                    return (<Redirect to="/finisher" />);
            }    
        }
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="loginContainer">
                    {this.redirect()}
                    <h1>Login</h1>
                    <div className="inputContainer">
                        <TextField className="inputField" fullWidth id="username" onChange={this.updateField} label="Usuario" />
                        <br/>
                        <br/>
                        <TextField className="inputField" fullWidth id="password" type="password" onChange={this.updateField} label="Senha" />
                    </div>    
                    <div className="actionContainer">
                        <Button variant="contained" color="primary" onClick={this.login}>
                            Entrar
                        </Button> 
                    </div>                                       
                </div>                
            </div>
        );
    }

}

export default LoginScreen;