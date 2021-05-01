import React, { Component } from 'react';
//import{Table, TableContainer, TableHead, TableCell, TableBody, TableRow, } from '@material-ui/core';
import SensoresTable from '../components/SensoresTable';

export class sensorRegistrado extends Component {
    render() {
        return (
            <div>
                <h1>Lista de sensores registrados</h1>
                <SensoresTable/>
            </div>
        )
    }
}

export default sensorRegistrado
