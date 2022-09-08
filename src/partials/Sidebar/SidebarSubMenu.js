import Link from 'next/link'

const SidebarSubMenu = ({ subactive = false, item }) => {
    return (
        <li className="last:mb-0">
            <Link href={item.path}>
                <a
                    className={`flex px-3 py-2 lg:py-1.5 pl-16 items-center side-navs  hover:text-theme-1 ${
                        subactive ? 'text-theme-1' : 'text-gray-300'
                    } transition duration-150`}>
                    <span className={` text-md ${subactive && 'font-medium'} `}>
                        {item.title}
                    </span>
                </a>
            </Link>
        </li>
    )
}

export default SidebarSubMenu
