import React, { useState } from 'react'
import { ActionCol } from '@/components/TabulatorActions'
import TabulatorWraper from '@/components/TabulatorWraper'
import { Delete, Edit } from '@mui/icons-material'
import { reactFormatter } from 'react-tabulator'

export default function Table({ cols, data, ...props }) {
    const [deleteModal, setDeleteModal] = useState(false)
    const [item, setItem] = useState('')

    const columns = [
        {
            title: '#',
            width: 70,
            minWidth: 50,
            responsive: 0,
            hozAlign: 'left',
            vertAlign: 'middle',
            headerHozAlign: 'left',
            formatter: 'rownum',
        },

        ...cols,
        {
            maxWidth: 50,
            hozAlign: 'center',
            vertAlign: 'middle',
            headerHozAlign: 'center',
            headerSort: false,
            visible: props.edit ?? false,
            formatter: reactFormatter(
                <ActionCol
                    can={props.edit}
                    disabled={true}
                    title="Edit"
                    icon={<Edit />}
                    handleClick={id => {
                        if (typeof props?.onEdit === 'function') {
                            props.onEdit()
                        }
                        props.handleEdit(id)
                    }}
                />,
            ),
        },
        {
            maxWidth: 50,
            hozAlign: 'center',
            vertAlign: 'middle',
            headerHozAlign: 'center',
            responsive: 0,
            headerSort: false,
            visible: props.del ?? false,
            formatter: reactFormatter(
                <ActionCol
                    can={props.del}
                    title="Delete"
                    disabled={true}
                    icon={<Delete />}
                    handleClick={id => {
                        setItem(id)
                        setDeleteModal(true)
                    }}
                />,
            ),
        },
    ]

    return (
        <TabulatorWraper
            HeaderFilter={props.HeaderFilter}
            ssrp={props.ssrp}
            setSearch={props.setSearch}
            gotoPage={props.gotoPage}
            data={data}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            handleDelete={props.handleDelete}
            item={item}
            columns={columns}
        />
    )
}
