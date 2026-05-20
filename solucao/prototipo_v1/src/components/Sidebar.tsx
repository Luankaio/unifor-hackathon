import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Package,
  Map,
  CheckSquare,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/solicitacoes', icon: FileText, label: 'Solicitações' },
  { to: '/planos', icon: Package, label: 'Planos' },
  { to: '/malhas', icon: Map, label: 'Malhas' },
  { to: '/aprovacoes', icon: CheckSquare, label: 'Aprovações' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
];

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, role } = useAppContext();

  return (
    <aside
      className={`fixed left-0 top-14 bottom-0 z-30 bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon size={20} className="flex-shrink-0" />
            {!sidebarCollapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {(role === 'gestor') && (
          <>
            <div className="mx-4 my-2 border-t border-gray-100" />
            <NavLink
              to="/configuracoes"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Settings size={20} className="flex-shrink-0" />
              {!sidebarCollapsed && <span>Configurações</span>}
            </NavLink>
          </>
        )}
      </nav>

      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden lg:flex items-center justify-center h-10 border-t border-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
      >
        {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
