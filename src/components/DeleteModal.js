import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Transition from '../utils/Transition.js'
import Button from './Button.js'

function DeleteModal({ id, ariaLabel, show, handleClose, deleteData, item }) {
    const modalContent = useRef(null)

    const [processing, setProcessing] = useState(false)

    // close the modal on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!show || modalContent.current.contains(target)) return
            handleClose()
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close the modal if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (keyCode !== 27) return
            handleClose()
        }
        document.addEventListener('keydown', keyHandler)

        return () => document.removeEventListener('keydown', keyHandler)
    })

    const comfirmDelete = () => {
        setProcessing(true)
        deleteData(item, () => {
            setProcessing(false)
            handleClose()
        })
    }

    return (
        <>
            {/* Modal backdrop */}
            <Transition
                className="fixed inset-0 z-50 bg-gray-900 bg-opacity-40 transition-opacity blur"
                show={show}
                enter="transition ease-out duration-200"
                enterStart="opacity-0"
                enterEnd="opacity-100"
                leave="transition ease-out duration-100"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                aria-hidden="true"
            />

            {/* Modal dialog */}
            <Transition
                id={id}
                className="fixed inset-0 z-50 overflow-hidden overflow-x-visible flex items-center justify-center transform px-2 sm:px-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby={ariaLabel}
                show={show}
                enter="transition ease-out duration-200"
                enterStart="opacity-0 scale-95"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-95">
                <div
                    className="bg-white flex justify-center flex-col p-5 rounded-md max-h-full shadow-lg"
                    ref={modalContent}>
                    <div className="flex text-white w-full items-start p-2">
                        <span className=" flex font-medium text-gray-600 text-lg">
                            Are you sure You want to delete?
                        </span>
                    </div>

                    <div className="flex -ml-2 space-x-1 lg:ml-0 justify-end mt-3 lg:mt-0">
                        <div className="flex space-x-2 mt-4 lg:mt-0">
                            <button
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleClose()
                                }}
                                className="button button--sm text-gray-600 border border-gray-300 ">
                                Cancel
                            </button>
                            <Button
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    comfirmDelete()
                                }}
                                type="button"
                                processing={processing}
                                className="button button--sm text-white bg-red-500 mr-2">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    )
}

export default DeleteModal

DeleteModal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element.isRequired,
    ]),
    id: PropTypes.string,
    ariaLabel: PropTypes.string,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}
