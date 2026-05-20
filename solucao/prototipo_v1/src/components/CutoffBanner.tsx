import { AlertTriangle } from 'lucide-react';

interface Props {
  minutesLeft: number;
  pendingCount: number;
}

export function CutoffBanner({ minutesLeft, pendingCount }: Props) {
  const hours = Math.floor(minutesLeft / 60);
  const mins = minutesLeft % 60;
  const timeStr = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;

  const color =
    minutesLeft < 120
      ? 'bg-red-50 border-red-200 text-red-800'
      : minutesLeft < 240
      ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
      : 'bg-green-50 border-green-200 text-green-800';

  return (
    <div className={`flex items-center gap-2 px-4 py-2 border-b text-sm font-medium ${color}`}>
      <AlertTriangle size={16} />
      <span>
        CUTOFF EM {timeStr} • {pendingCount} pré-planos aguardando envio ao O9
      </span>
    </div>
  );
}
