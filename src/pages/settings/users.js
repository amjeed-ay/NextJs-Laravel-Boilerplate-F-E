import DefaultCrudTemplate from '@/utils/templates/DefaultCrudTemplate'
import * as Yup from 'yup'
import Authenticated from '@/Layouts/Authenticated'
import { useAuth } from '@/hooks/auth'
import UserFields from '@/components/Models/Settings/Users/Fields'
import userTableCols from '@/components/Models/Settings/Users/Table'
import userCols from '@/components/Models/Settings/Users/Table'

const initialValues = data => ({
    userId: data?.id ?? '',
    name: data?.name ?? '',
    email: data?.email ?? '',
    password_confirmation: '',
    role: data?.role?.id ?? '',
    store_id: data?.store_id ?? '',
})

const validation = Yup.object({
    name: Yup.string().required('Please enter name'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email'),
    // password: Yup.string().required(
    //     'Password Field is Required',
    // ),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords does not match ')
        .when('password', {
            is: password => password,
            then: Yup.string().required('Please Confrim Password'),
        }),
    role: Yup.string().required('Role Field is Required'),
})

const Users = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <Authenticated title="User" auth={user}>
            <DefaultCrudTemplate
                user={user}
                cols={userCols}
                fields={UserFields}
                route="users"
                model="User"
                heading="Manage Users"
                validation={validation}
                initialValues={initialValues}
                ssrp={true}
            />
        </Authenticated>
    )
}

export default Users
