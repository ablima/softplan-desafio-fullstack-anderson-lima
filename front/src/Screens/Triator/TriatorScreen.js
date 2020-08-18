import React from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../Services/Api';

import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
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

import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';

import TopBar from './../../Components/TopBar/TopBar';

import './TriatorScreen.css';

class TriatorScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            users: [],
            processes: [],
            popupOpen: false,
            newProcess: {
                description: "",
                users: []
            }
        }

        this.addProcess = this.addProcess.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.openPopupToEdit = this.openPopupToEdit.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.handleUserSelect = this.handleUserSelect.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount(){
        let users = [];
        let processes = [];
        
        let response = await api.get("users");
        if(response.data){
            users = response.data;
        }

        response = await api.get("process");
        if(response.data){
            processes = response.data;
        }

        processes.map(process => {
            process.users = this.getUsernames(users, process.users);
        });

        this.setState({
            users,
            processes
        });
    }

    getUsernames(userList, processUsers){
        let users = [];

        processUsers.map(userId => {
            userList.map(user => {
                if(user.id == userId){
                    users.push(user.username);
                }
            })
        });

        return users;
    }

    openPopup(){
        this.setState({
            popupOpen: true,
            newProcess: {
                description: "",
                users: []
            }
        });
    }

    openPopupToEdit(process){
        alert("Não implementado");
    }

    closePopup(){
        this.setState({
            popupOpen: false
        });
    }

    async addProcess(){
        let newProcess = this.state.newProcess;

        let users = [];
        this.state.newProcess.users.map(option => {
            if(option === parseInt(option, 10)){
                users.push(option);
            }
        });
        newProcess.users = users;

        let response = await api.post("process/" + this.props.loggedUser.id + "/add", newProcess);
        if(response.data){
            let process = response.data;
            process.users = this.getUsernames(this.state.users, process.users);

            let processes = this.state.processes;
            processes.push(response.data);
            
            this.setState({
                processes
            });
            this.closePopup();
        }
    }

    handleInputChange(e){
        let newProcess = this.state.newProcess;
        newProcess[e.target.id] = e.target.value;
        this.setState({
            newProcess
        });
    }

    handleUserSelect(e){
        let newProcess = this.state.newProcess;
        newProcess["users"] = e.target.value;
        this.setState({
            newProcess
        });
    }

    renderPopup(){
        return (
            <Dialog className="popup" open={this.state.popupOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Novo processo</DialogTitle>
                <DialogContent>
                    <TextField id="description" label="Descrição" fullWidth onChange={this.handleInputChange} />
                    <br/>
                    <br/>
                    <TextField id="users" label="Responsáveis" select fullWidth                        
                        SelectProps={{
                            multiple: true,
                            value: this.state.newProcess.users,
                            onChange: this.handleUserSelect
                        }}>
                        {this.state.users.map(user => (
                            <MenuItem value={user.id}>{user.username}</MenuItem>
                        ))}
                    </TextField>                
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closePopup} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.addProcess} color="primary">
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
                                    <TableCell align="left"><b>Descrição</b></TableCell>
                                    <TableCell align="left"><b>Responsáveis</b></TableCell>
                                    <TableCell align="left"><b>Status</b></TableCell>
                                    <TableCell align="left"><b>Ações</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.processes.map((process) => (
                                    <TableRow key={process.id}>
                                        <TableCell align="left">{process.description}</TableCell>
                                        <TableCell align="left">
                                            {process.users.map(username => (
                                                <span>{username}&nbsp;</span>
                                            ))}
                                        </TableCell>
                                        <TableCell align="left">{process.finished ? "Fechado" : "Aberto"}</TableCell>
                                        <TableCell align="left">
                                            <div>
                                                <a onClick={() => this.openPopupToEdit(process)}>
                                                    <BorderColorSharpIcon color="action" />
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

export default TriatorScreen;