import React, { Component } from 'react';
import{Table, TableContainer, TableHead, TableCell, TableBody, TableRow, } from '@material-ui/core';

export class sensor extends Component {
    render() {
        return (
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TabeCell>id</TabeCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default sensor
