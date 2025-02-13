
import { Users, MessageSquare, Calendar, BookOpen, Shield, Globe } from 'lucide-react';

const features = [
  {
    name: 'Global Networking',
    description: 'Connect with students and faculty from universities worldwide.',
    icon: Globe,
  },
  {
    name: 'Secure Communication',
    description: 'End-to-end encrypted messaging and file sharing.',
    icon: Shield,
  },
  {
    name: 'Resource Sharing',
    description: 'Access and share educational resources across institutions.',
    icon: BookOpen,
  },
  {
    name: 'Event Management',
    description: 'Organize and participate in cross-university events.',
    icon: Calendar,
  },
  {
    name: 'Discussion Forums',
    description: 'Engage in topic-specific academic discussions.',
    icon: MessageSquare,
  },
  {
    name: 'Community Building',
    description: 'Create and join interest-based academic communities.',
    icon: Users,
  },
];

function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to connect and collaborate
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides all the tools necessary for meaningful academic collaboration and networking.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;