import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginScreen from './Screens/Login/LoginScreen';
import AdminScreen from './Screens/Admin/AdminScreen';

class App extends React.Component {

    render(){
        return (
            <Router>
                <Switch>                    
                    <Route path="/admin" component={AdminScreen} />
                    <Route path="/" component={LoginScreen} />
                </Switch>
            </Router>
        );
    }

}

export default App;