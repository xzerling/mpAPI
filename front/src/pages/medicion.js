import React, { Component } from 'react';
import MedicionesTable from '../components/MedicionesTable';

export class medicion extends Component {
    render() {
        return (
            <div>
                <h1>Lista de mediciones</h1>
                <MedicionesTable/>
            </div>
        )
    }
}

export default medicion
