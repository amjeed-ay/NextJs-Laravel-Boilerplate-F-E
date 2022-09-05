import TableTopHeader from '@/components/TableTopHeader'
import { useCrud } from '@/hooks/crud'
import { convertObjToUrlParams } from '@/utils/Utils'
import debounce from 'lodash.debounce'
import { useEffect, useMemo, useState } from 'react'
import Form from './Form'
import Table from './Table'

const DefaultCrudTemplate = props => {
    const [showModal, setShowModal] = useState({ show: false, item: '' })

    const [filters, setFilters] = useState({
        search: '',
        from: '',
        to: '',
        page: '',
        store_id: '',
        user_id: '',
        status: '',
    })

    const { data, createData, updateData, deleteData } = useCrud({
        middleware: 'auth',
        route: props.route,
        callApi: true,
        queryParams: convertObjToUrlParams(filters),
    })

    const handleEdit = id => {
        setShowModal({ item: id, show: true })
    }

    const handleDelete = (id, setProcessing) => {
        deleteData(id, props.model, setProcessing)
    }

    // Server Side Search  ...............
    const setSearch = e => {
        setFilters({ ...filters, search: e.target.value })
    }

    const filterData = useMemo(() => {
        return debounce(setSearch, 300)
    }, [])

    useEffect(() => {
        return () => {
            filterData.cancel()
        }
    })
    //....................................

    const mdl = props.can ?? props.model.toLowerCase()

    return (
        <>
            <div className="w-full mt-2 h-full ">
                <TableTopHeader
                    can={props.user?.can?.[`create_${mdl}`]}
                    buttonText={`${'New ' + props.model}`}
                    heading={props.heading}
                    buttonAction={() => setShowModal({ show: true, item: '' })}
                />

                <div className="my-2 min-w-full h-full shadow p-2 bg-white rounded-sm overflow-hidden">
                    <Table
                        HeaderFilter={props?.HeaderFilter}
                        setSearch={filterData}
                        del={props.user?.can?.[`delete_${mdl}`]}
                        edit={props.user?.can?.[`edit_${mdl}`]}
                        data={data}
                        gotoPage={val =>
                            setFilters({
                                ...filters,
                                page: val,
                            })
                        }
                        setShowModal={setShowModal}
                        handleEdit={handleEdit}
                        onEdit={props.onEdit}
                        handleDelete={handleDelete}
                        cols={props.cols}
                        ssrp={props.ssrp}
                    />
                </div>
            </div>

            <Form
                item={showModal.item}
                setShowModal={() => setShowModal({ show: false, item: '' })}
                show={showModal.show}
                createData={createData}
                updateData={updateData}
                Fields={props.fields}
                isGenAdmin={props.user?.isGenAdmin}
                model={props.model}
                route={props.route}
                validation={props.validation}
                initialValues={props.initialValues}
            />
        </>
    )
}

export default DefaultCrudTemplate
