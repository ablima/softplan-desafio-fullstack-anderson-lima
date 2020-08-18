import React from 'react';
import { Redirect } from 'react-router-dom';
import api from './../../Services/Api';

import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CancelSharp from '@material-ui/icons/CancelSharp';

import TopBar from './../../Components/TopBar/TopBar';

import './AdminScreen.css'

class AdminScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            popupOpen: false,
            users: [],
            userTypes: [],
            newUser: {
                username: "",
                password: "",
                type: ""
            }
        }

        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    async componentDidMount(){
        let users = [];
        let userTypes = [];

        let response = await api.get("users");
        if(response.data){
            users = response.data;
        }

        response = await api.get("userTypes");
        if(response.data){
            userTypes = response.data;
        }

        this.setState({
            users,
            userTypes
        });
    }

    openPopup(){
        this.setState({
            popupOpen: true,
            newUser: {
                username: "",
                password: "",
                type: ""
            }
        });
    }

    closePopup(){
        this.setState({
            popupOpen: false
        });
    }

    async addUser(){
        let response = await api.post("users/add", this.state.newUser);
        if(response.data){
            let users = this.state.users;
            users.push(response.data);
            this.setState({
                users
            });
            this.closePopup();
        }
    }

    async removeUser(user){
        let response = await api.delete("users/" + user.id);
        if(response.data){
            let users = this.state.users;
            users.splice(users.indexOf(user), 1);
            this.setState({
                users
            });
        }
    }

    handleInputChange(e){
        let newUser = this.state.newUser;
        newUser[e.target.id] = e.target.value;
        this.setState(newUser);
    }

    handleSelectChange(e){
        let newUser = this.state.newUser;
        newUser["type"] = e.target.value;
        this.setState(newUser);
    }

    renderPopup(){
        return (
            <Dialog className="popup" open={this.state.popupOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Novo usuário</DialogTitle>
                <DialogContent>
                    <TextField id="username" label="Nome de usuário" fullWidth onChange={this.handleInputChange} />
                    <br/>
                    <br/>
                    <TextField id="password" type="password" label="Senha" fullWidth onChange={this.handleInputChange} />
                    <br/>
                    <br/>
                    <Select label="Tipo" onChange={this.handleSelectChange}>
                        {this.state.userTypes.map((type) => (
                            <MenuItem value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closePopup} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.addUser} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render(){
        if(!this.props.loggedUser){
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div>
                <TopBar username={this.props.loggedUser.username} />
                <div className="addButton">
                    <Button onClick={this.openPopup} variant="contained" color="default">Adicionar</Button>
                </div>                
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Nome</b></TableCell>
                                    <TableCell align="left"><b>Tipo</b></TableCell>
                                    <TableCell align="left"><b>Ações</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.users.map((user) => (
                                    <TableRow key={user.name}>
                                        <TableCell align="left">{user.username}</TableCell>
                                        <TableCell align="left">{user.type}</TableCell>
                                        <TableCell align="left">
                                            <div>
                                                <a onClick={() => this.removeUser(user)}>
                                                    <CancelSharp color="action" />
                                                </a>                                                
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                {this.renderPopup()}
            </div>
        );
    }

}

export default AdminScreen;