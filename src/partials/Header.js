import { Store } from '@mui/icons-material'
import React from 'react'
import UserMenu from './header/UserMenu'

function Header({ auth, sidebarOpen, setSidebarOpen }) {
    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                        {/* Hamburger button */}
                        <button
                            type="button"
                            className="text-gray-500  hover:text-gray-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                setSidebarOpen(!sidebarOpen)
                            }}>
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="5" width="16" height="2" />
                                <rect x="4" y="11" width="16" height="2" />
                                <rect x="4" y="17" width="16" height="2" />
                            </svg>
                        </button>
                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center">
                        <hr className="w-px h-6 bg-gray-200 mx-3" />
                        <UserMenu auth={auth} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
