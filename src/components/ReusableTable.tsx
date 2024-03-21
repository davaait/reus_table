import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses, TableCellProps} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, {TableRowProps} from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";

type TableProps =  {
    data: any[];
    headers: string[];
    filter: string;
    settings: {
        headerHeight: number;
        rowHeight: number;
        stripedRows: boolean;
    };
}

interface StyledTableCell extends TableCellProps {
    rowHeight?: number;
    headerHeight?: number;
    isHeader: boolean;
    isSelected?: boolean;
}
interface StyledTableRowProps extends TableRowProps {
    isStriped?: boolean;
}

// 'rgb(195 200 233)' - selected cells

const StyledTableCell = styled(TableCell, {
    shouldForwardProp: (prop) => prop !== 'rowHeight' && prop !== 'isSelected' && prop !== 'headerHeight' && prop !== 'isStriped' && prop !== 'isHeader',
})<StyledTableCell>(({ isSelected, rowHeight, headerHeight, theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(113 122 211)',
        color: theme.palette.common.white,
        fontSize: 16,
        fontWeight: 'bold',
        height: headerHeight
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: isSelected ? 'rgb(195 200 233)' : 'white',
        height: rowHeight,
        minWidth: 0,
        border: '0.5px solid grey',
        fontSize: 14,
        padding: 1,
        fontWeight: 'bold'
    },
}));

const StyledTableRow = styled(TableRow, {
    shouldForwardProp: (prop) => prop !== 'isStriped',
})<StyledTableRowProps>(({ isStriped = true }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: isStriped ? 'rgb(248 246 254)' : 'white',
    },
}));

export const ReusableTable = ({data, headers, filter, settings: { headerHeight, rowHeight, stripedRows }}: TableProps) => {
    const filterData = () => {
        setFilteredData(data.filter(row => row.first_name.toLowerCase().includes(filter.toLowerCase()) || row.last_name.toLowerCase().includes(filter.toLowerCase())))
    }

    useEffect(() => {
        filterData();
    }, [filter])

    const [filteredData, setFilteredData] = useState(data);

    return (
        <TableContainer sx={{ width: '100%', maxHeight: '70vh' }} component={Paper}>
            <Table aria-label="customized table">
                <TableHead sx={{ height: 50 }}>
                    <StyledTableRow>
                        {headers.map((cell) => (
                            <StyledTableCell headerHeight={headerHeight} isHeader={true} key={Math.random()} align="center">{cell}</StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((row: any) => (
                        <StyledTableRow isStriped={stripedRows} key={row.avatar}>
                            <StyledTableCell  rowHeight={rowHeight} isHeader={false} align="center">
                                <img src={row.avatar} style={{ width: 60, height: 60}} alt="img"/>
                            </StyledTableCell>
                            <StyledTableCell isSelected={row.first_name && row.first_name.includes('b')} rowHeight={rowHeight} isHeader={false} align="left">{row.first_name}</StyledTableCell>
                            <StyledTableCell isSelected={row.last_name && row.last_name.includes('e')} rowHeight={rowHeight} isHeader={false} align="left">{row.last_name}</StyledTableCell>
                            <StyledTableCell rowHeight={rowHeight} isHeader={false} align="left">{row.email}</StyledTableCell>
                            <StyledTableCell rowHeight={rowHeight} isHeader={false} align="left">{row.ethereum_address}</StyledTableCell>
                            <StyledTableCell rowHeight={rowHeight} isHeader={false} align="left">{row.ip_address}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
