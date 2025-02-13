
import { Users, MessageSquare, Calendar, Bookmark } from 'lucide-react';

const stats = [
  { name: 'Active Users', value: '2.7k', icon: Users, change: '+10%', changeType: 'increase' },
  { name: 'Messages', value: '482', icon: MessageSquare, change: '+7.2%', changeType: 'increase' },
  { name: 'Events', value: '24', icon: Calendar, change: '+12%', changeType: 'increase' },
  { name: 'Resources', value: '156', icon: Bookmark, change: '+3%', changeType: 'increase' },
];

const recentActivity = [
  {
    id: 1,
    user: 'Sarah Chen',
    action: 'posted in',
    target: 'Computer Science Forum',
    time: '5 minutes ago',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    user: 'Michael Torres',
    action: 'created event',
    target: 'AI Workshop',
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

function Dashboard() {
  return (
    <main className="pt-16 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-gray-900 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-blue-500 rounded-md p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-400 truncate">{item.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                  {item.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="bg-gray-900 rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-white">Recent Activity</h3>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-800">
                  {recentActivity.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src={item.image} alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {item.user} {item.action} {item.target}
                          </p>
                          <p className="text-sm text-gray-400">{item.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;