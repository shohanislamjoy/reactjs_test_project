import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { fetchData } from '../api';

function DataTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData().then(setData);
    }, []);
    
    console.log(data);
    
    const columns = React.useMemo(
        () => [
            { Header: 'Date', accessor: 'date' },
            { Header: 'Trade Code', accessor: 'trade_code' },
            { Header: 'High', accessor: 'high' },
            { Header: 'Low', accessor: 'low' },
            { Header: 'Open', accessor: 'open' },
            { Header: 'Close', accessor: 'close' },
            { Header: 'Volume', accessor: 'volume' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return ( 
        <table {...getTableProps()} style={{ width: '100%', border: '1px solid black' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} key={column.id}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} key={cell.column.id}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default DataTable;