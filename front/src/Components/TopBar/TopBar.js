import React from 'react';
import './TopBar.css';

class TopBar extends React.Component {

    render(){
        return (
            <div className="topBar">
                <div className="userContainer">
                    <h4>Bem-vindo,&nbsp;</h4>
                    <h4>{this.props.username}</h4>
                </div>                
            </div>
        );
    }

}

export default TopBar;