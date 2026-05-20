import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Paperclip, Send } from 'lucide-react';
import { mockTickets } from '../data/mock';
import { SLABadge } from '../components/SLABadge';
import { StatusBadge } from '../components/StatusBadge';
import { TypeChip } from '../components/TypeChip';

const timeline = [
  { time: '10:23', actor: 'William', type: 'comment', text: 'Validando o lead time com a operação' },
  { time: '10:15', actor: 'Sistema', type: 'event', text: 'Status mudou: Aberto → Em Análise' },
  { time: '10:12', actor: 'M. Souza', type: 'comment', text: 'Cliente XYZ precisa receber no dia 21. Verificar se conseguimos.' },
  { time: '10:10', actor: 'Sistema', type: 'event', text: 'Ticket criado por M. Souza. Atribuído a: William' },
];

export function SolicitacaoDetalhe() {
  const { id } = useParams();
  const ticket = mockTickets.find((t) => t.id === id) ?? mockTickets[0];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link to="/solicitacoes" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-gray-800">{ticket.id}</span>
              <TypeChip type={ticket.type} />
              <SLABadge level={ticket.sla} label={`SLA: ${ticket.slaRemaining}`} />
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Context bar */}
        <div className="flex items-center gap-4 px-6 py-2 bg-gray-50 border-t border-gray-100 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Status:</span>
            <StatusBadge status={ticket.status} />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Prioridade:</span>
            <span className={`font-medium capitalize ${ticket.priority === 'critica' ? 'text-red-600' : ticket.priority === 'alta' ? 'text-yellow-600' : 'text-gray-700'}`}>
              {ticket.priority === 'critica' ? 'Crítica' : ticket.priority}
            </span>
          </div>
          {ticket.prePlanoId && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Vinculado:</span>
              <Link to={`/planos/${ticket.prePlanoId}`} className="text-blue-600 font-medium hover:underline">
                {ticket.prePlanoId}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Body - 2 columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Details */}
        <div className="w-80 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Detalhes</h3>
              <dl className="space-y-2">
                {ticket.origem && (
                  <>
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-500">Origem</dt>
                      <dd className="font-medium text-gray-800">{ticket.origem}</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-500">Destino</dt>
                      <dd className="font-medium text-gray-800">{ticket.destino}</dd>
                    </div>
                  </>
                )}
                {ticket.sku && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">SKU</dt>
                    <dd className="font-medium text-gray-800">{ticket.sku}</dd>
                  </div>
                )}
                {ticket.modal && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Modal</dt>
                    <dd className="font-medium text-gray-800">{ticket.modal}</dd>
                  </div>
                )}
                {ticket.leadTime && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Lead time</dt>
                    <dd className="font-medium text-gray-800">{ticket.leadTime}</dd>
                  </div>
                )}
                {ticket.vigencia && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Vigência</dt>
                    <dd className="font-medium text-gray-800">{ticket.vigencia}</dd>
                  </div>
                )}
                {ticket.cd && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">CD</dt>
                    <dd className="font-medium text-gray-800">{ticket.cd}</dd>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Regional</dt>
                  <dd className="font-medium text-gray-800">{ticket.regional}</dd>
                </div>
                {ticket.motivo && (
                  <div className="text-sm">
                    <dt className="text-gray-500 mb-1">Motivo</dt>
                    <dd className="text-gray-800 bg-gray-50 rounded-lg p-2 text-xs leading-relaxed">{ticket.motivo}</dd>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-100 flex justify-between text-sm">
                  <dt className="text-gray-500">Solicitante</dt>
                  <dd className="font-medium text-gray-800">{ticket.solicitante}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Atribuído</dt>
                  <dd className="font-medium text-gray-800">{ticket.atribuido}</dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                <Paperclip size={12} /> Anexos (1)
              </h3>
              <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-lg text-sm text-blue-600 hover:bg-gray-100 cursor-pointer">
                📄 pedido-xyz.pdf
              </div>
            </div>

            {ticket.prePlanoId && (
              <div className="border-t border-gray-100 pt-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Aprovação</h3>
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm">
                  <div className="text-gray-700">Aguardando: <span className="font-medium">Ger. NE</span></div>
                  <div className="text-orange-600 font-medium mt-0.5">⏱ {ticket.slaRemaining} restantes</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Timeline + Comments */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">💬 Comentários & Histórico</h3>
            {timeline.map((entry, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-16 flex-shrink-0 text-xs text-gray-400 pt-1 text-right">{entry.time}</div>
                <div className={`flex-1 ${entry.type === 'event' ? '' : ''}`}>
                  {entry.type === 'comment' ? (
                    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
                      <div className="text-xs font-semibold text-gray-600 mb-1">{entry.actor}</div>
                      <div className="text-sm text-gray-800">{entry.text}</div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 py-1">
                      <div className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
                      <span className="text-xs text-gray-500 italic">{entry.text}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Comment box */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <textarea
                placeholder="Adicionar comentário... (use @ para mencionar)"
                rows={2}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-1.5 text-sm font-medium self-end">
                <Send size={14} />
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
