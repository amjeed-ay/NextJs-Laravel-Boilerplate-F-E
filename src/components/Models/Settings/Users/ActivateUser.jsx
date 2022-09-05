import { useCrud } from '@/hooks/crud'
import React, { useState } from 'react'

export default function ActivateUser({ active, id }) {
    const [status, setStatus] = useState(active)
    const { updateData } = useCrud()

    const onHandleChange = e => {
        setStatus(e.target.checked)
        updateData({
            id: id,
            values: { active: e.target.checked },
            route: 'users/activation',
            model: 'User',
            handleSuccess: () => null,
            handleError: () => null,
        })
    }

    return (
        <label className="flex items-center">
            <div key={id} className="relative">
                <input
                    onChange={e => onHandleChange(e)}
                    type="checkbox"
                    name="active"
                    className=" hidden "
                    checked={status ? true : false}
                />{' '}
                <div className="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner" />
                <div className="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0" />
            </div>
        </label>
    )
}
