import { useRef, useEffect } from 'react';
import { CheckCheck, Bell, MessageSquare, AlertTriangle, UserCheck } from 'lucide-react';
import { mockNotifications } from '../data/mock';
import type { Notification } from '../types';

const typeIcon = (type: Notification['type']) => {
  switch (type) {
    case 'aprovado': return <CheckCheck size={16} className="text-green-500" />;
    case 'comentario': return <MessageSquare size={16} className="text-blue-500" />;
    case 'sla_risco': return <AlertTriangle size={16} className="text-red-500" />;
    case 'atribuido': return <UserCheck size={16} className="text-purple-500" />;
    default: return <Bell size={16} className="text-gray-400" />;
  }
};

interface Props {
  onClose: () => void;
}

export function NotificationPopover({ onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="font-semibold text-gray-800 text-sm">Notificações</span>
        <button className="text-xs text-blue-600 hover:underline">Marcar todas</button>
      </div>
      <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
        {mockNotifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/30' : ''}`}
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5">{typeIcon(n.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">
                  {n.message} <span className="font-medium">{n.detail}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 px-4 py-2 text-center">
        <button className="text-xs text-blue-600 hover:underline">Ver todas</button>
      </div>
    </div>
  );
}
