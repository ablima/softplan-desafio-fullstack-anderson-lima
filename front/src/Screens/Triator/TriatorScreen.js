import React from 'react';
import { Redirect } from 'react-router-dom';

import './TriatorScreen.css';

class TriatorScreen extends React.Component {

    render(){
        if(!this.props.loggedUser){
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div>
                <h2>Triator</h2>
            </div>
        );
    }

}

export default TriatorScreen;