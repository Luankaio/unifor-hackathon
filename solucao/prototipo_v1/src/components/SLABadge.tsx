import type { SLALevel } from '../types';

interface Props {
  level: SLALevel;
  label?: string;
  size?: 'sm' | 'md';
}

const colors: Record<SLALevel, string> = {
  critico: 'text-red-500',
  atencao: 'text-yellow-500',
  normal: 'text-green-500',
  neutro: 'text-gray-400',
};

const dots: Record<SLALevel, string> = {
  critico: '🔴',
  atencao: '🟡',
  normal: '🟢',
  neutro: '⚪',
};

export function SLABadge({ level, label, size = 'md' }: Props) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'} ${colors[level]}`}>
      <span>{dots[level]}</span>
      {label && <span>{label}</span>}
    </span>
  );
}
