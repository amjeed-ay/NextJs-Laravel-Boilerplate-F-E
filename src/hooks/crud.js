import axios from '@/lib/axios'
import notify from '@/components/Toast'
import { useAuth } from './auth'
import useSWR from 'swr'
import { useEffect } from 'react'

export const useCrud = ({ queryParams, callApi = false, route } = {}) => {
    const { logout } = useAuth({ middleware: 'auth', shouldCallApi: false })

    const { data, error, mutate } = useSWR(
        callApi ? [`/api/${route}`, queryParams] : null,
        () =>
            axios
                .get(`/api/${route}?${queryParams}`)
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status !== 409) throw error.response
                }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const createData = async ({
        values,
        route,
        handleSuccess,
        handleError,
        model,
    }) => {
        await csrf()
        axios
            .post(`/api/${route}`, values)
            .then(() => {
                handleSuccess()
                notify('success', `${model} created successfully`, 'top-center')
                mutate()
            })
            .catch(error => {
                handleError()
                if (error.response?.status !== 422) throw error.response
                Object.values(error.response.data.errors)
                    .flat()
                    .map(err => notify('error', err))
            })
    }

    const showData = async (id, setData) => {
        await csrf()
        axios
            .get(`/api/${route}/${id}`)
            .then(res => setData(res.data))
            .catch(error => {
                if (error.response?.status !== 422) throw error.response
            })
    }

    const updateData = async ({
        values,
        id,
        route,
        handleSuccess,
        handleError,
        model,
    }) => {
        await csrf()
        axios
            .put(`/api/${route}/${id}`, values)
            .then(() => {
                handleSuccess()
                notify('success', `${model} created successfully`, 'top-center')
                mutate()
            })
            .catch(error => {
                handleError()
                if (error.response?.status !== 422) throw error.response
                Object.values(error.response.data.errors)
                    .flat()
                    .map(err => notify('error', err))
            })
    }

    const deleteData = async (id, model, setProcessing) => {
        await csrf()
        axios
            .delete(`/api/${route}/${id}`)
            .then(() => {
                setProcessing(false)
                notify('success', `${model} deleted successfully`, 'top-center')
                mutate()
            })
            .catch(error => {
                setProcessing(false)
                if (error.response?.status !== 422) throw error.response
            })
    }

    useEffect(() => {
        if (error && !process.env.APP_DEBUG) logout()
    }, [data, error])

    return {
        data,
        mutate,
        createData,
        showData,
        updateData,
        deleteData,
    }
}
