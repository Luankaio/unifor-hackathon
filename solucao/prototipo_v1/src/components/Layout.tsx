import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAppContext } from '../hooks/useAppContext';

export function Layout() {
  const { sidebarCollapsed } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main
        className={`transition-all duration-200 pt-0 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
