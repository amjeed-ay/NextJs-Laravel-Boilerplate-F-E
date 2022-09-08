import DefaultCrudTemplate from '@/utils/templates/DefaultCrudTemplate'
import * as Yup from 'yup'
import Authenticated from '@/Layouts/Authenticated'
import { useAuth } from '@/hooks/auth'
import UserFields from '@/components/Models/Users/Fields'
import userCols from '@/components/Models/Users/Table'

const Users = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <Authenticated title="User" auth={user}>
            <DefaultCrudTemplate
                user={user}
                cols={userCols}
                Fields={UserFields}
                route="users"
                model="User"
                heading="Manage Users"
                validation={validation}
                initialValues={initialValues}
                serverSidePagination={true}
            />
        </Authenticated>
    )
}

export default Users

const initialValues = data => ({
    userId: data?.id ?? '',
    name: data?.name ?? '',
    email: data?.email ?? '',
    password_confirmation: '',
    role: data?.role?.id ?? '',
})

const validation = Yup.object({
    name: Yup.string().required('Please enter name'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords does not match ')
        .when('password', {
            is: password => password,
            then: Yup.string().required('Please Confrim Password'),
        }),
    role: Yup.string().required('Role Field is Required'),
})
