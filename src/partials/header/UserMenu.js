import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import Transition from '../../utils/Transition'
import ResponsiveNavButton from '@/components/ResponsiveNavLink'

function UserMenu({ auth }) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { logout } = useAuth({ shouldCallApi: false })

    const trigger = useRef(null)
    const dropdown = useRef(null)

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setDropdownOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return
            setDropdownOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    return (
        <div className="relative inline-flex">
            <button
                ref={trigger}
                className="inline-flex justify-center items-center group"
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}>
                {/* <img
                    className="w-8 h-8 rounded-full"
                    src={UserAvatar}
                    width="32"
                    height="32"
                    alt="User"
                /> */}
                <div className="flex items-center truncate">
                    <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
                        {auth?.name}
                    </span>
                    <svg
                        className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
                        viewBox="0 0 12 12">
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                </div>
            </button>

            <Transition
                className="origin-top-right z-10 absolute top-full right-0 w-64 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0">
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}>
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b flex border-gray-200">
                        <div className="flex-shrink-0 items-center py-2 pr-2">
                            <svg
                                className="h-8 w-8 fill-current text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>

                        <div className="">
                            <div className="font-medium text-gray-800">
                                {auth?.email}
                            </div>
                            <span className="relative inline-block px-3 py-1 text-xs font-semibold text-gray-900 leading-tight">
                                <span
                                    aria-hidden
                                    className="absolute inset-0 bg-indigo-200 opacity-50 rounded-full"></span>
                                <span className="relative">
                                    {auth?.role?.name}
                                </span>
                            </span>
                        </div>
                    </div>

                    <ul>
                        <li>
                            <ResponsiveNavButton>
                                <span className="flex flex-col">
                                    Account Settings{' '}
                                    <span className="text-xs font-thin">
                                        Edit information, Change Password
                                    </span>
                                </span>
                            </ResponsiveNavButton>
                        </li>
                        <li>
                            <ResponsiveNavButton onClick={logout}>
                                Sign Out
                            </ResponsiveNavButton>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    )
}

export default UserMenu
