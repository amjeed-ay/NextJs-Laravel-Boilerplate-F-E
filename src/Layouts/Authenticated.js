import React, { useState } from 'react'
import Sidebar from '@/partials/Sidebar'
import Header from '@/partials/Header'
import Head from 'next/head'

export default function Authenticated({ auth, header, title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // header={
    //     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
    //         Dashboard
    //     </h2>
    // }
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <div className="flex h-screen overflow-y-hidden">
                {/* Sidebar */}
                <Sidebar
                    can={auth?.can}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto scrollbar-hide overflow-x-hidden">
                    {/*  Site header */}
                    <Header
                        auth={auth}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <main className="px-2">{children}</main>
                </div>
            </div>
        </>
    )
}
