import Button from '@/components/Button'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Guest from '@/Layouts/Guest'
import InputField from '@/components/InputField'
import ToggleSwitch from '@/components/ToggleSwitch'

const Login = () => {
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [processing, setProcessing] = useState(false)

    return (
        <Guest>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    remember: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Please enter your email'),
                    password: Yup.string().required(
                        'Password Field is Required',
                    ),
                })}
                onSubmit={values => {
                    setProcessing(true)
                    login({
                        ...values,
                        setProcessing,
                    })
                }}>
                {() => (
                    <Form className="w-full p-5">
                        <div className=" text-gray-300 py-1 border rounded-md flex justify-center mr-2 w-full items-center ">
                            <span className="tracking-widest font-medium ml-1 flex  text-2xl ">
                                My
                                <span className="font-medium  text-theme-1">
                                    Project
                                </span>
                            </span>
                        </div>
                        <div className="w-full flex p-3 text-2xl font-medium justify-center ">
                            <span>Login</span>
                        </div>
                        {/* Email Address */}
                        <InputField label="Email" name="email" type="email" />

                        {/* Password */}
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                        />

                        {/* Remember Me */}
                        <div className="block my-5">
                            <label className="flex items-center">
                                <ToggleSwitch name="remenber" />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <Button
                            fullWidth
                            processing={processing}
                            className=" w-32 px-4 ">
                            Login
                        </Button>

                        <div className="flex items-center justify-center mt-6">
                            <Link href="/forgot-password">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Forgot your password?
                                </a>
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Guest>
    )
}

export default Login
