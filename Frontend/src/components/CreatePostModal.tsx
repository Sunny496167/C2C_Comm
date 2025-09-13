import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

interface CreatePostModalProps {
  onClose: () => void;
  onCreatePost: (content: string, image?: File) => void;
  userName: string;
}

export default function CreatePostModal({ onClose, onCreatePost, userName }: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content, image || undefined);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">{userName[0]}</span>
              </div>
              <span className="font-medium">{userName}</span>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="write something..."
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Add Photo</span>
            </button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            {image && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {image.name}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}