export type Role = 'solicitante' | 'parametrizador' | 'aprovador' | 'gestor';

export type TicketType = 'malha' | 'politica' | 'feriado' | 'capacidade';

export type TicketStatus =
  | 'aberto'
  | 'em_analise'
  | 'aguardando_aprovacao'
  | 'aprovado'
  | 'em_pre_plano'
  | 'enviado_o9'
  | 'rejeitado';

export type SLALevel = 'critico' | 'atencao' | 'normal' | 'neutro';

export type Priority = 'normal' | 'alta' | 'critica';

export interface Ticket {
  id: string;
  type: TicketType;
  summary: string;
  solicitante: string;
  atribuido: string;
  status: TicketStatus;
  regional: string;
  sla: SLALevel;
  slaRemaining: string;
  priority: Priority;
  createdAt: string;
  origem?: string;
  destino?: string;
  sku?: string;
  modal?: string;
  leadTime?: string;
  vigencia?: string;
  motivo?: string;
  cd?: string;
  data?: string;
  prePlanoId?: string;
}

export type PrePlanoStatus =
  | 'backlog'
  | 'em_montagem'
  | 'em_revisao'
  | 'aguardando_aprovacao'
  | 'aprovado'
  | 'enviado_o9';

export interface PrePlano {
  id: string;
  status: PrePlanoStatus;
  responsavel: string;
  tickets: string[];
  regionais: string[];
  ticketCount: number;
  skuCount: number;
  cdCount: number;
  sla: SLALevel;
  slaRemaining: string;
  createdAt: string;
  deadline: string;
  approvals: Approval[];
}

export interface Approval {
  regional: string;
  aprovador: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  approvedAt?: string;
}

export interface Malha {
  id: string;
  origem: string;
  destino: string;
  skus: string[];
  modal: string;
  leadTime: string;
  capacidade: string;
  regional: string;
  vigencia: string;
  status: 'ativa' | 'inativa';
}

export interface Importacao {
  id: string;
  arquivo: string;
  subidoPor: string;
  data: string;
  status: 'aguardando_revisao' | 'aplicado' | 'cancelado';
}

export interface Notification {
  id: string;
  type: 'aprovado' | 'comentario' | 'sla_risco' | 'atribuido' | 'rejeitado';
  message: string;
  detail: string;
  time: string;
  read: boolean;
  linkTo: string;
}
