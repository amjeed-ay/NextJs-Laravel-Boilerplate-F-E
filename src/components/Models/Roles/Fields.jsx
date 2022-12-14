import InputField from '@/components/InputField'
import { memo } from 'react'
import PermissionsTree from './PermissionsTree'

function Fields({ values, setFieldValue }) {
    return (
        <>
            <InputField label="Role Name" name="name" />

            <div className="px-3">
                <label className="mt-4 flex font-semibold w-full border-b border-gray-200 text-lg">
                    Permissions:
                </label>
                <PermissionsTree
                    setFieldValue={setFieldValue}
                    values={values.permissions}
                />
            </div>
        </>
    )
}

export default memo(Fields)
