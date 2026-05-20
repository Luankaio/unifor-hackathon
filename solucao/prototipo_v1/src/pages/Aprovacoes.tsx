import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, MessageSquare, Eye } from 'lucide-react';
import { SLABadge } from '../components/SLABadge';
import { mockPrePlanos } from '../data/mock';

type Tab = 'pendentes' | 'historico';

const pendingApprovals = mockPrePlanos.filter((pp) =>
  pp.approvals.some((a) => a.status === 'pendente')
);

const historyApprovals = mockPrePlanos.filter((pp) => pp.status === 'enviado_o9');

export function Aprovacoes() {
  const [tab, setTab] = useState<Tab>('pendentes');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Aprovações</h1>
        </div>
        <div className="flex items-center gap-1 px-6">
          {([
            { id: 'pendentes', label: `Pendentes (${pendingApprovals.length})` },
            { id: 'historico', label: 'Histórico' },
          ] as const).map((t) => (
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
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {tab === 'pendentes' && (
          <>
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-2">✅</div>
                <div>Nenhuma aprovação pendente</div>
              </div>
            ) : (
              pendingApprovals.map((pp) => {
                const pendingApprovers = pp.approvals.filter((a) => a.status === 'pendente').map((a) => a.aprovador);
                return (
                  <div key={pp.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    {/* SLA bar */}
                    <div className={`px-4 py-2 flex items-center gap-2 ${
                      pp.sla === 'critico' ? 'bg-red-50 border-b border-red-100' :
                      pp.sla === 'atencao' ? 'bg-yellow-50 border-b border-yellow-100' :
                      'bg-green-50 border-b border-green-100'
                    }`}>
                      <SLABadge level={pp.sla} label={`SLA: ${pp.slaRemaining} restantes`} />
                    </div>

                    {/* Content */}
                    <div className="px-4 py-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {pp.id} — Pré-plano
                          </h3>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {pp.ticketCount} tickets • {pp.skuCount} SKUs • {pp.cdCount} CDs • Regionais: {pp.regionais.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Solicitado por <span className="font-medium text-gray-700">{pp.responsavel}</span> • {pp.createdAt}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Aguardando aprovação de: <span className="font-medium text-orange-600">{pendingApprovers.join(', ')}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 italic">
                        Resumo: Alterações de malha para atendimento de pedidos críticos do período
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                      <Link
                        to={`/aprovacoes/${pp.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                      >
                        <Eye size={14} />
                        Ver detalhes
                      </Link>
                      <button className="flex items-center gap-1.5 px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 font-medium">
                        <CheckCircle size={14} />
                        Aprovar
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50">
                        <XCircle size={14} />
                        Rejeitar
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 ml-auto">
                        <MessageSquare size={14} />
                        Mais info
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {tab === 'historico' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Item</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Tipo</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Decisão</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Decidido em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {historyApprovals.map((pp) => (
                  <tr key={pp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-blue-600 text-xs">{pp.id}</td>
                    <td className="px-4 py-3 text-gray-600">Pré-plano</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                        ✅ Aprovado
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{pp.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
