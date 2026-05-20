import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, LayoutGrid, List, Archive } from 'lucide-react';
import { mockPrePlanos, mockTickets } from '../data/mock';
import { SLABadge } from '../components/SLABadge';
import { StatusBadge } from '../components/StatusBadge';
import type { PrePlano, PrePlanoStatus } from '../types';

const columns: { status: PrePlanoStatus; label: string }[] = [
  { status: 'backlog', label: 'Backlog' },
  { status: 'em_montagem', label: 'Em Montagem' },
  { status: 'em_revisao', label: 'Em Revisão' },
  { status: 'aguardando_aprovacao', label: 'Aguard. Aprov.' },
  { status: 'aprovado', label: 'Aprovado' },
  { status: 'enviado_o9', label: 'Enviado O9' },
];

type ViewMode = 'board' | 'lista';

function PrePlanoCard({ pp }: { pp: PrePlano }) {
  return (
    <Link
      to={`/planos/${pp.id}`}
      className="block bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-1.5">
        <span className="font-mono text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors truncate">
          {pp.id.replace('PP-2026-05-', 'PP-...')}
        </span>
      </div>
      <div className="text-xs text-gray-500 mb-1.5">
        {pp.ticketCount} tickets • {pp.skuCount} SKUs
      </div>
      <div className="flex flex-wrap gap-1 mb-1.5">
        {pp.regionais.map((r) => (
          <span key={r} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
            {r.substring(0, 2).toUpperCase()}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{pp.responsavel}</span>
        <SLABadge level={pp.sla} label={pp.status === 'enviado_o9' ? `✓ ${pp.createdAt.slice(-5)}` : pp.slaRemaining} size="sm" />
      </div>
      {pp.status === 'aguardando_aprovacao' && (
        <div className="mt-1.5 text-xs text-orange-600 font-medium">
          Aprov: {pp.approvals.filter((a) => a.status === 'aprovado').length}/{pp.approvals.length}
        </div>
      )}
    </Link>
  );
}

// Backlog tickets (approved but not in a pre-plan)
const backlogTickets = mockTickets.filter((t) => t.status === 'aprovado' && !t.prePlanoId);

export function Planos() {
  const [view, setView] = useState<ViewMode>('board');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Planos</h1>
          <div className="flex items-center gap-2">
            {/* View switcher */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('board')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm ${view === 'board' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <LayoutGrid size={15} /> Board
              </button>
              <button
                onClick={() => setView('lista')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm border-l border-gray-200 ${view === 'lista' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <List size={15} /> Lista
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border-l border-gray-200 text-gray-500 hover:bg-gray-50">
                <Archive size={15} /> Arquivo
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              <Plus size={16} />
              Novo Plano
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 px-6 pb-3">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none">
            <option>Responsável ▼</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none">
            <option>Regional ▼</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none">
            <option>Urgência ▼</option>
          </select>
        </div>
      </div>

      {view === 'board' ? (
        <div className="flex-1 overflow-x-auto p-4">
          <div className="flex gap-3 h-full min-w-max">
            {columns.map(({ status, label }) => {
              const cards = mockPrePlanos.filter((p) => p.status === status);
              const isBacklog = status === 'backlog';

              return (
                <div key={status} className="flex flex-col" style={{ width: '200px' }}>
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                      {isBacklog ? backlogTickets.length : cards.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="flex-1 bg-gray-100 rounded-xl p-2 space-y-2 overflow-y-auto min-h-0">
                    {isBacklog ? (
                      backlogTickets.map((ticket) => (
                        <Link
                          key={ticket.id}
                          to={`/solicitacoes/${ticket.id}`}
                          className="block bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-grab"
                        >
                          <div className="font-mono text-xs font-semibold text-gray-700">{ticket.id}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {ticket.type === 'malha' ? '🗺️' : ticket.type === 'politica' ? '📋' : ticket.type === 'feriado' ? '📅' : '📦'} {ticket.summary.substring(0, 25)}...
                          </div>
                          <div className="mt-1.5">
                            <SLABadge level={ticket.sla} label={ticket.slaRemaining} size="sm" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      cards.map((pp) => <PrePlanoCard key={pp.id} pp={pp} />)
                    )}
                    {!isBacklog && cards.length === 0 && (
                      <div className="text-center py-8 text-xs text-gray-400">Vazio</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List view */
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Tickets</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Regionais</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Responsável</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">SLA</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {mockPrePlanos.map((pp) => (
                <tr key={pp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <Link to={`/planos/${pp.id}`} className="font-mono text-blue-600 hover:underline font-medium text-xs">
                      {pp.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={pp.status} /></td>
                  <td className="px-4 py-3 text-gray-600">{pp.ticketCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {pp.regionais.map((r) => (
                        <span key={r} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                          {r.substring(0, 2).toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{pp.responsavel}</td>
                  <td className="px-4 py-3"><SLABadge level={pp.sla} label={pp.slaRemaining} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
