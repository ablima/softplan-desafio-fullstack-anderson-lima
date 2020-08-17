import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginScreen from './Screens/Login/LoginScreen';
import AdminScreen from './Screens/Admin/AdminScreen';
import FinisherScreen from './Screens/Finisher/FinisherScreen';
import TriatorScreen from './Screens/Triator/TriatorScreen';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loggedUser: null
        }

        this.setUser = this.setUser.bind(this);
    }

    setUser(user){
        this.setState({
            loggedUser: user
        });
    }

    render(){
        return (
            <Router>
                <Switch>                    
                    <Route path="/admin">
                        <AdminScreen loggedUser={this.state.loggedUser} />
                    </Route>
                    <Route path="/finisher">
                        <FinisherScreen loggedUser={this.state.loggedUser} />
                    </Route>
                    <Route path="/triator">
                        <TriatorScreen loggedUser={this.state.loggedUser} />
                    </Route>
                    <Route path="/">
                        <LoginScreen loggedUser={this.state.loggedUser} 
                                     setUser={this.setUser} />
                    </Route>
                </Switch>
            </Router>
        );
    }

}

export default App;