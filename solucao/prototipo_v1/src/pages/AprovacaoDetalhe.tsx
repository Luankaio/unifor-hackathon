import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { mockPrePlanos, mockTickets } from '../data/mock';
import { SLABadge } from '../components/SLABadge';
import { TypeChip } from '../components/TypeChip';

export function AprovacaoDetalhe() {
  const { id } = useParams();
  const pp = mockPrePlanos.find((p) => p.id === id) ?? mockPrePlanos[0];
  const tickets = mockTickets.filter((t) => t.prePlanoId === pp.id);

  const typeCounts = {
    malha: tickets.filter((t) => t.type === 'malha').length,
    politica: tickets.filter((t) => t.type === 'politica').length,
    feriado: tickets.filter((t) => t.type === 'feriado').length,
    capacidade: tickets.filter((t) => t.type === 'capacidade').length,
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-6 py-3">
          <Link to="/aprovacoes" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Aprovar {pp.id}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 pb-32 space-y-4">
        {/* Executive summary */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Resumo executivo</h2>
          </div>
          <div className="px-4 py-4 space-y-1.5 text-sm text-gray-700">
            <p>Pré-plano com <strong>{pp.ticketCount} alterações</strong> em malhas, políticas e capacidade</p>
            <p>Impacta <strong>{pp.skuCount} SKUs</strong>, <strong>{pp.cdCount} CDs</strong> em <strong>{pp.regionais.length} regionais</strong></p>
            <p>Solicitado por <strong>{pp.responsavel}</strong> em {pp.createdAt}</p>
            <p>Deadline: cutoff {pp.deadline} (<SLABadge level={pp.sla} label={`${pp.slaRemaining} restantes`} size="sm" />)</p>
          </div>
        </div>

        {/* Impact analysis */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Análise de impacto</h2>
          </div>
          <div className="px-4 py-4">
            <div className="text-sm font-medium text-gray-600 mb-2">Tickets por tipo:</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {typeCounts.malha > 0 && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">🗺️ Malha: {typeCounts.malha}</span>}
              {typeCounts.politica > 0 && <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium">📋 Política: {typeCounts.politica}</span>}
              {typeCounts.feriado > 0 && <span className="px-2 py-1 bg-pink-50 text-pink-700 rounded-lg text-xs font-medium">📅 Feriado: {typeCounts.feriado}</span>}
              {typeCounts.capacidade > 0 && <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">📦 Capacidade: {typeCounts.capacidade}</span>}
            </div>
            <div className="text-sm font-medium text-gray-600 mb-2">Regionais afetadas:</div>
            <div className="space-y-2">
              {pp.approvals.map((approval, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-sm">
                  <div>
                    <span className="font-medium text-gray-700">{approval.regional}</span>
                    <span className="text-gray-400 ml-2">— {tickets.filter((t) => t.regional === approval.regional).length || '1'} alteração(ões)</span>
                  </div>
                  <div>
                    {approval.status === 'aprovado' ? (
                      <span className="text-green-600 font-medium text-xs">aprovação: {approval.aprovador} ✅</span>
                    ) : (
                      <span className="text-blue-600 font-medium text-xs">aprovação: VOCÊ</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 text-sm text-blue-700 flex gap-2">
              <span>💡</span>
              <span>Insight histórico: 3 alterações similares aprovadas neste mês — tempo médio de decisão foi 18 minutos.</span>
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Tickets do pré-plano ({tickets.length})</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center gap-3 px-4 py-3">
                <span className="font-mono text-xs font-semibold text-blue-600 w-24 flex-shrink-0">{ticket.id}</span>
                <TypeChip type={ticket.type} />
                <span className="text-sm text-gray-700 flex-1 truncate">{ticket.summary}</span>
                <span className="text-xs text-gray-400">({ticket.solicitante})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky decision panel */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-60 bg-white border-t-2 border-gray-200 p-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comentário <span className="text-gray-400">(opcional para aprovar, obrigatório para rejeitar)</span>
            </label>
            <textarea
              rows={2}
              placeholder="Escreva um comentário..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm hover:bg-red-50 font-medium">
              <XCircle size={16} />
              Rejeitar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50">
              <MessageSquare size={16} />
              Pedir mais info
            </button>
            <Link
              to="/aprovacoes"
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700 font-bold shadow-sm"
            >
              <CheckCircle size={16} />
              ✅ APROVAR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
