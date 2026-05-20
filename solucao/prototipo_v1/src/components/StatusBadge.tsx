import type { TicketStatus, PrePlanoStatus } from '../types';

const statusConfig: Record<string, { label: string; className: string }> = {
  aberto: { label: 'Aberto', className: 'bg-blue-100 text-blue-700' },
  em_analise: { label: 'Em Análise', className: 'bg-yellow-100 text-yellow-700' },
  aguardando_aprovacao: { label: 'Aguard. Aprovação', className: 'bg-orange-100 text-orange-700' },
  aprovado: { label: 'Aprovado', className: 'bg-green-100 text-green-700' },
  em_pre_plano: { label: 'Em Pré-plano', className: 'bg-purple-100 text-purple-700' },
  enviado_o9: { label: 'Enviado O9', className: 'bg-gray-100 text-gray-600' },
  rejeitado: { label: 'Rejeitado', className: 'bg-red-100 text-red-700' },
  backlog: { label: 'Backlog', className: 'bg-gray-100 text-gray-600' },
  em_montagem: { label: 'Em Montagem', className: 'bg-blue-100 text-blue-700' },
  em_revisao: { label: 'Em Revisão', className: 'bg-yellow-100 text-yellow-700' },
};

interface Props {
  status: TicketStatus | PrePlanoStatus;
}

export function StatusBadge({ status }: Props) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
