import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from './hooks/useAppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Solicitacoes } from './pages/Solicitacoes';
import { SolicitacaoDetalhe } from './pages/SolicitacaoDetalhe';
import { Planos } from './pages/Planos';
import { PlanoDetalhe } from './pages/PlanoDetalhe';
import { Malhas } from './pages/Malhas';
import { Aprovacoes } from './pages/Aprovacoes';
import { AprovacaoDetalhe } from './pages/AprovacaoDetalhe';
import { Analytics } from './pages/Analytics';
import type { Role } from './types';

function App() {
  const [role, setRole] = useState<Role>('parametrizador');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppContext.Provider value={{ role, setRole, sidebarCollapsed, setSidebarCollapsed }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/solicitacoes" element={<Solicitacoes />} />
            <Route path="/solicitacoes/:id" element={<SolicitacaoDetalhe />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/planos/:id" element={<PlanoDetalhe />} />
            <Route path="/malhas" element={<Malhas />} />
            <Route path="/aprovacoes" element={<Aprovacoes />} />
            <Route path="/aprovacoes/:id" element={<AprovacaoDetalhe />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
