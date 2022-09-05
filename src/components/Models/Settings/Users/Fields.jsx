import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import { useCrud } from '@/hooks/crud'

const fields = [
    { type: 'text', name: 'name', label: 'Name' },
    { type: 'text', name: 'email', label: 'Email' },
    {
        type: 'password',
        name: 'password',
        label: 'Password ',
    },
    {
        type: 'password',
        label: 'Confirm Password',
        name: 'password_confirmation',
    },
]

const UserFields = props => {
    const { data: roles } = useCrud({ route: 'roles', callApi: true })

    return (
        <>
            {fields.map((field, i) => {
                return (
                    <InputField
                        key={i}
                        label={field.label}
                        type={field.type}
                        name={field.name}
                    />
                )
            })}

            <SelectField
                label="Role"
                name="role"
                options={roles?.map(opt => ({
                    label: opt.name,
                    value: opt.id,
                }))}
            />
        </>
    )
}

export default UserFields
