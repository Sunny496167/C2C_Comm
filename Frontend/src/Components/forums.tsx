import React from 'react';
import { MessageSquare, TrendingUp, Users, Bookmark, ArrowUpRight } from 'lucide-react';

const categories = [
  { name: 'Academic Discussions', count: 234, icon: MessageSquare },
  { name: 'Research Collaboration', count: 156, icon: Users },
  { name: 'Campus Life', count: 89, icon: Bookmark },
  { name: 'Career Development', count: 167, icon: TrendingUp },
];

const trendingTopics = [
  {
    id: 1,
    title: 'The Future of AI in Education',
    author: 'Dr. Sarah Chen',
    replies: 45,
    views: '2.3k',
    category: 'Academic Discussions',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Research Methods in Data Science',
    author: 'Prof. Michael Torres',
    replies: 32,
    views: '1.8k',
    category: 'Research Collaboration',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Student Exchange Programs 2025',
    author: 'Emma Watson',
    replies: 28,
    views: '1.5k',
    category: 'Campus Life',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
];

const recentDiscussions = [
    {
      id: 1,
      title: 'Tips for Publishing in Top Journals',
      author: 'James Wilson',
      time: '5 minutes ago',
      category: 'Research Collaboration',
      replies: 12,
    },
    {
      id: 2,
      title: 'Virtual Reality in Distance Learning',
      author: 'Lisa Chen',
      time: '15 minutes ago',
      category: 'Academic Discussions',
      replies: 8,
    },
    {
      id: 3,
      title: 'Networking Events This Semester',
      author: 'Mark Johnson',
      time: '45 minutes ago',
      category: 'Career Development',
      replies: 5,
    },
    {
      id: 4,
      title: 'Study Abroad Experience Share',
      author: 'Anna Smith',
      time: '1 hour ago',
      category: 'Campus Life',
      replies: 15,
    },
  ];

  
  function Forums() {
    return (
      <main className="pt-16 min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-white">Forums</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              New Discussion
            </button>
          </div>
  
          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <category.icon className="h-5 w-5 text-blue-400" />
                  <div>
                    <h3 className="text-white font-medium">{category.name}</h3>
                    <p className="text-gray-400 text-sm">{category.count} discussions</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Trending Topics */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Trending Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <img src={topic.image} alt={topic.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="text-sm text-blue-400 mb-2">{topic.category}</div>
                    <h3 className="text-white font-medium mb-2">{topic.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>{topic.author}</span>
                      <div className="flex items-center space-x-4">
                        <span>{topic.replies} replies</span>
                        <span>{topic.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        {/* Recent Discussions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Discussions</h2>
          <div className="bg-gray-900 rounded-lg">
            {recentDiscussions.map((discussion, index) => (
              <div
                key={discussion.id}
                className={`p-4 flex items-center justify-between hover:bg-gray-800 transition-colors cursor-pointer ${
                  index !== recentDiscussions.length - 1 ? 'border-b border-gray-800' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm text-blue-400">{discussion.category}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{discussion.time}</span>
                  </div>
                  <h3 className="text-white font-medium">{discussion.title}</h3>
                  <p className="text-sm text-gray-400">by {discussion.author}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">{discussion.replies} replies</span>
                  <ArrowUpRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Forums;