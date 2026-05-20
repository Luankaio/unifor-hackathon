import type { TicketType } from '../types';

const typeConfig: Record<TicketType, { label: string; icon: string; className: string }> = {
  malha: { label: 'Malha', icon: '🗺️', className: 'bg-indigo-100 text-indigo-700' },
  politica: { label: 'Política', icon: '📋', className: 'bg-teal-100 text-teal-700' },
  feriado: { label: 'Feriado', icon: '📅', className: 'bg-pink-100 text-pink-700' },
  capacidade: { label: 'Capac.', icon: '📦', className: 'bg-amber-100 text-amber-700' },
};

interface Props {
  type: TicketType;
  showIcon?: boolean;
}

export function TypeChip({ type, showIcon = true }: Props) {
  const config = typeConfig[type];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
}
