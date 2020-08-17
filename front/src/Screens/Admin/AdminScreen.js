import React from 'react';
import { Redirect } from 'react-router-dom';

import './AdminScreen.css'

class AdminScreen extends React.Component {

    render(){
        if(!this.props.loggedUser){
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div>
                <h2>Admin</h2>
            </div>
        );
    }

}

export default AdminScreen;