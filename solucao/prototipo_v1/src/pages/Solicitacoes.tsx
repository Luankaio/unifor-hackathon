import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { SLABadge } from '../components/SLABadge';
import { StatusBadge } from '../components/StatusBadge';
import { TypeChip } from '../components/TypeChip';
import { NovasSolicitacaoModal } from './NovasSolicitacaoModal';
import { mockTickets } from '../data/mock';
import { useAppContext } from '../hooks/useAppContext';

type Tab = 'minhas' | 'atribuidas' | 'todas';

export function Solicitacoes() {
  const { role } = useAppContext();
  const [tab, setTab] = useState<Tab>('minhas');
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'minhas', label: 'Minhas' },
    ...(role === 'parametrizador' ? [{ id: 'atribuidas' as Tab, label: 'Atribuídas a mim*' }] : []),
    { id: 'todas', label: 'Todas' },
  ];

  const filtered = mockTickets.filter((t) => {
    if (tab === 'minhas' && t.solicitante !== 'A. Lima' && t.solicitante !== 'M. Souza' && t.solicitante !== 'William') {
      // show all for demo
    }
    if (filterType && t.type !== filterType) return false;
    if (filterStatus && t.status !== filterStatus) return false;
    if (search && !t.id.toLowerCase().includes(search.toLowerCase()) && !t.summary.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Solicitações</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            <Plus size={16} />
            Nova Solicitação
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                tab === t.id
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 px-6 py-3 border-t border-gray-100">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tipo ▼</option>
            <option value="malha">Malha</option>
            <option value="politica">Política</option>
            <option value="feriado">Feriado</option>
            <option value="capacidade">Capacidade</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Status ▼</option>
            <option value="aberto">Aberto</option>
            <option value="em_analise">Em Análise</option>
            <option value="aprovado">Aprovado</option>
            <option value="rejeitado">Rejeitado</option>
            <option value="enviado_o9">Enviado O9</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>SLA ▼</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Regional ▼</option>
          </select>
          <div className="relative ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 w-32">ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 w-28">Tipo</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Resumo</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 w-28">Solicitante</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 w-24">Atrib.</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 w-36">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {filtered.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link to={`/solicitacoes/${ticket.id}`} className="flex items-center gap-2 group">
                    <SLABadge level={ticket.sla} size="sm" />
                    <span className="font-mono font-medium text-blue-600 group-hover:underline">{ticket.id}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <TypeChip type={ticket.type} />
                </td>
                <td className="px-4 py-3 text-gray-700 truncate max-w-xs">{ticket.summary}</td>
                <td className="px-4 py-3 text-gray-600">{ticket.solicitante}</td>
                <td className="px-4 py-3 text-gray-600">{ticket.atribuido}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={ticket.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-center gap-2">
        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><ChevronLeft size={16} /></button>
        {[1,2,3].map((p) => (
          <button key={p} className={`w-8 h-8 rounded text-sm ${p === 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{p}</button>
        ))}
        <span className="text-gray-400 text-sm">...</span>
        <button className="w-8 h-8 rounded text-sm text-gray-600 hover:bg-gray-100">12</button>
        <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><ChevronRight size={16} /></button>
      </div>

      {showModal && <NovasSolicitacaoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
