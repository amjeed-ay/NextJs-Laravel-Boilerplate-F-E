import * as React from 'react'
import { useProducts } from '@/hooks/product'
import {
    useAsyncDebounce,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table'

function BasicTable() {
    const { products } = useProducts({
        middleware: 'auth',
    })
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Category',
                accessor: 'category.name',
            },
            {
                Header: 'Store',
                accessor: 'store',
            },
            {
                Header: 'Price',
                accessor: 'cost_price',
                maxWidth: 50,
            },
        ],
        [],
    )

    const data = products?.data ?? []

    const isEven = idx => idx % 2 === 0

    const tableHooks = hooks => {
        hooks.visibleColumns.push(columns => [
            ...columns,
            {
                id: 'Edit',
                Header: 'Edit',
                Cell: ({ row }) => (
                    <button
                        onClick={() => alert('Edit ' + row.values.id)}
                        className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                        Edit
                    </button>
                ),
            },
        ])
    }

    const tableInstance = useTable(
        { columns, data, initialState: { pageIndex: 2 } },
        useGlobalFilter,
        useSortBy,
        usePagination,
        tableHooks,
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFiter,
        state: { pageIndex, pageSize, globalFilter },
    } = tableInstance

    return (
        <div className=" p-8 w-full h-screen flex justify-center ">
            <div className="w-2/3">
                <div className="bg-white p-8 rounded-md w-full">
                    <TopBar
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFiter={setGlobalFiter}
                    />
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-sm p-2 tabulator overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th
                                                    {...column.getHeaderProps(
                                                        column.getSortByToggleProps(),
                                                    )}
                                                    className="px-5 py-3 border-b-2 border-r border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                                    {page.map((row, i) => {
                                        prepareRow(row)
                                        return (
                                            <tr
                                                className={`${
                                                    !isEven(i) &&
                                                    'bg-gray-200 bg-opacity-30'
                                                } hover:bg-gray-300 hover:bg-opacity-70`}
                                                {...row.getRowProps()}>
                                                {row.cells.map((cell, i) => (
                                                    <td
                                                        {...cell.getCellProps}
                                                        className="px-5 py-1 border-b border-r border-gray-200 text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {cell.render(
                                                                'Cell',
                                                            )}
                                                        </p>
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <TableFooter
                                pageIndex={pageIndex}
                                setPageSize={setPageSize}
                                pageSize={pageSize}
                                gotoPage={gotoPage}
                                canPreviousPage={canPreviousPage}
                                previousPage={previousPage}
                                nextPage={nextPage}
                                canNextPage={canNextPage}
                                pageCount={pageCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BasicTable)

function TopBar({ preGlobalFilteredRows, globalFilter, setGlobalFiter }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)

    const onChange = value => {
        setGlobalFiter(value || undefined)
    }

    return (
        <div className=" flex items-center justify-between pb-6">
            <div>
                <h2 className="text-gray-600 font-semibold">Products Oder</h2>
                <span className="text-xs">All products item</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <input
                        className="bg-gray-50 outline-none ml-1 block "
                        type="text"
                        value={value || ''}
                        onChange={e => {
                            setValue(e.target.value)
                            onChange(e.target.value)
                        }}
                        name=""
                        id=""
                        placeholder="search..."
                    />
                </div>
            </div>
        </div>
    )
}

function TableFooter({
    setPageSize,
    pageIndex,
    pageSize,
    gotoPage,
    canPreviousPage,
    previousPage,
    nextPage,
    canNextPage,
    pageCount,
}) {
    return (
        <div class="tabulator-footer">
            <span class="tabulator-paginator">
                <label>Page Size</label>

                <select
                    className="tabulator-page-size"
                    aria-label="Page Size"
                    title="Page Size"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}>
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>

                <button
                    class="tabulator-page"
                    type="button"
                    role="button"
                    aria-label="First Page"
                    title="First Page"
                    data-page="first"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}>
                    First
                </button>
                <button
                    class="tabulator-page"
                    type="button"
                    role="button"
                    aria-label="Prev Page"
                    title="Prev Page"
                    data-page="prev"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}>
                    Prev
                </button>
                <span class="tabulator-pages">
                    <button
                        class="tabulator-page active"
                        type="button"
                        role="button"
                        aria-label="Show Page 1"
                        title="Show Page 1"
                        onClick={() => gotoPage(pageIndex)}
                        data-page="1">
                        {pageIndex + 1}
                    </button>
                    <button
                        class="tabulator-page"
                        type="button"
                        role="button"
                        aria-label="Show Page 2"
                        title="Show Page 2"
                        data-page="2">
                        2
                    </button>
                    <button
                        class="tabulator-page"
                        type="button"
                        role="button"
                        aria-label="Show Page 3"
                        title="Show Page 3"
                        data-page="3">
                        3
                    </button>
                    <button
                        class="tabulator-page"
                        type="button"
                        role="button"
                        aria-label="Show Page 4"
                        title="Show Page 4"
                        data-page="4">
                        4
                    </button>
                    <button
                        class="tabulator-page"
                        type="button"
                        role="button"
                        aria-label="Show Page 5"
                        title="Show Page 5"
                        data-page="5">
                        5
                    </button>
                </span>
                <span>
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>
                <button
                    class="tabulator-page"
                    type="button"
                    role="button"
                    aria-label="Next Page"
                    title="Next Page"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    data-page="next">
                    Next
                </button>
                <button
                    class="tabulator-page"
                    type="button"
                    role="button"
                    aria-label="Last Page"
                    title="Last Page"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    data-page="last">
                    Last
                </button>
            </span>
        </div>
    )
}
