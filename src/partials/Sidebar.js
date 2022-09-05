import React, { useEffect, useRef } from 'react'
import SidebarMenu from './Sidebar/SidebarMenu'
import { SidebarData } from './Sidebar/SidebarData'
import { useRouter } from 'next/router'

function Sidebar({ sidebarOpen, setSidebarOpen, can }) {
    const trigger = useRef(null)
    const sidebar = useRef(null)
    const router = useRouter()

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return
            setSidebarOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    })

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return
            setSidebarOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    })

    return (
        <div className="lg:w-54">
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30  lg:hidden lg:z-auto transition-opacity duration-200 ${
                    sidebarOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden="true"></div>
            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`absolute lg:static lg:left-auto lg:top-auto lg:translate-x-0 z-40 left-0 top-0  transform h-screen overflow-y-scroll scrollbar-hide  lg:overflow-y-auto w-60 flex-shrink-0 bg-gray-900 transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0  ' : '-translate-x-64 '
                }`}>
                {/* Sidebar header */}
                <div className="flex  pr-3 w-full h-12 sm:px-2">
                    {/* Logo */}

                    <div className=" text-gray-300 py-1 mr-2 flex w-full items-center ">
                        <div className="flex justify-center dark:text-gray-300 rounded-full  ml-2 text-theme-1  p-4 bg-theme-1"></div>
                        <span className="tracking-widest font-medium ml-1 flex  text-xl ">
                            My
                            <span className="font-medium  text-theme-1">
                                Project
                            </span>
                        </span>
                    </div>

                    {/* Close button */}
                    <div className=" flex items-center  p-2 justify-end">
                        <div className="">
                            <button
                                ref={trigger}
                                className="lg:hidden  hover:bg-gray-700 rounded-md items-end text-gray-500 hover:text-gray-400"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                aria-controls="sidebar"
                                aria-expanded={sidebarOpen}>
                                <span className="sr-only">Close sidebar</span>
                                <svg
                                    className="w-7 h-7 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-px bg-gray-600 relative z-10 mb-6"></div>
                {/* Links */}
                <div>
                    <ul className="mt-3">
                        <li className=" w-full mb-5"></li>
                        {SidebarData.map((item, i) => {
                            if (item.title === 'devider') {
                                return (
                                    <li
                                        key={i}
                                        className="w-45 border-b border-gray-600 text-gray-300 relative flex items-center z-10 m-5">
                                        {item.header ?? ''}
                                    </li>
                                )
                            } else if (
                                can?.[item.permission] ||
                                item.permission == ''
                            ) {
                                return (
                                    <SidebarMenu
                                        can={can}
                                        item={item}
                                        key={i}
                                        active={
                                            item.subNav
                                                ? item.subNav?.some(
                                                      nav =>
                                                          nav.path ===
                                                          router.pathname,
                                                  )
                                                : router.pathname === item.path
                                        }
                                    />
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar
