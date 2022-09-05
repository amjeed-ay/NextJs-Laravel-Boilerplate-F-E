import Transition from '@/utils/Transition'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useRef } from 'react'
import SidebarSubMenu from './SidebarSubMenu'

const SidebarMenu = ({ active = false, item, can }) => {
    const [subnav, setSubnav] = useState(active)
    const router = useRouter()

    const showSubnav = () => {
        setSubnav(!subnav)
    }
    const trigger = useRef(null)

    return item.subNav ? (
        <li className="mt-2">
            <button
                ref={trigger}
                onClick={() => {
                    item.subNav && showSubnav()
                }}
                className={`flex flex-grow px-2 py-2 w-full items-center  text-gray-200  transition duration-150 border-l-4 rounded-l-sm side-navs border-transparent pl-3 hover:bg-gray-700  ${
                    active
                        ? 'bg-gray-700 border-theme-1'
                        : !active && subnav
                        ? 'bg-gray-700'
                        : null
                }`}
                type="button">
                <div
                    className={`flex items-center h-6 w-6 ${
                        active && ''
                    } mr-2 `}>
                    {item.icon}
                </div>

                <span className="text-md flex items-center font-medium">
                    {item.title}
                </span>

                {item.subNav && (
                    <div className="flex  absolute right-0  w-12  p-1">
                        <svg
                            className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400 ${
                                subnav ? 'transform rotate-180' : null
                            }`}
                            viewBox="0 0 12 12">
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                    </div>
                )}
            </button>

            {item.subNav && subnav ? (
                <ul
                    className={`text-gray-700 transition ease-out duration-500 transform  bg-gray-800  mb-0.5 last:mb-0 `}>
                    {item.subNav.map((menu, i) => {
                        if (can?.[menu.permission]) {
                            return (
                                <SidebarSubMenu
                                    item={menu}
                                    key={i}
                                    subactive={router.pathname === menu.path}
                                />
                            )
                        }
                    })}
                </ul>
            ) : null}
        </li>
    ) : (
        <li className="mt-2">
            <Link href={item.path}>
                <a
                    className={`flex flex-grow px-2 py-2 items-center rounded-l-sm text-gray-200 item-center transition duration-150 border-l-4 border-transparent pl-3 hover:bg-gray-700  ${
                        active && 'bg-gray-700 border-theme-1 '
                    }`}>
                    <div
                        className={`flex items-center h-6 w-6 ${
                            active && ''
                        } mr-2 `}>
                        {item.icon}
                    </div>

                    <span className="text-md text-center font-medium ">
                        {item.title}
                    </span>
                </a>
            </Link>
        </li>
    )
}

export default SidebarMenu
