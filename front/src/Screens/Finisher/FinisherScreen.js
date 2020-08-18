import React from 'react';
import { Redirect } from 'react-router-dom';
import api from './../../Services/Api';

import Button from '@material-ui/core/Button';
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

import TopBar from './../../Components/TopBar/TopBar';

import './FinisherScreen.css'

class FinisherScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            popupOpen: false,
            finishProcess: null,
            processes: []
        };

        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.finishProcess = this.finishProcess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount(){
        if(this.props.loggedUser){
            let response = await api.get("process/" + this.props.loggedUser.id);
            if(response.data){
                let openProcesses = [];
                response.data.map(process => {
                    if(!process.finished){
                        openProcesses.push(process);
                    }
                });
                this.setState({
                    processes: openProcesses
                });
            }    
        }
    }

    openPopup(process){
        this.setState({
            popupOpen: true,
            finishProcess: process
        });
    }

    closePopup(){
        this.setState({
            popupOpen: false
        });
    }

    async finishProcess(){
        let response = await api.post("process/" + this.props.loggedUser.id + "/close/" + this.state.finishProcess.id, this.state.finishProcess);
        if(response.data){
            let processes = this.state.processes;
            processes.splice(processes.indexOf(response.data), 1);
            this.setState({
                processes,
                finishProcess: null
            });
            this.closePopup();
        }
    }

    handleInputChange(e){
        let finishProcess = this.state.finishProcess;
        finishProcess[e.target.id] = e.target.value;
        this.setState({
            finishProcess
        });
    }

    renderPopup(){
        return (
            <Dialog className="popup" open={this.state.popupOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Finalizar processo</DialogTitle>
                <DialogContent>
                    <TextField id="report" label="Relatório" fullWidth onChange={this.handleInputChange} />                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closePopup} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.finishProcess} color="primary">
                        Fechar
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
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Descrição</b></TableCell>
                                    <TableCell align="left"><b>Ações</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.processes.map(process => (
                                    <TableRow key={process.id}>
                                        <TableCell align="left">{process.description}</TableCell>
                                        <TableCell align="left">
                                            <div>
                                                <Button variant="contained" color="primary" onClick={() => this.openPopup(process)}>
                                                    Finalizar
                                                </Button>                                                
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

export default FinisherScreen;