import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import Transition from '../../utils/Transition'
import { ArrowDropDown, Person } from '@material-ui/icons'
import { MenuItem } from '@mui/material'

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

    return (
        <div className="relative inline-flex">
            <button
                ref={trigger}
                className="inline-flex justify-center items-center group"
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}>
                <div className="flex items-center truncate">
                    <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
                        {auth?.name}
                    </span>
                    <ArrowDropDown />
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
                            <Person />
                        </div>

                        <div>
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
                            <MenuItem onClick={logout}>Sign Out</MenuItem>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    )
}

export default UserMenu
