import React, { useState } from 'react'
import { Formik, Form } from 'formik'

// Components ....
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import { useCrud } from '@/hooks/crud'
import { CircularProgress } from '@mui/material'

const DepotForm = props => {
    const [processing, setProcessing] = useState(false)
    const {
        updateData,
        createData,
        setShowModal,
        show,
        validation,
        route,
        model,
        Fields,
        initialValues,
        item,
    } = props

    const { data } = useCrud({
        route: `${route}/${item}`,
        callApi: props.show && item,
        queryParams: '',
    })

    return (
        <Modal
            title={data?.id ? 'Update ' + model : 'New ' + model}
            show={show}
            width={props.modalSize}
            handleClose={() => {
                setShowModal()
            }}>
            {data || !item ? (
                <Formik
                    initialValues={initialValues(data)}
                    validationSchema={validation}
                    onSubmit={values => {
                        setProcessing(true)
                        if (data?.id) {
                            updateData({
                                id: data.id,
                                values: values,
                                route: route,
                                model: model,
                                handleSuccess: () => {
                                    setProcessing(false)
                                    setShowModal(false)
                                },
                                handleError: () => setProcessing(false),
                            })
                        } else {
                            createData({
                                values: values,
                                route: route,
                                model: model,
                                handleSuccess: () => {
                                    setProcessing(false)
                                    setShowModal()
                                },
                                handleError: () => setProcessing(false),
                            })
                        }
                    }}>
                    {props => (
                        <Form>
                            <div className="mx-3">
                                <Fields
                                    values={props.values}
                                    setFieldValue={props.setFieldValue}
                                    data={data}
                                />

                                <div className="flex justify-end mt-5">
                                    <Button
                                        className="px-4 py-2 rounded-sm text-white font-semibold tracking-wide cursor-pointer"
                                        processing={processing}>
                                        {data?.id ? 'Update' : 'Submit'}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className="w-full flex p-5 justify-center">
                    <CircularProgress color="inherit" size={20} />
                </div>
            )}
        </Modal>
    )
}

export default DepotForm
