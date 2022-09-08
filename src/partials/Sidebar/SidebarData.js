import { Dashboard, People, ShieldOutlined } from '@mui/icons-material'

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        permission: '',
        icon: <Dashboard />,
    },
    {
        title: 'Roles and Permission',
        path: '/roles',
        permission: 'view_role',
        icon: <ShieldOutlined />,
    },
    {
        title: 'Users',
        path: '/users',
        permission: 'view_user',
        icon: <People />,
    },
]
