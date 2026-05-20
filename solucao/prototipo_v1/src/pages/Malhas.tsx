import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Upload } from 'lucide-react';
import { mockMalhas, mockImportacoes } from '../data/mock';
import { SNPDiffModal } from './SNPDiffModal';

type Tab = 'ativas' | 'importacoes' | 'solicitacoes';
type ViewMode = 'tabela' | 'mapa';

export function Malhas() {
  const [tab, setTab] = useState<Tab>('ativas');
  const [view, setView] = useState<ViewMode>('tabela');
  const [showDiff, setShowDiff] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = mockMalhas.filter((m) =>
    !search ||
    m.origem.toLowerCase().includes(search.toLowerCase()) ||
    m.destino.toLowerCase().includes(search.toLowerCase()) ||
    m.skus.some((s) => s.includes(search))
  );

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Malhas</h1>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6">
          {([
            { id: 'ativas', label: 'Malhas Ativas' },
            { id: 'importacoes', label: 'Importações SNP*' },
            { id: 'solicitacoes', label: 'Solicitações de Malha' },
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

        {/* Controls */}
        {tab === 'ativas' && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView('tabela')}
                  className={`px-3 py-1.5 text-sm ${view === 'tabela' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Tabela
                </button>
                <button
                  onClick={() => setView('mapa')}
                  className={`px-3 py-1.5 text-sm border-l border-gray-200 ${view === 'mapa' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Mapa
                </button>
              </div>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none">
                <option>Regional ▼</option>
              </select>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none">
                <option>Modal ▼</option>
              </select>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              <Plus size={16} />
              Solicitar nova malha
            </button>
          </div>
        )}

        {tab === 'importacoes' && (
          <div className="flex items-center justify-end px-6 py-3 border-t border-gray-100">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              <Upload size={16} />
              Subir nova planilha SNP
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {tab === 'ativas' && view === 'tabela' && (
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Origem</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Destino</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">SKU(s)</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Modal</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Lead</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Cap.</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Regional</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500 w-16">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-800">{m.origem}</td>
                  <td className="px-4 py-3 text-gray-700">{m.destino}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">{m.skus.join(', ')}</td>
                  <td className="px-4 py-3 text-gray-600">{m.modal}</td>
                  <td className="px-4 py-3 text-gray-600">{m.leadTime}</td>
                  <td className="px-4 py-3 text-gray-600">{m.capacidade}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">{m.regional}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'ativas' && view === 'mapa' && (
        <div className="flex-1 bg-white p-6 flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            <svg viewBox="0 0 600 400" className="w-full border border-gray-100 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50">
              {/* Routes */}
              <line x1="120" y1="80" x2="280" y2="140" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="0" />
              <line x1="120" y1="80" x2="220" y2="60" stroke="#3b82f6" strokeWidth="2" />
              <line x1="280" y1="140" x2="300" y2="230" stroke="#3b82f6" strokeWidth="2" />
              <line x1="380" y1="100" x2="460" y2="200" stroke="#6366f1" strokeWidth="2.5" />
              <line x1="380" y1="100" x2="280" y2="140" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6,3" />
              <line x1="380" y1="100" x2="440" y2="310" stroke="#6366f1" strokeWidth="1.5" />
              <line x1="440" y1="310" x2="480" y2="280" stroke="#6366f1" strokeWidth="1.5" />

              {/* Nodes */}
              {[
                { x: 120, y: 80, label: 'CE', sub: 'Fortaleza' },
                { x: 280, y: 140, label: 'PE', sub: 'Recife' },
                { x: 220, y: 60, label: 'RN', sub: 'Natal' },
                { x: 300, y: 230, label: 'BA', sub: 'Salvador' },
                { x: 380, y: 100, label: 'SP', sub: 'São Paulo' },
                { x: 460, y: 200, label: 'PR', sub: 'Curitiba' },
                { x: 440, y: 310, label: 'GO', sub: 'Goiânia' },
                { x: 480, y: 280, label: 'TO', sub: 'Palmas' },
              ].map((node) => (
                <g key={node.label} className="cursor-pointer">
                  <circle cx={node.x} cy={node.y} r="20" fill="white" stroke="#3b82f6" strokeWidth="2.5" className="hover:fill-blue-50 transition-colors" />
                  <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="700" fill="#1e40af">{node.label}</text>
                  <text x={node.x} y={node.y + 30} textAnchor="middle" fontSize="9" fill="#6b7280">{node.sub}</text>
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(16, 360)">
                <line x1="0" y1="8" x2="24" y2="8" stroke="#3b82f6" strokeWidth="2.5" />
                <text x="28" y="12" fontSize="10" fill="#6b7280">Rodoviário</text>
                <line x1="90" y1="8" x2="114" y2="8" stroke="#6366f1" strokeWidth="2" strokeDasharray="6,3" />
                <text x="118" y="12" fontSize="10" fill="#6b7280">Intermodal</text>
              </g>
            </svg>
            <p className="text-center text-xs text-gray-400 mt-2">Click em um nó para ver detalhes da rota</p>
          </div>
        </div>
      )}

      {tab === 'importacoes' && (
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Data</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Arquivo</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Subido por</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {mockImportacoes.map((imp) => (
                <tr key={imp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-600">{imp.data}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">📊 {imp.arquivo}</td>
                  <td className="px-4 py-3 text-gray-600">{imp.subidoPor}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      imp.status === 'aguardando_revisao' ? 'bg-yellow-100 text-yellow-700' :
                      imp.status === 'aplicado' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {imp.status === 'aguardando_revisao' ? '⚠ Aguard. revisão' :
                       imp.status === 'aplicado' ? '✅ Aplicado' : '❌ Cancelado'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {imp.status === 'aguardando_revisao' ? (
                      <button
                        onClick={() => setShowDiff(true)}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 font-medium"
                      >
                        Revisar
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50">
                        Ver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'solicitacoes' && (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <div className="text-sm">Filtro de solicitações tipo Malha</div>
            <div className="text-xs mt-1">Mesmo conteúdo de <span className="text-blue-600">Solicitações</span> com filtro tipo=Malha</div>
          </div>
        </div>
      )}

      {showDiff && <SNPDiffModal onClose={() => setShowDiff(false)} />}
    </div>
  );
}
