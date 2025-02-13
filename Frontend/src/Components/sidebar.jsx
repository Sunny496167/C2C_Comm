
import { MessageSquare, Users, Calendar, BookOpen, Layout } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Layout, current: true },
  { name: 'Messages', icon: MessageSquare, current: false },
  { name: 'Directory', icon: Users, current: false },
  { name: 'Events', icon: Calendar, current: false },
  { name: 'Resources', icon: BookOpen, current: false },
];

function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-800">EduConnect</h1>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;