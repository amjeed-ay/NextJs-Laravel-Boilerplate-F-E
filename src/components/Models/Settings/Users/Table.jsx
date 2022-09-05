import moment from 'moment'
import ActivateUser from './ActivateUser'
import { reactFormatter } from 'react-tabulator/lib/Utils'

function Role(props) {
    const cellData = props.cell._cell.row.data
    return (
        <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
            <span
                aria-hidden
                className="absolute inset-0 bg-indigo-200 opacity-50 rounded-full"></span>
            <span className="relative">{cellData.role.name}</span>
        </span>
    )
}

function LastLogin(props) {
    const cellData = props.cell._cell.row.data
    return cellData.last_login
        ? moment(cellData.last_login).format('DD/MM/YYYY h:mm')
        : 'No Record'
}

function Status(props) {
    const cellData = props.cell._cell.row.data
    return <ActivateUser active={cellData.active} id={cellData.id} />
}

const userCols = [
    {
        title: 'Name',
        minWidth: 200,
        responsive: 0,
        field: 'name',
        hozAlign: 'left',
        vertAlign: 'middle',
        headerHozAlign: 'left',
    },
    {
        title: 'Email',
        minWidth: 150,
        responsive: 0,
        field: 'email',
        hozAlign: 'left',
        vertAlign: 'middle',
        headerHozAlign: 'left',
    },

    {
        title: 'Role',
        minWidth: 150,
        responsive: 0,
        hozAlign: 'left',
        vertAlign: 'middle',
        headerHozAlign: 'left',
        formatter: reactFormatter(<Role />),
    },

    {
        title: 'Last Login',
        minWidth: 200,
        responsive: 0,
        field: 'last_login',
        hozAlign: 'left',
        vertAlign: 'middle',
        headerHozAlign: 'left',
        formatter: reactFormatter(<LastLogin />),
    },
    {
        title: 'Active',
        width: 150,
        field: 'status',
        headerHozAlign: 'left',
        hozAlign: 'left',
        vertAlign: 'middle',
        headerSort: false,
        formatter: reactFormatter(<Status />),
    },
]

export default userCols
