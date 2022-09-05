import React from 'react'
import { Field } from 'formik'

export default function ToggleSwitch({ name, value }) {
    return (
        <div className="relative">
            <Field
                type="checkbox"
                name={name}
                value={value}
                className="hidden toogleButton"
            />{' '}
            <div className="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"></div>
            <div className="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
    )
}
