import * as React from 'react'

import { useSortBy, useTable } from 'react-table'

function BasicTable({ data, headers }) {
    const columns = React.useMemo(() => headers, [])

    const isEven = idx => idx % 2 === 0

    const tableInstance = useTable({ columns, data }, useSortBy)

    const { getTableBodyProps, headerGroups, prepareRow, rows } = tableInstance

    return (
        <div className="inline-block min-w-full overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps(),
                                    )}
                                    className="px-5 py-2 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider">
                                    {column.render('Header')}
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? '<'
                                            : '>'
                                        : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr
                                className={`${
                                    !isEven(i) && 'bg-gray-200 bg-opacity-50'
                                } hover:bg-gray-300 hover:bg-opacity-70`}
                                {...row.getRowProps()}>
                                {row.cells.map((cell, i) => (
                                    <td
                                        {...cell.getCellProps}
                                        className="px-5 py-1 border-b border-r border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {cell.render('Cell')}
                                        </p>
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default React.memo(BasicTable)
