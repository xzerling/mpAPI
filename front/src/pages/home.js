import React, { Component } from 'react'

import SensoresList from '../components/SensoresList';

export class home extends Component {
    render() {
        return (
            <div>
                <h1>Pagina de inicio</h1>
                <SensoresList />
            </div>
        )
    }
}

export default home
