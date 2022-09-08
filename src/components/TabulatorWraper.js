import ReactTabulator from 'react-tabulator/lib/ReactTabulator'
import DeleteModal from './DeleteModal'
import Pagination from '@/utils/Pagination'
import { Skeleton } from '@mui/material'
import { Search } from '@material-ui/icons'

const TabulatorWraper = ({
    data,
    deleteModal,
    setDeleteModal,
    handleDelete,
    item,
    columns,
    setSearch,
    filterValue,
    gotoPage,
    serverSidePagination = false,
}) => {
    const options = {
        pagination:
            !serverSidePagination && data?.length > 20 ? 'local' : false,
        paginationSize: 20,
        paginationSizeSelector: [10, 20, 30, 40],
        responsiveLayoutCollapseStartOpen: true,
        responsiveLayout: 'collapse',
        layout: 'fitColumns',
    }

    return (
        <>
            <div className="flex bg-gray-50 items-center p-2 mr-auto w-full rounded-md">
                <Search />
                <input
                    className="bg-gray-50 outline-none ml-1  "
                    type="text"
                    name=""
                    id=""
                    placeholder="search..."
                    onChange={setSearch}
                    value={filterValue}
                />
            </div>

            <div className="min-h-normal-full">
                <ReactTabulator
                    className="pb-3 min-w-full"
                    columns={columns}
                    data={serverSidePagination ? data?.data : data}
                    options={options}
                />
                {!data && (
                    <div>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </div>
                )}
            </div>
            {serverSidePagination && (
                <Pagination
                    meta={data?.meta}
                    pagelinks={data?.links}
                    gotoPage={gotoPage}
                />
            )}

            <DeleteModal
                show={deleteModal}
                handleClose={() => setDeleteModal(false)}
                deleteData={handleDelete}
                item={item}
            />
        </>
    )
}
export default TabulatorWraper
