import React from 'react';
import './LoginScreen.css';

import { Link } from 'react-router-dom'

class LoginScreen extends React.Component {

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Link to="/admin">
                    <button>
                        To admin
                    </button>
                </Link>
            </div>
        );
    }

}

export default LoginScreen;