import React from 'react';
import { Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';

const ScanGrid = ({ csv }) => {
    if (!csv) {
        return null;
    }
    console.log("renderizando")

    return (
        <Table stickyHeader>
            <TableHead>
                {csv.headers.map((header) => (<TableCell key={header}>{header}</TableCell>))}
            </TableHead>
            <TableBody>
                {csv.rows.map((row, index) => (
                    <TableRow key={index}>
                        {row.map((element, index2) => (
                            <TableCell key={index * csv.headers.length + index2}>
                                {element}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ScanGrid;
