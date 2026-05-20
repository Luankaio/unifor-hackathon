import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { CutoffBanner } from '../components/CutoffBanner';
import { SLABadge } from '../components/SLABadge';
import { TypeChip } from '../components/TypeChip';
import { mockTickets } from '../data/mock';

const roleGreetings = {
  solicitante: { name: 'Ana Lima', kpis: [
    { label: 'Minhas solicitações ativas', value: '7', color: 'text-blue-600' },
    { label: 'Aguardando minha resposta', value: '2 🔴', color: 'text-red-600' },
    { label: 'Aprovadas este mês', value: '18', color: 'text-green-600' },
    { label: 'Enviadas ao O9', value: '14', color: 'text-purple-600' },
  ]},
  parametrizador: { name: 'William', kpis: [
    { label: 'Atribuídos a mim', value: '12', color: 'text-blue-600' },
    { label: 'SLA em risco', value: '3 🔴', color: 'text-red-600' },
    { label: 'Pré-planos em montagem', value: '2', color: 'text-yellow-600' },
    { label: 'Aprovações vinculadas', value: '8', color: 'text-green-600' },
  ]},
  aprovador: { name: 'J. Andrade', kpis: [
    { label: 'Aprovações pendentes', value: '3 🔴', color: 'text-red-600' },
    { label: 'Aprovadas hoje', value: '5', color: 'text-green-600' },
    { label: 'Tempo médio decisão', value: '18min', color: 'text-blue-600' },
    { label: 'Itens aguardando hoje', value: '8', color: 'text-purple-600' },
  ]},
  gestor: { name: 'Diretor', kpis: [
    { label: 'Volume do dia', value: '42', color: 'text-blue-600' },
    { label: 'SLA compliance', value: '94%', color: 'text-green-600' },
    { label: 'Alertas críticos', value: '4 🔴', color: 'text-red-600' },
    { label: 'Enviados ao O9 hoje', value: '7', color: 'text-purple-600' },
  ]},
};

const myQueue = mockTickets.filter((t) => t.atribuido === 'William' && t.status !== 'enviado_o9' && t.status !== 'rejeitado').slice(0, 5);

const recentActivity = [
  { text: 'PP-2026-05-19-001 aprovado', time: '10h' },
  { text: 'TICK-1024 atribuído a mim', time: '09h45' },
  { text: 'Comentário em TICK-1019', time: '09h20' },
  { text: 'TICK-1009 enviado ao O9', time: '08h50' },
];

const alerts = [
  { icon: '⚠️', text: 'Importação SNP de maio pendente revisão', color: 'text-yellow-700' },
  { icon: '🔴', text: '3 tickets em risco de estourar cutoff', color: 'text-red-700' },
];

export function Dashboard() {
  const { role } = useAppContext();
  const data = roleGreetings[role];

  return (
    <div className="flex flex-col min-h-full">
      <CutoffBanner minutesLeft={150} pendingCount={4} />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Olá, {data.name} 👋</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Visão: {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
          <Link
            to="/solicitacoes/nova"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Nova Solicitação
          </Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
              <div className="text-sm text-gray-500 mt-1">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* My Queue */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Minha fila (top 5 por prioridade)</h2>
            <Link to="/solicitacoes" className="text-sm text-blue-600 hover:underline">
              Ver fila completa
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {myQueue.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/solicitacoes/${ticket.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <SLABadge level={ticket.sla} />
                <span className="font-mono text-sm font-medium text-gray-700 w-24 flex-shrink-0">{ticket.id}</span>
                <TypeChip type={ticket.type} />
                <span className="text-sm text-gray-600 flex-1 truncate">{ticket.summary}</span>
                <span className="text-xs text-gray-400 flex-shrink-0">Solic: {ticket.solicitante}</span>
                <span className="text-xs font-medium text-gray-500 flex-shrink-0">SLA {ticket.slaRemaining}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent activity */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Atividade recente</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 flex-1">{item.text}</span>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Alertas</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <span className="text-lg flex-shrink-0">{alert.icon}</span>
                  <span className={`text-sm font-medium ${alert.color}`}>{alert.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
