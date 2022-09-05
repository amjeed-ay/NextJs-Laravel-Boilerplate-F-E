import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from './auth'

export const useDashboard = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { logout } = useAuth({ middleware: 'auth', shouldCallApi: false })

    const { data, error, mutate } = useSWR('/api/dashboard', () =>
        axios
            .get(`/api/dashboard`)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error.response
            }),
    )

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && data)
            router.push(redirectIfAuthenticated)
        // if (middleware === 'auth' && error) logout()
    }, [data, error])

    return {
        data,
        mutate,
    }
}
