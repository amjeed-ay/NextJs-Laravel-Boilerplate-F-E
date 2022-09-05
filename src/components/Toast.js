import { toast } from 'react-toastify'

const notify = (type, msg, position = 'top-right') =>
    toast[type](msg, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

export default notify
