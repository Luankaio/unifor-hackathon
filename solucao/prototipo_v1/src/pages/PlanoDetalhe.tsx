import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, FileText, Send, MessageSquare, Plus } from 'lucide-react';
import { mockPrePlanos, mockTickets } from '../data/mock';
import { SLABadge } from '../components/SLABadge';
import { StatusBadge } from '../components/StatusBadge';
import { TypeChip } from '../components/TypeChip';

export function PlanoDetalhe() {
  const { id } = useParams();
  const pp = mockPrePlanos.find((p) => p.id === id) ?? mockPrePlanos[0];
  const tickets = mockTickets.filter((t) => t.prePlanoId === pp.id);

  const approvedCount = pp.approvals.filter((a) => a.status === 'aprovado').length;
  const isAprovado = pp.status === 'aprovado' || pp.status === 'enviado_o9';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link to="/planos" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-gray-800 text-sm">{pp.id}</span>
              <StatusBadge status={pp.status} />
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-100 text-sm flex items-center gap-4 text-gray-500">
          <span>Responsável: <span className="font-medium text-gray-700">{pp.responsavel}</span></span>
          <span>Criado em: <span className="font-medium text-gray-700">{pp.createdAt}</span></span>
          <span>Deadline cutoff: <span className="font-medium text-red-600">{pp.deadline}</span></span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Impact analysis */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Análise de impacto</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-6 text-sm mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{pp.ticketCount}</div>
                <div className="text-gray-500 text-xs">tickets</div>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{pp.skuCount}</div>
                <div className="text-gray-500 text-xs">SKUs afetados</div>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{pp.cdCount}</div>
                <div className="text-gray-500 text-xs">CDs</div>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{pp.regionais.length}</div>
                <div className="text-gray-500 text-xs">regionais</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Regionais:</span>
              {pp.regionais.map((r) => (
                <span key={r} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full font-medium">🟢 {r}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Approval status */}
        {pp.approvals.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-800 text-sm">Status de aprovação</h2>
              <span className="text-xs text-gray-500">{approvedCount}/{pp.approvals.length} aprovados</span>
            </div>
            <div className="divide-y divide-gray-50">
              {pp.approvals.map((approval, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-32">{approval.regional}:</span>
                    <div>
                      <div className="text-sm text-gray-800">
                        {approval.status === 'aprovado' ? (
                          <span className="text-green-600 font-medium">✅ Aprovado por {approval.aprovador}</span>
                        ) : approval.status === 'rejeitado' ? (
                          <span className="text-red-600 font-medium">❌ Rejeitado por {approval.aprovador}</span>
                        ) : (
                          <span className="text-orange-600">⏱ Aguardando {approval.aprovador}</span>
                        )}
                      </div>
                      {approval.approvedAt && (
                        <div className="text-xs text-gray-400">{approval.approvedAt}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tickets */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 text-sm">Tickets incluídos ({tickets.length})</h2>
            <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
              <Plus size={12} /> Add ticket
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/solicitacoes/${ticket.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="font-mono text-xs font-semibold text-blue-600 w-24 flex-shrink-0">{ticket.id}</span>
                <TypeChip type={ticket.type} />
                <span className="text-sm text-gray-700 flex-1 truncate">{ticket.summary}</span>
                <span className="text-xs text-gray-400">({ticket.solicitante})</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  ticket.priority === 'critica' ? 'bg-red-100 text-red-600' :
                  ticket.priority === 'alta' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {ticket.priority === 'critica' ? 'Crítica' : ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky footer actions */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center gap-3">
        <button
          disabled={!isAprovado}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FileText size={16} />
          Gerar arquivo O9
        </button>
        <button
          disabled={!isAprovado}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={16} />
          Marcar como Enviado
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          <MessageSquare size={16} />
          Comentar
        </button>
        <div className="ml-auto">
          <SLABadge level={pp.sla} label={`Cutoff: ${pp.deadline} (${pp.slaRemaining})`} />
        </div>
      </div>
    </div>
  );
}
