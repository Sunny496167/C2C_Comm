// components/Notification.tsx
import { useEffect, useRef } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = notificationRef.current;
    const handleAnimationEnd = () => onClose();
    
    node?.addEventListener('animationend', handleAnimationEnd);
    return () => {
      node?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [onClose]);

  const typeStyles = {
    success: 'bg-blue-100 border-blue-400 text-blue-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  return (
    <div
      ref={notificationRef}
      className={`${typeStyles[type]} animate-slideInOut fixed bottom-4 right-4 rounded-lg border px-6 py-4 shadow-lg`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};