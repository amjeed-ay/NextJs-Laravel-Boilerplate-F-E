import React, { useState } from 'react'
import URLSearchParams from '@ungap/url-search-params'

export default ({ meta, gotoPage, pagelinks }) => {
    const [perPage, setPerPage] = useState(15)

    function setPage(url) {
        const page = new URLSearchParams(url?.split('?')[1]).get('page')
        page && gotoPage(`per_page=${perPage}&page=${page}`)
    }

    function setPageSize(size) {
        setPerPage(size)
        gotoPage(`per_page=${size}&page=${meta?.current_page}`)
    }

    if (meta?.links.length === 3) return null
    return (
        <div className="tabulator">
            <div className="tabulator-footer">
                <span className="tabulator-paginator">
                    <label>Page Size</label>
                    <select
                        className="tabulator-page-size"
                        aria-label="Page Size"
                        title="Page Size"
                        onChange={e => setPageSize(e.target.value)}>
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>

                    <button
                        className="tabulator-page"
                        type="button"
                        role="button"
                        aria-label="First Page"
                        title="First Page"
                        data-page="first"
                        onClick={() => setPage(pagelinks.first)}
                        // disabled={!canPreviousPage}
                    >
                        First
                    </button>
                    <button
                        className="tabulator-page"
                        type="button"
                        role="button"
                        aria-label="Prev Page"
                        title="Prev Page"
                        data-page="prev"
                        onClick={() => setPage(pagelinks.prev)}
                        // disabled={!canPreviousPage}
                    >
                        Prev
                    </button>

                    <span className="tabulator-pages">
                        {meta?.links?.map(({ active, label, url }) => {
                            return url === null ? (
                                label === '...' && '...'
                            ) : label != 'Next &raquo;' &&
                              label != '&laquo; Previous' ? (
                                <PageLink
                                    key={label}
                                    label={label}
                                    active={active}
                                    onClick={() => setPage(url)}
                                />
                            ) : null
                        })}
                    </span>

                    <button
                        className="tabulator-page"
                        type="button"
                        role="button"
                        aria-label="Next Page"
                        title="Next Page"
                        onClick={() => setPage(pagelinks.next)}
                        // disabled={!canNextPage}
                        data-page="next">
                        Next
                    </button>
                    <button
                        className="tabulator-page"
                        type="button"
                        role="button"
                        aria-label="Last Page"
                        title="Last Page"
                        onClick={() => setPage(pagelinks.last)}
                        // disabled={!canNextPage}
                        data-page="last">
                        Last
                    </button>
                </span>
            </div>
        </div>
    )
}

const PageLink = ({ active, label, onClick }) => {
    return (
        <button
            className={`tabulator-page ${active && 'active'}`}
            type="button"
            role="button"
            aria-label="Show Page 1"
            title="Show Page 1"
            onClick={onClick}
            data-page="1">
            {label}
        </button>
    )
}
