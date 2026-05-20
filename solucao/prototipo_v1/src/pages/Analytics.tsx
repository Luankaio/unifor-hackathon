import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

type Tab = 'geral' | 'sla' | 'volume' | 'carga' | 'ia';

const dailyData = [
  { day: 'Seg', tickets: 18 },
  { day: 'Ter', tickets: 25 },
  { day: 'Qua', tickets: 32 },
  { day: 'Qui', tickets: 28 },
  { day: 'Sex', tickets: 42 },
  { day: 'Sáb', tickets: 12 },
  { day: 'Dom', tickets: 8 },
  { day: 'Seg', tickets: 35 },
  { day: 'Ter', tickets: 38 },
  { day: 'Qua', tickets: 45 },
  { day: 'Qui', tickets: 30 },
  { day: 'Sex', tickets: 48 },
];

const typeData = [
  { name: 'Malha', value: 62, color: '#6366f1' },
  { name: 'Capacidade', value: 18, color: '#f59e0b' },
  { name: 'Política', value: 12, color: '#14b8a6' },
  { name: 'Feriado', value: 8, color: '#ec4899' },
];

const regionalData = [
  { name: 'Nordeste', value: 45 },
  { name: 'Sudeste', value: 28 },
  { name: 'Centro-Oeste', value: 15 },
  { name: 'Sul', value: 12 },
];

const slaData = [
  { etapa: 'Criação', tempo: 5 },
  { etapa: 'Análise', tempo: 42 },
  { etapa: 'Aprovação', tempo: 28 },
  { etapa: 'Montagem', tempo: 18 },
  { etapa: 'Envio O9', tempo: 7 },
];

const teamData = [
  { name: 'William', tickets: 24, avgTime: '1h 45min' },
  { name: 'Analista A', tickets: 18, avgTime: '2h 10min' },
  { name: 'Analista B', tickets: 12, avgTime: '1h 30min' },
];

export function Analytics() {
  const [tab, setTab] = useState<Tab>('geral');
  const [period, setPeriod] = useState('30d');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'geral', label: 'Visão Geral' },
    { id: 'sla', label: 'SLA & Performance' },
    { id: 'volume', label: 'Volume' },
    { id: 'carga', label: 'Carga da Equipe' },
    { id: 'ia', label: '✨ IA Insights' },
  ];

  const kpis = [
    { label: 'Solicitações totais', value: '342', sub: '+12% vs. período anterior', color: 'text-blue-600' },
    { label: 'SLA cumprido', value: '94%', sub: 'Meta: 90%', color: 'text-green-600' },
    { label: 'Tempo médio resolução', value: '2h 15min', sub: '-8min vs. anterior', color: 'text-purple-600' },
    { label: 'Pré-planos enviados O9', value: '78', sub: 'Hoje: 7', color: 'text-indigo-600' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        </div>
        <div className="flex items-center gap-1 px-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
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

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Period selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Período:</span>
          {[
            { v: '7d', l: 'Últimos 7 dias' },
            { v: '30d', l: 'Últimos 30 dias' },
            { v: '90d', l: 'Últimos 90 dias' },
          ].map(({ v, l }) => (
            <button
              key={v}
              onClick={() => setPeriod(v)}
              className={`px-3 py-1.5 text-sm rounded-lg ${period === v ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {tab === 'geral' && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-sm text-gray-600 mt-0.5">{kpi.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* Charts grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Time series */}
              <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Solicitações por dia</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={dailyData}>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    />
                    <Bar dataKey="tickets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Type distribution */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Top tipos</h3>
                <div className="flex items-center justify-center mb-2">
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie data={typeData} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={55}>
                        {typeData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1.5">
                  {typeData.map((t) => (
                    <div key={t.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                      <span className="text-xs text-gray-600 flex-1">{t.name}</span>
                      <span className="text-xs font-medium text-gray-700">{t.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Regional distribution */}
              <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Distribuição por regional</h3>
                <div className="space-y-3">
                  {regionalData.map((r) => (
                    <div key={r.name}>
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span className="text-gray-700">{r.name}</span>
                        <span className="font-medium text-gray-600">{r.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${r.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottlenecks */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Gargalos detectados</h3>
                <div className="space-y-3">
                  <div className="flex gap-2 p-2.5 bg-yellow-50 rounded-xl">
                    <span className="text-lg">⚠️</span>
                    <div>
                      <div className="text-sm font-medium text-yellow-800">Aprovação CO</div>
                      <div className="text-xs text-yellow-600">Tempo médio 3h (+80% vs. NE)</div>
                    </div>
                  </div>
                  <div className="flex gap-2 p-2.5 bg-red-50 rounded-xl">
                    <span className="text-lg">🔴</span>
                    <div>
                      <div className="text-sm font-medium text-red-800">Volume seg às 9h</div>
                      <div className="text-xs text-red-600">+40% vs. média semanal</div>
                    </div>
                  </div>
                  <div className="flex gap-2 p-2.5 bg-blue-50 rounded-xl">
                    <span className="text-lg">💡</span>
                    <div>
                      <div className="text-sm font-medium text-blue-800">Pré-planejamento</div>
                      <div className="text-xs text-blue-600">Padrão detectado: alta demanda às 6ª</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'sla' && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Tempo médio por etapa do fluxo (min)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={slaData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis type="category" dataKey="etapa" tick={{ fontSize: 12, fill: '#6b7280' }} width={90} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="tempo" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Malha', compliance: '91%', avg: '2h 10min', color: 'text-green-600' },
                { label: 'Política', compliance: '97%', avg: '1h 45min', color: 'text-green-600' },
                { label: 'Capacidade', compliance: '88%', avg: '2h 30min', color: 'text-yellow-600' },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-sm font-medium text-gray-600">{item.label}</div>
                  <div className={`text-2xl font-bold mt-1 ${item.color}`}>{item.compliance}</div>
                  <div className="text-xs text-gray-400 mt-0.5">SLA compliance</div>
                  <div className="text-xs text-gray-500 mt-1">Tempo médio: {item.avg}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'volume' && (
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Volume de solicitações — últimos 30 dias</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dailyData}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="tickets" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === 'carga' && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm">Distribuição de carga — Parametrizadores</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Parametrizador</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Tickets ativos</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Tempo médio</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Carga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {teamData.map((member) => (
                  <tr key={member.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{member.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-700">{member.tickets}</span>
                        {member.tickets > 20 && <span className="text-xs text-orange-500 font-medium">⚠ Alta carga</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{member.avgTime}</td>
                    <td className="px-4 py-3 w-48">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${member.tickets > 20 ? 'bg-orange-500' : 'bg-blue-500'}`}
                          style={{ width: `${(member.tickets / 30) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'ia' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="text-base font-bold text-blue-900 mb-1">✨ IA Insights — Análise preditiva</h3>
              <p className="text-sm text-blue-700">Baseado no histórico dos últimos 90 dias</p>
            </div>

            {[
              {
                icon: '🔮',
                title: 'Predição de breach de cutoff',
                desc: 'Com base no volume atual e velocidade de processamento, há 73% de chance de 2-3 tickets não chegarem ao cutoff de hoje.',
                action: 'Ver tickets em risco',
                level: 'warning',
              },
              {
                icon: '🔄',
                title: 'Duplicatas detectadas',
                desc: 'TICK-1018 e TICK-1019 podem ser consolidados — mesma regional e janela de vigência. Economia estimada: 35min de trabalho.',
                action: 'Comparar tickets',
                level: 'info',
              },
              {
                icon: '📈',
                title: 'Padrão sazonal identificado',
                desc: 'Volume de solicitações às sextas é 42% maior que a média semanal nos últimos 3 meses. Recomendamos reforço de equipe.',
                action: 'Ver histórico',
                level: 'info',
              },
              {
                icon: '⚡',
                title: 'Anomalia detectada',
                desc: 'A regional Centro-Oeste apresenta tempo médio de aprovação 3x maior que as outras regionais. Possível gargalo no aprovador.',
                action: 'Investigar',
                level: 'error',
              },
            ].map((insight, i) => (
              <div
                key={i}
                className={`bg-white border rounded-xl p-4 ${
                  insight.level === 'warning' ? 'border-yellow-200' :
                  insight.level === 'error' ? 'border-red-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.desc}</p>
                  </div>
                  <button className="text-xs text-blue-600 hover:underline whitespace-nowrap font-medium flex-shrink-0">
                    {insight.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
