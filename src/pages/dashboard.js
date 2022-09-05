import { useAuth } from '@/hooks/auth'
import { useDashboard } from '@/hooks/dashboard'
import Authenticated from '@/Layouts/Authenticated'
import { People } from '@mui/icons-material'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const { data } = useDashboard({ middleware: 'auth' })

    const cards = [
        {
            title: 'Users',
            value: 2,
            icon: <People className="h-10 w-10" />,
        },
    ]
    return (
        <Authenticated title="Dashboard" auth={user} header="Dashboard">
            <div className="px-1 py-4 w-full max-w-6xl">
                <div className="grid grid-cols-2 sm:grid-cols-4  gap-2 ">
                    {cards.map((card, i) => (
                        <DashboardCard key={i} data={card} />
                    ))}
                </div>
            </div>
        </Authenticated>
    )
}

export default Dashboard

function DashboardCard({ data }) {
    return (
        <div className="bg-gradient-to-r from-theme-1 to-indigo-400 text-white  rounded-md hover:shadow-xl shadow-sm flex items-center h-16 w-32 p-2 justify-around">
            <div className=" rounded-xl p-1 my-1">{data.icon}</div>
            <div className="text-center">
                <h1 className="text-4xl font-bold ">{data.value}</h1>
                <span>{data.title}</span>
            </div>
        </div>
    )
}
