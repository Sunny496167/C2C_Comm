export interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'document';
  url: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isGroup?: boolean;
}

export interface ChatGroup {
  id: string;
  name: string;
  members: string[];
  lastMessage?: Message;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: Date;
  likes: number;
  comments: number;
  image?: string;
}

export interface Profile {
  id: string;
  name: string;
  role: string;
  location: string;
  about: string;
  rating: number;
  cases: number;
  experience: number;
  education: {
    school: string;
    degree: string;
    field: string;
    year: string;
    grade: string;
  }[];
}