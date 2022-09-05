import '@/sass/app.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import Router from 'next/router'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import { SWRConfig } from 'swr'
import notify from '../components/Toast'

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }) => (
    <SWRConfig
        value={{
            onError: error => {
                if (
                    error.status !== 403 &&
                    error.status !== 404 &&
                    error.status !== 404 &&
                    error.status !== 401 &&
                    error.status !== 500
                ) {
                    notify('error', 'Network Error !', 'top-right')
                }
            },
        }}>
        <Component {...pageProps} />
        <ToastContainer />
    </SWRConfig>
)

export default App
