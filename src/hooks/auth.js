import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import notify from '@/components/Toast'
import useSWR from 'swr'

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
    shouldCallApi = true,
} = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR(
        shouldCallApi ? '/api/user' : null,
        () =>
            axios
                .get('/api/user')
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status !== 409) throw error.response
                }),
        {
            onErrorRetry: error => {
                if (error.status === 401) return

                if (error.status === 500) return
            },
        },
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({ setStatus, setProcessing, ...props }) => {
        await csrf()
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => {
                mutate()
            })
            .catch(error => {
                setProcessing(false)
                if (error.response.status !== 422) throw error.response

                Object.values(error.response.data.errors)
                    .flat()
                    .map(err => notify('error', err))
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        login,
        logout,
    }
}
