import {
    Dashboard,
    People,
    Settings,
    ShieldOutlined,
} from '@mui/icons-material'

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        permission: '',
        icon: <Dashboard />,
    },
    {
        title: 'Roles and Permission',
        path: '/settings/roles',
        permission: 'view_role',
        icon: <ShieldOutlined />,
    },
    {
        title: 'Users',
        path: '/settings/users',
        permission: 'view_user',
        icon: <People />,
    },
]
