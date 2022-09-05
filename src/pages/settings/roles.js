import DefaultCrudTemplate from '@/utils/templates/DefaultCrudTemplate'
import * as Yup from 'yup'
import Authenticated from '@/Layouts/Authenticated'
import { useAuth } from '@/hooks/auth'
import Fields from '@/components/Models/Settings/Roles/Fields'

export default function Roles() {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <Authenticated title="Store" auth={user}>
            <DefaultCrudTemplate
                user={user}
                cols={cols}
                fields={Fields}
                route="roles"
                model="Role"
                heading="Manage Roles"
                validation={validation}
                initialValues={initialValues}
            />
        </Authenticated>
    )
}

const validation = Yup.object({
    name: Yup.string().required('Please enter name'),
})

const initialValues = data => ({
    roleId: data?.id ?? '',
    name: data?.name ?? '',
    permissions: data?.permissions ?? [],
})

const cols = [
    {
        title: 'Name',
        minWidth: 200,
        responsive: 0,
        field: 'name',
        hozAlign: 'left',
        vertAlign: 'middle',
        headerHozAlign: 'left',
    },
]
