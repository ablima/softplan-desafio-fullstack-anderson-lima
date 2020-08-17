import React from 'react';
import { Redirect } from 'react-router-dom';

import './FinisherScreen.css'

class FinisherScreen extends React.Component {

    render(){
        if(!this.props.loggedUser){
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div>
                <h2>Finisher</h2>
            </div>
        );
    }

}

export default FinisherScreen;