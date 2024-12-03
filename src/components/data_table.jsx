import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
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
        // Pagination state and controls
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 50 }, // Default to 10 rows per page
        },
        usePagination
    );

    return (
        <div>
            <table {...getTableProps()} style={{ width: '100%', border: '1px solid black', marginBottom: '20px' }}>
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
                    {page.map(row => {
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
            {/* Pagination controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    First
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    Last
                </button>
            </div>
        </div>
    );
}

export default DataTable;
