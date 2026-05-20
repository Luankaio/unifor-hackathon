import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function SNPDiffModal({ onClose }: Props) {
  const [conflictsOpen, setConflictsOpen] = useState(true);
  const [newOpen, setNewOpen] = useState(true);
  const [changedOpen, setChangedOpen] = useState(true);
  const [removedOpen, setRemovedOpen] = useState(true);

  const summary = [
    { label: 'Novas', count: 12, color: 'bg-green-100 text-green-700', icon: '🟢' },
    { label: 'Alteradas', count: 8, color: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
    { label: 'Removidas', count: 3, color: 'bg-red-100 text-red-700', icon: '🔴' },
    { label: 'Conflitos', count: 2, color: 'bg-orange-100 text-orange-700', icon: '⚠' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Revisar Importação</h2>
            <p className="text-xs text-gray-500 mt-0.5">Plano-SNP-maio-v3.xlsx — Subido por William em 19/05 09:00</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-4 gap-3">
            {summary.map((s) => (
              <div key={s.label} className={`text-center py-3 rounded-xl ${s.color}`}>
                <div className="text-2xl font-bold">{s.count}</div>
                <div className="text-xs font-medium mt-0.5">{s.icon} {s.label}</div>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none">
              <option>Todas</option>
              <option>Novas</option>
              <option>Alteradas</option>
              <option>Removidas</option>
              <option>Conflitos</option>
            </select>
          </div>

          {/* Conflicts */}
          <div className="border border-orange-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setConflictsOpen(!conflictsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-orange-50 text-left"
            >
              <span className="font-semibold text-orange-800">⚠ Conflitos detectados (2)</span>
              {conflictsOpen ? <ChevronUp size={16} className="text-orange-600" /> : <ChevronDown size={16} className="text-orange-600" />}
            </button>
            {conflictsOpen && (
              <div className="p-3 space-y-2">
                {[
                  { route: 'CE → PE • SKU 5567', conflict: 'Existe ticket aberto (TICK-1024) modificando esta malha' },
                  { route: 'SP → BA • SKU 8821', conflict: 'Existe ticket aprovado (TICK-1012) para esta rota' },
                ].map((c, i) => (
                  <div key={i} className="bg-white border border-orange-100 rounded-xl p-3">
                    <div className="font-medium text-gray-800 text-sm">🔴 {c.route}</div>
                    <div className="text-xs text-gray-500 mt-1">{c.conflict}</div>
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        Manter ticket
                      </button>
                      <button className="px-3 py-1 text-xs bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                        Sobrescrever
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* New routes */}
          <div className="border border-green-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setNewOpen(!newOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-green-50 text-left"
            >
              <span className="font-semibold text-green-800">🟢 Novas malhas (12)</span>
              {newOpen ? <ChevronUp size={16} className="text-green-600" /> : <ChevronDown size={16} className="text-green-600" />}
            </button>
            {newOpen && (
              <div className="p-3 space-y-1">
                {[
                  '+ Curitiba → Florianópolis • SKU 4412 • Rodoviário • 8h',
                  '+ São Paulo → Ribeirão Preto • SKU 7723 • Rodoviário • 4h',
                  '+ Belo Horizonte → Vitória • SKU 3344 • Rodoviário • 10h',
                ].map((item, i) => (
                  <div key={i} className="text-sm text-green-800 bg-green-50 rounded-lg px-3 py-2">{item}</div>
                ))}
                <button className="text-xs text-green-600 hover:underline px-3">+ Mostrar todas (9 mais)</button>
              </div>
            )}
          </div>

          {/* Changed */}
          <div className="border border-yellow-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setChangedOpen(!changedOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-yellow-50 text-left"
            >
              <span className="font-semibold text-yellow-800">🟡 Alteradas (8)</span>
              {changedOpen ? <ChevronUp size={16} className="text-yellow-600" /> : <ChevronDown size={16} className="text-yellow-600" />}
            </button>
            {changedOpen && (
              <div className="p-3 space-y-2">
                <div className="bg-white border border-yellow-100 rounded-xl p-3 text-sm">
                  <div className="font-medium text-gray-800">✎ Fortaleza → Recife • SKU 8812</div>
                  <div className="mt-1 space-y-0.5 text-xs">
                    <div className="flex gap-2">
                      <span className="text-gray-400 w-24">Lead time:</span>
                      <span className="line-through text-red-400">24h</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-green-600 font-medium">20h</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-400 w-24">Capacidade:</span>
                      <span className="line-through text-red-400">100t</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-green-600 font-medium">120t</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Removed */}
          <div className="border border-red-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setRemovedOpen(!removedOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-red-50 text-left"
            >
              <span className="font-semibold text-red-800">🔴 Removidas (3)</span>
              {removedOpen ? <ChevronUp size={16} className="text-red-600" /> : <ChevronDown size={16} className="text-red-600" />}
            </button>
            {removedOpen && (
              <div className="p-3 space-y-1">
                {['- Salvador → Aracaju • SKU 3344', '- Recife → João Pessoa • SKU 5567'].map((item, i) => (
                  <div key={i} className="text-sm text-red-800 bg-red-50 rounded-lg px-3 py-2">{item}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
            Cancelar
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-800 font-medium"
            >
              Aplicar mudanças
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium"
            >
              Gerar tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
