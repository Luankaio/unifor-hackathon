# Arquitetura do Sistema — V1

Plataforma de governança e visibilidade para tudo que **precede** o O9 DRP.
O sistema não toca o O9 — ele organiza, valida e prepara os dados que entrarão nele.

---

## 1. Personas e papéis

| Papel | Quem é | O que faz no sistema |
|---|---|---|
| **Solicitante** | Planejadores S&OE, time SNP, Operações Logísticas | Abre tickets de alteração e acompanha status |
| **Parametrizador** | William + 1 analista (SNO) | Executa as alterações, monta pré-planos, gera arquivo para o O9 |
| **Aprovador** | Gerentes e coordenadores regionais | Aprova alterações críticas que impactam suas regionais |
| **Gestor** | Liderança de planejamento | Visão consolidada, analytics, configurações |

> **No protótipo**, um switcher no header permite alternar entre papéis para demonstrar todas as perspectivas durante o pitch.

---

## 2. Estrutura de navegação principal

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]   Buscar global       [Switcher de papel] 🔔 [Perfil]   │
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                       │
│  🏠 Dashboard                                                    │
│  📋 Solicitações                                                 │
│  📦 Planos                                                       │
│  🗺️  Malhas                                                      │
│  ✅ Aprovações                                                   │
│  📊 Analytics                                                    │
│                                                                  │
│  ⚙️  Configurações (gestor)                                      │
└──────────┴──────────────────────────────────────────────────────┘
```

---

## 3. Detalhamento de cada aba

### 🏠 Dashboard

**Função:** entrada do sistema, mostra o que precisa de atenção imediata do usuário.

**Comportamento:** o conteúdo muda conforme o papel selecionado.

| Para Parametrizador | Para Solicitante | Para Aprovador | Para Gestor |
|---|---|---|---|
| Tickets atribuídos a mim | Minhas solicitações ativas | Aprovações pendentes (destaque) | Volume do dia/semana |
| SLA em risco | Aguardando minha resposta | Tempo restante por aprovação | SLA compliance geral |
| Pré-planos em montagem | Notificações recentes | Histórico recente | Distribuição de carga |
| Atividade recente | — | — | Alertas críticos |

**Quick actions sempre visíveis:** "+ Nova Solicitação" e busca global.

**Cutoff banner:** uma barra no topo mostrando o tempo restante até o cutoff do dia (meio-dia). Vermelho quando está perto.

---

### 📋 Solicitações

**Função:** sistema de tickets — onde toda solicitação de alteração nasce e é rastreada.

**Subabas:**
- **Minhas Solicitações** (as que eu abri)
- **Atribuídas a Mim** (visível para parametrizadores)
- **Todas** (visível para gestor)

**Visão de lista:**
| Campo | Descrição |
|---|---|
| ID | Identificador único (ex: TICK-1024) |
| Tipo | Chip colorido: Malha / Política / Feriado / Capacidade |
| Resumo | Título curto da solicitação |
| Solicitante | Quem abriu |
| Atribuído | Parametrizador responsável |
| Status | Aberto / Em Análise / Aguardando Aprovação / Aprovado / Em Pré-plano / Enviado ao O9 / Rejeitado |
| Regional afetada | Tag por regional |
| SLA | Indicador visual (verde / amarelo / vermelho) |
| Prioridade | Normal / Alta / Crítica |

**Filtros:** tipo, status, SLA, regional, solicitante, parametrizador, período.

**Página de detalhe do ticket:**
- Cabeçalho com ID, status, tipo e prioridade
- Campos preenchidos (variam por tipo)
- **Timeline** completa: quem abriu, quando, mudanças de status, atribuições, comentários
- **Thread de comentários** dentro do ticket (substitui o Teams)
- **Aprovações vinculadas** (quando aplicável) com status e responsáveis
- **Pré-plano vinculado** (link, se já estiver em um)
- **Anexos**

**Modal de nova solicitação:**
1. Escolha do tipo (Malha / Política / Feriado / Capacidade)
2. Formulário estruturado correspondente:

| Tipo | Campos |
|---|---|
| **Malha** | origem, destino, SKU(s), modal, lead time, vigência, regional afetada, motivo |
| **Política** | CD, SKU, política atual, política nova, motivo |
| **Feriado** | CD, data, tipo (feriado/inventário/manutenção), impacto esperado |
| **Capacidade** | CD, capacidade atual, capacidade nova, período de vigência, motivo |

3. Prioridade (com sugestão automática baseada em palavras-chave e horário)
4. Anexos opcionais
5. Submeter → sistema atribui automaticamente a um parametrizador disponível

---

### 📦 Planos (Kanban)

**Função:** coração da operação. Aqui os tickets aprovados são agrupados em pré-planos e percorrem o fluxo até serem enviados ao O9.

**Subabas:**
- **Board** (visão Kanban — principal)
- **Lista** (visão tabela — para gestor)
- **Arquivo** (planos já enviados ao O9, somente leitura)

**Colunas do Kanban:**

```
┌──────────┬───────────────┬────────────┬──────────────────────┬──────────┬─────────────────┐
│ Backlog  │ Em Montagem   │ Em Revisão │ Aguardando Aprovação │ Aprovado │ Enviado ao O9   │
└──────────┴───────────────┴────────────┴──────────────────────┴──────────┴─────────────────┘
```

1. **Backlog:** tickets aprovados aguardando serem agrupados em um pré-plano
2. **Em Montagem:** parametrizador está construindo o pré-plano (selecionando quais tickets entram)
3. **Em Revisão:** validação interna (parametrizador da dupla revisa o do colega)
4. **Aguardando Aprovação:** roteado automaticamente para gerentes regionais quando há impacto cross-regional
5. **Aprovado:** pronto para gerar o arquivo
6. **Enviado ao O9:** parametrizador subiu no SharePoint e marcou como enviado

**Card do pré-plano:**
- ID (ex: PP-2026-05-19-001)
- Quantidade de tickets dentro
- Chips dos tipos (Malha x3, Feriado x1)
- Regionais afetadas (tags)
- Responsável (parametrizador)
- Deadline em relação ao cutoff
- Indicador visual: 🟢 normal / 🟡 atenção / 🔴 urgente

**Página de detalhe do pré-plano:**
- Cabeçalho com ID, status, datas-chave
- **Lista de tickets incluídos** (com link para cada)
- **Análise de impacto auto-gerada:** quantos SKUs, CDs e rotas são afetadas
- **Regionais afetadas e seus aprovadores** (detectado automaticamente)
- **Status de cada aprovação** (pendente / aprovada / rejeitada)
- **Botão "Gerar arquivo O9"** — exporta CSV no formato pipe-separated, 18 chars por célula
- **Botão "Marcar como enviado"** — quando o parametrizador sobe no SharePoint
- **Comentários** e **histórico**

---

### 🗺️ Malhas

**Função:** hub do tipo de dado mais frequente. Malhas têm ciclo de vida próprio (plano mensal SNP, alterações ad-hoc, novos pedidos), então merecem espaço dedicado.

**Subabas:**
- **Malhas Ativas**
- **Importações SNP**
- **Solicitações de Malha**

#### Subaba: Malhas Ativas
- Tabela com todas as malhas ativas:
  | Origem | Destino | SKU(s) | Modal | Lead Time | Capacidade | Regional | Vigência | Status |
- Filtros: regional, CD, fábrica, modal, SKU
- Busca livre
- **Visualização opcional em mapa** — rede logística como grafo (origem → destino), com volume e modal. Diferencial visual forte para o pitch.
- Cada linha tem botão "Solicitar alteração" (abre o form pré-preenchido)
- Botão geral "Solicitar nova malha"
- Cada malha tem uma **linha do tempo** acessível: quando foi criada, todas as alterações já feitas, quem solicitou, quem aprovou

#### Subaba: Importações SNP
- **Upload de Excel do plano mensal SNP**
- Lista de importações anteriores (data, quem subiu, status)
- Quando um Excel é submetido, o sistema:
  1. Parseia o arquivo
  2. Compara com a base atual
  3. Mostra um **diff visual**: novas malhas (verde), alteradas (amarelo), removidas (vermelho)
  4. Identifica **conflitos** (ex: malha que tem ticket em aberto)
  5. Permite revisão antes de aplicar
  6. Ao confirmar, gera tickets automáticos para cada mudança (ou aplica direto, conforme regra)

**Este é um dos diferenciais mais fortes:** ataca diretamente a dor de "recebo planilha por email/Teams e tenho que comparar manualmente".

#### Subaba: Solicitações de Malha
- Atalho filtrado da aba Solicitações (só tipo = Malha)
- Permite criar nova solicitação daqui também

---

### ✅ Aprovações

**Função:** espaço dedicado para gerentes e coordenadores regionais decidirem rapidamente.

**Subabas:**
- **Pendentes** (precisam da minha decisão)
- **Histórico** (já decidi)

**Fila de pendentes:**
- Cada item mostra:
  - O que está mudando (resumo claro, sem precisar abrir)
  - Regionais afetadas
  - Quem solicitou
  - Quando entrou na fila
  - SLA restante (visual)
  - Botões rápidos: ✅ Aprovar / ❌ Rejeitar / 💬 Pedir mais informação

**Detalhe da aprovação:**
- Detalhes completos do ticket ou pré-plano
- **Análise de impacto** automática (SKUs, CDs, rotas afetadas)
- **Decisões anteriores em casos similares** (insight histórico)
- Comentário **obrigatório** se rejeitar; opcional se aprovar
- Histórico de quem viu e quanto tempo demorou

---

### 📊 Analytics

**Função:** território da cientista de dados — KPIs operacionais e insights.

**Subabas (dashboards):**
- **Visão Geral**
- **SLA & Performance**
- **Volume & Tendências**
- **Carga da Equipe**
- **Insights de IA** *(diferencial — ver seção 5)*

#### Visão Geral
- Total de solicitações no período
- % SLA cumprido
- Tempo médio de resolução
- Total enviado ao O9 hoje

#### SLA & Performance
- Compliance por tipo de dado
- Tempo médio por etapa do fluxo
- Identificação automática de gargalos (qual etapa atrasa mais?)
- Heatmap de horários críticos

#### Volume & Tendências
- Volume de solicitações por dia/semana/mês
- Top tipos de mudança
- Quem mais solicita
- Sazonalidade (picos pré-fechamento, pós-feriado, etc.)

#### Carga da Equipe
- Distribuição de tickets entre parametrizadores
- Tempo médio de resolução por pessoa
- Alertas de sobrecarga

---

### ⚙️ Configurações *(somente gestor)*

- **Usuários e papéis** — quem é parametrizador, aprovador, etc.
- **Regiões e aprovadores** — mapa de qual gerente aprova qual regional
- **Regras de SLA** — tempo esperado por tipo de solicitação
- **Critérios de criticidade** — o que dispara fluxo de aprovação (impacto cross-regional, mudança > X CDs, etc.)
- **Campos por tipo de dado** — admin pode ajustar quais campos são obrigatórios

---

## 4. Componentes transversais

### Header

| Elemento | Função |
|---|---|
| Logo | Marca |
| Busca global | Achar ticket/plano/malha por ID, palavra-chave |
| Switcher de papel | (Apenas no protótipo) Alternar papel para a demo |
| Sino de notificações | Badge com não lidas, popover com últimas |
| Perfil | Sair, ajustes pessoais |

### Notificações in-system

Disparadas quando:
- Sua solicitação muda de status
- Você é atribuído a um ticket
- Você tem uma aprovação pendente
- Alguém comenta em algo que você participa
- Um pré-plano que envolve você é enviado ao O9
- SLA do seu ticket está em risco

Cada notificação leva direto para o item relevante.

---

## 5. Fluxo end-to-end (caso típico)

Cenário: planejador S&OE percebe que precisa de uma malha que não existe.

```
1. Planejador abre nova solicitação em "Solicitações"
   ↓
2. Preenche form de Malha (origem CE, destino PE, SKU X...)
   ↓
3. Sistema:
   - Atribui automaticamente ao parametrizador com menor carga
   - Identifica a regional afetada (NE)
   - Notifica o parametrizador
   ↓
4. Parametrizador abre o ticket → analisa → identifica impacto cross-regional
   → Move para "Aguardando Aprovação"
   ↓
5. Sistema roteia automaticamente para o gerente regional NE
   → Notifica o gerente
   ↓
6. Gerente abre "Aprovações" → vê análise de impacto → aprova
   ↓
7. Ticket vai para o Backlog em "Planos"
   ↓
8. Parametrizador agrupa esse ticket com outros aprovados em um pré-plano
   → Move para "Em Montagem"
   ↓
9. Pré-plano passa por Revisão → Aprovação final (se cross-regional)
   → "Aprovado"
   ↓
10. Parametrizador clica "Gerar arquivo O9"
    → Sistema produz CSV pipe-separated formatado
    ↓
11. Parametrizador sobe o arquivo no SharePoint
    → Marca pré-plano como "Enviado ao O9"
    ↓
12. Todos os solicitantes envolvidos recebem notificação de conclusão
    ↓
13. Tudo fica registrado: quem pediu, quem aprovou, quem executou, quando
```

---

## 6. Diferenciais e inovação

Esses são os pontos onde a solução se destaca do básico. Alguns entram no MVP, outros viram destaque do pitch ou roadmap.

### Diferenciais no MVP

1. **Roteamento inteligente de aprovação** — o sistema detecta automaticamente as regionais afetadas e roteia para os aprovadores corretos. Hoje é manual, demorado e gera erros.

2. **Importação SNP com diff visual** — em vez de receber planilha por email, o SNP sobe direto na plataforma. Sistema mostra exatamente o que muda em relação à base atual e identifica conflitos. Mata uma dor real.

3. **Workload balancing automático** — sistema sugere o parametrizador ideal para cada novo ticket baseado em fila atual e expertise. Resolve o "30 solicitações pra um, 0 pra outro".

4. **Cutoff awareness em todas as visões** — banner global de tempo restante até o cutoff. Cards/tickets ficam visualmente "em risco" quando se aproximam do horário crítico.

5. **Geração automática do arquivo O9** — sistema gera o CSV exato (pipe, 18 chars por célula). Elimina erros de formatação manual.

6. **Análise de impacto automática** — em qualquer aprovação, o aprovador vê na hora quantos SKUs, CDs, rotas e regionais são afetados.

7. **Comentários estruturados (matando o Teams informal)** — toda comunicação sobre uma solicitação fica vinculada a ela. Acabou o "vou ver no Teams quem pediu o quê".

8. **Mapa visual das malhas** — visualização da rede logística como grafo. Forte impacto no pitch, e útil em produção para o S&OE ver dependências.

### Diferenciais de IA (carta na manga do pitch)

9. **Predição de breach de cutoff** — modelo treinado em volume e tempo histórico de resolução prevê se a fila atual chega no cutoff de meio-dia. Avisa o time antes do problema acontecer.

10. **Detecção de anomalias em solicitações** — flagra automaticamente:
    - Solicitação que contradiz aprovação recente
    - Duplicatas
    - Pedidos fora do padrão histórico daquela regional
    - Mudanças em dados que foram alterados há poucos dias

11. **Auto-sugestão de preenchimento** — ao abrir uma solicitação de malha, o sistema sugere campos baseado em malhas similares já existentes (mesma origem/destino, mesmo SKU).

12. **Classificação automática de criticidade** — modelo que lê o conteúdo da solicitação e classifica como crítica (precisa aprovação) ou simples. Aprende com o histórico de decisões.

### Diferenciais de roadmap (segunda fase)

13. **Integração via API com o O9** — quando ela existir, eliminar a etapa manual de subir no SharePoint.

14. **Bot no Teams** — abrir tickets sem sair do Teams, para quem resiste a usar uma nova ferramenta.

15. **Validação semântica de dados** — regras de negócio configuráveis (ex: "este SKU não pode ser produzido nesta fábrica") executadas antes do envio ao O9.

16. **Mobile app para aprovadores** — gerente regional aprova do celular.

---

## 7. Resumo: o que muda na vida de cada papel

| Papel | Antes | Depois |
|---|---|---|
| **Solicitante** | Manda mensagem no Teams, espera resposta, fica sem saber o status | Abre ticket estruturado, vê status em tempo real, recebe notificação quando muda |
| **Parametrizador** | Recebe 30 mensagens por dia em vários canais, perde o controle | Vê fila organizada, sabe prioridades, gera arquivo O9 com 1 clique |
| **Aprovador** | Recebe pedido por email/mensagem, decide sem contexto, ninguém registra | Vê fila clara com análise de impacto, aprova em 1 clique, fica registrado |
| **Gestor** | Sem visibilidade, descobre problemas quando estouram | Dashboard de SLA, gargalos, carga da equipe — age antes do problema |
