import { useState } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { NotificationPopover } from './NotificationPopover';
import { mockNotifications } from '../data/mock';
import type { Role } from '../types';

const roleLabels: Record<Role, string> = {
  solicitante: 'Solicitante',
  parametrizador: 'Parametrizador',
  aprovador: 'Aprovador',
  gestor: 'Gestor',
};

export function Header() {
  const { role, setRole, setSidebarCollapsed, sidebarCollapsed } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4">
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2 font-bold text-blue-700 text-lg w-40 flex-shrink-0">
        <span className="text-2xl">🚚</span>
        <span>LogiFlow</span>
      </div>

      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            placeholder="Buscar ticket, plano, malha..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Role switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium"
          >
            <span>{roleLabels[role]}</span>
            <ChevronDown size={14} />
          </button>
          {showRoleMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-max overflow-hidden">
              {(Object.keys(roleLabels) as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setShowRoleMenu(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${role === r ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'}`}
                >
                  {roleLabels[r]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationPopover onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold cursor-pointer">
          W
        </div>
      </div>
    </header>
  );
}
