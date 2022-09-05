import ReactTabulator from 'react-tabulator/lib/ReactTabulator'
import DeleteModal from './DeleteModal'
import Pagination from '@/utils/Pagination'
import { Skeleton } from '@mui/material'

const TabulatorWraper = ({
    data,
    deleteModal,
    setDeleteModal,
    handleDelete,
    item,
    columns,
    enableDelete = true,
    setSearch,
    filterValue,
    gotoPage,
    ssrp = false,
    HeaderFilter,
}) => {
    const options = {
        pagination: !ssrp && data?.length > 20 ? 'local' : false,
        paginationSize: 20,
        paginationSizeSelector: [10, 20, 30, 40],
        responsiveLayoutCollapseStartOpen: true,
        responsiveLayout: 'collapse',
        layout: 'fitColumns',
    }

    return (
        <>
            <div className="flex w-full  ">
                <div className=" flex items-center  justify-start pb-2 ">
                    <div className="flex bg-gray-50 items-center p-2 mr-auto w-full rounded-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
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
                </div>
                <div className="mr-auto flex items-center pb-2">
                    {HeaderFilter ?? ''}
                </div>
            </div>
            <div className="min-h-normal-full">
                <ReactTabulator
                    className="pb-3 min-w-full"
                    columns={columns}
                    data={ssrp ? data?.data : data}
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
            {ssrp && (
                <Pagination
                    meta={data?.meta}
                    pagelinks={data?.links}
                    gotoPage={gotoPage}
                />
            )}
            {enableDelete && (
                <DeleteModal
                    show={deleteModal}
                    handleClose={() => setDeleteModal(false)}
                    deleteData={handleDelete}
                    item={item}
                />
            )}
        </>
    )
}
export default TabulatorWraper
