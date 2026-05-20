import { useState } from 'react';
import { X, Lightbulb, Paperclip } from 'lucide-react';
import type { TicketType } from '../types';

interface Props {
  onClose: () => void;
}

const tipos: { id: TicketType; icon: string; label: string; desc: string }[] = [
  { id: 'malha', icon: '🗺️', label: 'Malha', desc: '(rota)' },
  { id: 'politica', icon: '📋', label: 'Política', desc: 'estoque' },
  { id: 'feriado', icon: '📅', label: 'Feriado', desc: 'do CD' },
  { id: 'capacidade', icon: '📦', label: 'Capac.', desc: 'do CD' },
];

export function NovasSolicitacaoModal({ onClose }: Props) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<TicketType | null>(null);
  const [formData, setFormData] = useState({
    origem: '', destino: '', sku: '', modal: '', leadTime: '', vigencia: '', motivo: '', prioridade: 'normal',
    cd: '', data: '', capacidadeAtual: '', capacidadeNova: '',
  });

  const handleNext = () => {
    if (selectedType) setStep(2);
  };

  const field = (label: string, key: keyof typeof formData, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={formData[key]}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const select = (label: string, key: keyof typeof formData, options: string[]) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={formData[key]}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">Selecione...</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            Nova Solicitação{selectedType && step === 2 ? ` — ${tipos.find((t) => t.id === selectedType)?.label}` : ''}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {step === 1 ? (
            <>
              <p className="text-sm text-gray-500">Passo 1 de 2: Tipo de alteração</p>
              <div className="grid grid-cols-4 gap-3 mt-2">
                {tipos.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selectedType === t.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-3xl">{t.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{t.label}</span>
                    <span className="text-xs text-gray-400">{t.desc}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500">Passo 2 de 2: Detalhes da alteração</p>

              {selectedType === 'malha' && (
                <>
                  {select('Origem', 'origem', ['CE - Fortaleza', 'PE - Recife', 'SP - São Paulo', 'BA - Salvador', 'GO - Goiânia'])}
                  {select('Destino', 'destino', ['PE - Recife', 'RN - Natal', 'BA - Salvador', 'MG - Belo Horizonte', 'TO - Palmas'])}
                  {field('SKU(s)', 'sku', 'text', '5567, 8821...')}
                  {select('Modal', 'modal', ['Rodoviário', 'Aéreo', 'Ferroviário'])}
                  <div className="flex gap-3">
                    <div className="flex-1">{field('Lead time (horas)', 'leadTime', 'number')}</div>
                    <div className="flex-1">{field('Vigência a partir de', 'vigencia', 'date')}</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 flex gap-2 text-sm text-blue-700">
                    <Lightbulb size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Esta malha não existe. Será solicitada nova criação.</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 flex gap-2 text-sm text-blue-700">
                    <Lightbulb size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Regional Nordeste será notificada para aprovação.</span>
                  </div>
                </>
              )}

              {selectedType === 'politica' && (
                <>
                  {select('CD', 'cd', ['CD-Recife', 'CD-Fortaleza', 'CD-Salvador', 'CD-São Paulo', 'CD-Goiânia'])}
                  {field('SKU(s)', 'sku', 'text', '8821...')}
                  {field('Política atual', 'capacidadeAtual', 'text', 'Ex: estoque mín. 500')}
                  {field('Política nova', 'capacidadeNova', 'text', 'Ex: estoque mín. 300')}
                </>
              )}

              {selectedType === 'feriado' && (
                <>
                  {select('CD', 'cd', ['CD-Recife', 'CD-Fortaleza', 'CD-Salvador', 'CD-São Paulo', 'CD-Goiânia'])}
                  {field('Data', 'data', 'date')}
                  {select('Tipo', 'modal', ['Feriado nacional', 'Feriado estadual', 'Inventário', 'Manutenção'])}
                </>
              )}

              {selectedType === 'capacidade' && (
                <>
                  {select('CD', 'cd', ['CD-Recife', 'CD-Fortaleza', 'CD-Salvador', 'CD-São Paulo', 'CD-Goiânia'])}
                  {field('Capacidade atual (t)', 'capacidadeAtual', 'number')}
                  {field('Capacidade nova (t)', 'capacidadeNova', 'number')}
                  {field('Vigência a partir de', 'vigencia', 'date')}
                </>
              )}

              {/* Motivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo / Contexto</label>
                <textarea
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  rows={3}
                  placeholder="Descreva o motivo da solicitação..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
                <div className="flex gap-4">
                  {(['normal', 'alta', 'critica'] as const).map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="prioridade"
                        value={p}
                        checked={formData.prioridade === p}
                        onChange={() => setFormData({ ...formData, prioridade: p })}
                        className="accent-blue-600"
                      />
                      <span className="text-sm capitalize text-gray-700">{p === 'critica' ? 'Crítica' : p.charAt(0).toUpperCase() + p.slice(1)}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-2 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2 flex gap-2 text-sm text-yellow-700">
                  <Lightbulb size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Detectamos cutoff próximo (1h30). Sugerimos "Crítica".</span>
                </div>
              </div>

              {/* Attachment */}
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                <Paperclip size={16} />
                Anexar arquivo
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
          {step === 2 && (
            <button onClick={() => setStep(1)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              ← Voltar
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
            Cancelar
          </button>
          {step === 1 ? (
            <button
              onClick={handleNext}
              disabled={!selectedType}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
            >
              Próximo →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium"
            >
              Enviar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
