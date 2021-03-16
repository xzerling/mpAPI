import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export class Navbar extends Component {
    render() {
        return (
            <AppBar position='fixed'>
                <Toolbar>
                <Button color='inherit' component ={Link} to ='/login'>Login</Button>
                <Button color='inherit' component ={Link} to = '/'>Home</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
