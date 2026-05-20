import { createContext, useContext } from 'react';
import type { Role } from '../types';

export interface AppContextValue {
  role: Role;
  setRole: (role: Role) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

export const AppContext = createContext<AppContextValue>({
  role: 'parametrizador',
  setRole: () => {},
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export const useAppContext = () => useContext(AppContext);
