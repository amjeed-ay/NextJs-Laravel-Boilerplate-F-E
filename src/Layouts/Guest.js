import React from 'react'
import Head from 'next/head'
export default function Guest({ children }) {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="w-full flex h-screen justify-center  content-start ">
                <div className="flex m-8 w-full sm:max-w-md h-fit border pt-5 pb-5 rounded-md shadow-sm border-neutral-200 bg-white items-center content-center self-center">
                    {children}
                </div>
            </div>
        </>
    )
}
