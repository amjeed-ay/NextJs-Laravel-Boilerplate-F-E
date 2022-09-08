import { useAuth } from '@/hooks/auth'
import Authenticated from '@/Layouts/Authenticated'
import { PeopleAltOutlined } from '@material-ui/icons'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <Authenticated title="Dashboard" auth={user} header="Dashboard">
            <div className="h-full   mb-10 ">
                {/* <!-- Statistics Cards --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                    <div className="bg-theme-1  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-indigo-600  font-medium group">
                        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                            <PeopleAltOutlined className="text-indigo-800" />
                        </div>
                        <div className="text-right  ">
                            <p className="text-2xl text-white">12</p>
                            <p className="text-white">Users</p>
                        </div>
                    </div>
                </div>
                {/* <!-- ./Statistics Cards --> */}
            </div>
        </Authenticated>
    )
}

export default Dashboard
