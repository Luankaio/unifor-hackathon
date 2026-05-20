# Arquitetura V2 — Funcionalidades, Fluxos e Especificação por Tela

Documento de referência funcional. Descreve **o que o sistema faz**, **o que aparece em cada tela**, **quais filtros existem** e **como as telas se conectam**. Não define layout, cores ou componentes de UI.

---

## 1. Mapa de navegação

```
Sidebar (fixo, visível em todas as telas)
├── Dashboard
├── Solicitações
│   ├── Minhas Solicitações
│   ├── Atribuídas a Mim          ← visível apenas para Parametrizador
│   └── Todas                     ← visível apenas para Gestor
├── Planos
│   ├── Board (Kanban)
│   ├── Lista
│   └── Arquivo
├── Malhas
│   ├── Malhas Ativas
│   ├── Importações SNP
│   └── Solicitações de Malha
├── Aprovações
│   ├── Pendentes
│   └── Histórico
├── Analytics
│   ├── Visão Geral
│   ├── SLA & Performance
│   ├── Volume & Tendências
│   ├── Carga da Equipe
│   └── Insights de IA
├── Auditoria                      ← Novo na V2 (acesso: Parametrizador e Gestor)
└── Configurações                  ← acesso exclusivo do Gestor
    ├── Usuários e Papéis
    ├── Regiões e Aprovadores
    ├── Regras de SLA
    ├── Critérios de Criticidade
    └── Campos por Tipo de Dado
```

As sub-abas ficam dentro da própria tela (não na sidebar). A sidebar é flat — cada item leva à tela e as sub-abas aparecem no topo da área de conteúdo.

---

## 2. Papéis e acesso

| Tela | Solicitante | Parametrizador | Aprovador | Gestor |
|---|:---:|:---:|:---:|:---:|
| Dashboard | ✓ | ✓✓ | ✓ | ✓✓ |
| Solicitações | ✓✓ | ✓✓ | — | ✓ |
| Planos | — | ✓✓ | — | ✓ |
| Malhas | ✓ (consulta) | ✓✓ | — | ✓ |
| Aprovações | — | — | ✓✓ | ✓ |
| Analytics | — | ✓ | ✓ | ✓✓ |
| Auditoria | — | ✓ (seu histórico) | — | ✓✓ |
| Configurações | — | — | — | ✓✓ |

No protótipo, um switcher no header permite alternar entre papéis para demonstrar todas as perspectivas.

---

## 3. Componentes globais

### Header

Presente em todas as telas. Contém:
- **Logotipo** — clicar navega para o Dashboard
- **Busca global** — busca por ID de ticket (`TICK-1024`), ID de pré-plano (`PP-2026-05-19-001`), nome de SKU, origem/destino, nome de usuário. Retorna resultados agrupados por tipo (Tickets, Planos, Malhas)
- **Switcher de papel** — apenas no protótipo. Troca o papel ativo e recarrega a visão correspondente
- **Sino de notificações** — exibe contagem de não lidas. Ao clicar, abre popover com as últimas 10 notificações. Cada notificação é clicável e leva diretamente ao objeto relevante. Rodapé do popover tem link "Ver todas" que leva à página completa de histórico de notificações
- **Avatar/perfil** — acesso a dados pessoais e opção de sair

### Cutoff banner

Faixa global exibida entre o header e o conteúdo da página. Mostra o tempo restante até o cutoff de meio-dia (12:00). Some automaticamente após o cutoff do dia.

| Tempo restante | Estado |
|---|---|
| Mais de 4 horas | Normal (pouco destaque) |
| Entre 2 e 4 horas | Alerta moderado |
| Menos de 2 horas | Alerta crítico |

Ao clicar no banner, navega para a aba Planos → Board.

### Notificações — o que dispara

O sistema gera notificação quando:
- Uma solicitação do usuário muda de status
- O usuário é atribuído a um ticket
- Há uma aprovação pendente para o usuário
- Alguém comenta em um objeto em que o usuário participa
- Um pré-plano que inclui tickets do usuário é enviado ao O9
- O SLA de um ticket atribuído ao usuário está em risco
- Um ticket do usuário foi rejeitado

---

## 4. Dashboard

### Propósito

Tela de entrada. Mostra o que precisa de atenção imediata, variando conforme o papel ativo.

### O que aparece — por papel

**Parametrizador:**
- Total de tickets atribuídos a mim (com link para lista filtrada)
- Total de tickets com SLA em risco (vermelho, com link)
- Total de pré-planos que estou montando
- Total de aprovações vinculadas a pré-planos meus e ainda pendentes
- Minha fila: os 5 tickets atribuídos a mim com o SLA mais urgente. Cada item mostra ID, tipo, resumo, solicitante, e tempo de SLA restante. Link "Ver fila completa" no final
- Atividade recente: feed das últimas ações em objetos que me envolvem (ticket atribuído, pré-plano aprovado, comentário recebido). Cada item é clicável
- Alertas: avisos proativos — importações SNP aguardando revisão, tickets em risco de estouro, pré-plano parado há mais de X horas

**Solicitante:**
- Total de minhas solicitações ativas
- Total aguardando minha resposta (parametrizador pediu mais info)
- Total com SLA em risco
- Total enviadas ao O9 hoje
- Minhas solicitações recentes: últimas 5, com status e SLA
- Notificações recentes

**Aprovador:**
- Total de aprovações pendentes (destaque visual quando > 0)
- Tempo médio restante nas aprovações pendentes (urgência agregada)
- Últimas aprovações pendentes: lista compacta com SLA e botões rápidos de decisão
- Histórico das últimas decisões tomadas

**Gestor:**
- Volume de solicitações abertas hoje / esta semana
- % de SLA cumprido no período
- Total enviado ao O9 hoje
- Alertas críticos: tickets emperrados, pré-planos parados, overload de parametrizador
- Mini-gráfico de tendência do volume dos últimos 7 dias

### Quick actions (todos os papéis)

- Botão "+ Nova Solicitação" sempre visível no Dashboard
- Cutoff banner clicável levando ao Board

---

## 5. Solicitações

### Propósito

Sistema de tickets. Toda solicitação de alteração de dados nasce aqui e é rastreada do início ao fim.

### Sub-abas e visibilidade

| Sub-aba | Quem vê | O que mostra |
|---|---|---|
| Minhas Solicitações | Todos | Tickets que eu abri, independente do status |
| Atribuídas a Mim | Parametrizador | Tickets designados para mim executar |
| Todas | Gestor | Todos os tickets do sistema |

Cada sub-aba mantém seus próprios filtros aplicados de forma independente.

---

### 5.1 Lista de Tickets

**O que aparece em cada linha da lista:**

| Campo | Detalhe |
|---|---|
| ID | Ex: `TICK-1024`. Clicável — leva ao detalhe do ticket |
| Indicador de SLA | Marcador visual de urgência: crítico / alerta / normal / encerrado |
| Tipo | Chip que identifica: Malha / Política de Estoque / Feriado de CD / Capacidade de CD |
| Resumo | Título curto gerado automaticamente a partir dos campos principais (ex: "Nova malha CE → PE • SKU 5567") |
| Solicitante | Nome de quem abriu |
| Atribuído | Nome do parametrizador responsável (ou "Não atribuído") |
| Status | Estado atual: Aberto / Em Análise / Aguardando Aprovação / Aprovado / Em Pré-plano / Enviado ao O9 / Rejeitado |
| Regional afetada | Tag(s) da(s) regional(is) impactada(s) |
| Prioridade | Normal / Alta / Crítica |
| Criado em | Data de criação |

**Filtros disponíveis na lista:**

| Filtro | Opções |
|---|---|
| Tipo | Todos / Malha / Política / Feriado / Capacidade / Demand Sense |
| Status | Todos / Aberto / Em Análise / Aguardando Aprovação / Aprovado / Em Pré-plano / Enviado ao O9 / Rejeitado |
| SLA | Todos / Crítico (< 30 min) / Em risco (< 2h) / Normal / Encerrado |
| Regional | Todas / Nordeste / Sudeste / Sul / Centro-Oeste / Norte |
| Solicitante | Campo de busca por nome (autocomplete) |
| Parametrizador | Campo de busca por nome (autocomplete) |
| Prioridade | Todas / Normal / Alta / Crítica |
| Período de criação | Hoje / Últimos 7 dias / Últimos 30 dias / Período customizado |

Os filtros são combináveis. Filtros ativos aparecem como chips na barra, podendo ser removidos individualmente.

**Ordenação:** por padrão, ordem por urgência de SLA. Pode ser reordenado por qualquer coluna.

---

### 5.2 Criar nova solicitação

O processo de criação é um fluxo de 2 passos.

**Passo 1 — Escolha do tipo:**
O usuário escolhe entre Malha, Política de Estoque, Feriado de CD ou Capacidade de CD. Cada opção tem uma breve descrição do que ela representa.

**Passo 1 — Escolha do tipo:**
O usuário escolhe entre: Malha, Política de Estoque, Feriado de CD, Capacidade de CD ou Demand Sense.

**Passo 2 — Formulário por tipo:**

**Malha:**
| Campo | Tipo | Obrigatório |
|---|---|---|
| Origem | Seleção (fábrica/CD — autocomplete com busca) | Sim |
| Destino | Seleção (CD — autocomplete) | Sim |
| SKU(s) | Campo multi-valor com busca. Permite adicionar vários | Sim |
| Modal | Seleção: Rodoviário / Ferroviário / Aéreo / Marítimo | Sim |
| Lead time | Número em horas | Sim |
| Capacidade | Número em toneladas | Não |
| Vigência a partir de | Data | Sim |
| Vigência até | Data (ou "Indeterminado") | Não |
| Regional afetada | Detectada automaticamente com base na origem/destino. Pode ser ajustada manualmente | Auto |
| Motivo / contexto | Texto livre | Sim |

> Feedback automático no formulário: se a combinação origem+destino não existe na base, o sistema informa "Esta malha não existe — será solicitada nova criação". Se já existe, informa "Esta malha já existe — a solicitação criará uma alteração". Também avisa quais regionais serão notificadas para aprovação com base nos campos preenchidos.

**Política de Estoque:**
| Campo | Tipo |
|---|---|
| CD | Seleção (autocomplete) |
| SKU(s) | Campo multi-valor |
| Política atual | Texto ou seleção (se houver tipos predefinidos) |
| Política proposta | Texto ou seleção |
| Período de vigência | Data início / fim |
| Motivo | Texto livre |

**Feriado de CD:**
| Campo | Tipo |
|---|---|
| CD(s) afetado(s) | Campo multi-valor (seleção) |
| Data | Data única ou intervalo |
| Tipo | Feriado / Inventário / Manutenção programada |
| Impacto esperado na capacidade | Texto livre |
| Motivo | Texto livre |

**Capacidade de CD:**
| Campo | Tipo |
|---|---|
| CD | Seleção |
| Capacidade atual | Número (toneladas) |
| Capacidade proposta | Número (toneladas) |
| Período de vigência | Data início / fim |
| Motivo | Texto livre |

**Demand Sense:**
| Campo | Tipo |
|---|---|
| CD(s) afetado(s) | Campo multi-valor (seleção) |
| SKU(s) | Campo multi-valor |
| Semana de referência | Seleção de semana (picker de calendário) |
| Ajuste de demanda | Quantidade ou percentual de variação em relação à previsão atual |
| Motivo / contexto comercial | Texto livre |
| Responsável comercial | Nome / área |

> O Demand Sense é solicitado tipicamente pelo time comercial em colaboração com analistas de demanda, com frequência semanal. O formulário é mais simples que os outros tipos porque o dado de entrada é a variação da demanda, não uma mudança estrutural de rota ou política.

**Prioridade:** o usuário escolhe Normal / Alta / Crítica. O sistema sugere automaticamente com base em: horário em relação ao cutoff, palavras-chave no motivo (ex: "urgente", "cliente crítico"), e histórico de solicitações similares.

**Após enviar:** o sistema atribui o ticket automaticamente ao parametrizador com menor carga no momento. O solicitante recebe confirmação com o ID gerado e o nome do parametrizador atribuído.

---

### 5.3 Detalhe do Ticket

**Informações de cabeçalho (sempre visíveis):**
- ID do ticket
- Tipo
- Indicador de SLA com tempo restante
- Status atual
- Prioridade
- Pré-plano vinculado (link clicável, se o ticket já faz parte de um)

**Seção: Campos do ticket**
Todos os campos preenchidos na criação, conforme o tipo. Editáveis pelo parametrizador quando o status for "Em Análise". Não editáveis quando o ticket estiver em status mais avançado, salvo pelo gestor.

**Seção: Partes envolvidas**
- Solicitante (nome, área)
- Parametrizador atribuído (com opção de reatribuir, disponível para parametrizador e gestor)

**Seção: Aprovação vinculada (quando aplicável)**
- Status da aprovação: aguardando / aprovado / rejeitado
- Nome do aprovador responsável
- SLA restante para a aprovação
- Comentário do aprovador (quando houver decisão)

**Seção: Anexos**
- Lista de arquivos enviados (nome, tipo, tamanho, quem subiu, quando)
- Opção de adicionar novos anexos

**Seção: Timeline (histórico completo)**
A timeline registra cronologicamente, do mais recente para o mais antigo:
- Criação do ticket (quem, quando)
- Atribuição ao parametrizador (quem atribuiu, para quem)
- Cada mudança de status (de qual status para qual, quem alterou, quando)
- Cada comentário (texto, autor, timestamp)
- Reatribuições
- Adição/remoção de anexos
- Vínculo com pré-plano
- Decisões de aprovação

> Os comentários aparecem intercalados com os eventos do sistema na mesma timeline, distinguíveis visualmente. Comentários suportam menção de usuário com `@nome`.

**Ações disponíveis no ticket (conforme papel e status):**
- Mudar status (Parametrizador)
- Reatribuir (Parametrizador, Gestor)
- Vincular a pré-plano (Parametrizador)
- Adicionar comentário (todos os envolvidos)
- Solicitar mais informação → cria notificação para o solicitante
- Rejeitar com comentário obrigatório (Parametrizador, Gestor)
- Duplicar (para criar solicitação similar)
- Cancelar (Solicitante se ainda "Aberto"; Gestor em qualquer status)

**Dependência de entrada:** criado via formulário em Solicitações, ou via botão "Solicitar alteração" na tela de Malhas Ativas, ou via "Gerar tickets" na tela de diff de Importações SNP.

**Dependência de saída:** quando aprovado, o ticket vai para o Backlog do Board em Planos.

---

## 6. Planos — Board (o "Jira" da operação)

### Propósito

Espaço central de operação dos parametrizadores. **Planos** são unidades de parametrização a serem enviadas ao O9. Cada plano percorre um fluxo de colunas — ajuste → revisão → aprovação → envio. É a tela onde o trabalho acontece de fato.

### Modelo conceitual: o que é um plano e como nasce

O ciclo começa no **SNP** (planejamento de médio prazo), que entrega um **plano mensal base** — normalmente um Excel com as malhas do período.

Esse plano mensal passa por um processo chamado **facetamento** (ou "face"), que o divide em **planos menores** por ciclo de execução (ex: semanal, por corte de O9, por regional). Cada um desses planos menores vira um card no board — o chamado **plano prévio**.

O parametrizador trabalha sobre esse plano prévio: ajusta dados, incorpora alterações sinalizadas por tickets, valida com a operação, e o avança pelo board até enviar ao O9.

> **Tickets e planos são trilhas separadas.** Um ticket sinaliza uma necessidade de mudança. O parametrizador decide se e como incorporar essa mudança no plano que está trabalhando. O vínculo é informal (comentário, referência) — o ticket não "entra" dentro do plano como item estrutural.

---

### 6.1 Sub-aba: Board (Kanban)

O board tem 6 colunas. Todas ficam visíveis simultaneamente, sem scroll horizontal. Cada coluna tem scroll vertical próprio quando há muitos cards.

**Filtros do Board:**

| Filtro | Opções |
|---|---|
| Responsável | Todos / Parametrizador específico (seleção) |
| Regional | Todas / Nordeste / Sudeste / Sul / CO / Norte |
| Urgência | Todos / Crítico / Em atenção / Normal |
| Ciclo / período | Semana atual / Próxima semana / Customizado |
| Tipo de dado predominante | Todos / Malha / Política / Feriado / Capacidade / Demand Sense |

Os filtros se aplicam a todos os cards em todas as colunas simultaneamente.

---

#### Coluna 1: Planos Prévios

**O que é:** planos derivados do processo de facetamento do plano mensal SNP. Estão disponíveis como ponto de partida, ainda não foram ajustados pelo parametrizador para o ciclo corrente.

**Como os cards chegam aqui:**
- Quando uma importação SNP é processada e o sistema executa ou sugere o facetamento, os planos resultantes aparecem aqui
- Um parametrizador também pode criar um plano prévio manualmente (ex: para um ciclo extraordinário)

**O que aparece no card de plano prévio:**
- ID do plano (ex: `PLAN-2026-W21-NE-001`)
- Ciclo de execução (ex: "Semana 21 — Nordeste")
- Período de vigência dos dados (datas de / até)
- Tipo(s) de dado contido: chips (Malhas / Políticas / Feriados / Capacidades)
- Regionais afetadas (tags)
- Responsável sugerido (pode ser reatribuído)
- Indicador de urgência em relação ao cutoff

---

#### Coluna 2: Em Ajuste

**O que é:** planos que um parametrizador está trabalhando ativamente — revisando os dados, incorporando mudanças solicitadas via tickets, ajustando valores conforme a operação do dia.

**O que aparece no card:**
- Mesmo do plano prévio, acrescido de:
- Último ajuste: quando e por quem foi a última edição
- Tickets referenciados: quantidade de tickets abertos sinalizando mudanças para esse plano (ex: "3 tickets relacionados")
- Indicador de SLA do plano (tempo até o cutoff)

**Como chega aqui:** parametrizador arrasta da coluna "Planos Prévios" para "Em Ajuste" e assume a responsabilidade pelo plano.

---

#### Coluna 3: Em Revisão

**O que é:** planos concluídos pelo parametrizador e enviados para validação do par (o outro parametrizador da dupla).

**O que aparece no card:** o mesmo de "Em Ajuste", acrescido do nome do revisor designado e de quanto tempo está aguardando revisão.

---

#### Coluna 4: Aguardando Aprovação

**O que é:** planos que passaram pela revisão interna e precisam de aprovação de gerentes regionais antes de poderem gerar o arquivo O9.

**O que aparece no card:**
- Mesmo dos anteriores, acrescido de:
- Indicador de aprovações: quantas regionais já aprovaram sobre o total necessário (ex: "Aprov: 2/3")
- Nome(s) do(s) aprovador(es) ainda pendentes

**Como chega aqui:** o revisor detecta (ou o sistema detecta automaticamente) que o plano contém dados que impactam múltiplas regionais e avança para aprovação.

---

#### Coluna 5: Aprovado

**O que é:** planos com todas as aprovações necessárias. Prontos para gerar o arquivo O9.

**O que aparece no card:** o mesmo dos anteriores, sem indicador de aprovações pendentes.

**Como chega aqui:** automaticamente quando a última aprovação necessária é concedida na tela de Aprovações.

---

#### Coluna 6: Enviado ao O9

**O que é:** planos cujo arquivo CSV foi gerado e carregado no SharePoint.

**O que aparece no card:**
- ID do plano
- Ciclo / período
- Horário exato de envio (ex: "Enviado às 09:30")
- Nome de quem enviou

**Como chega aqui:** somente via botão "Marcar como Enviado" no detalhe do plano, após o upload no SharePoint. Não é possível arrastar para esta coluna.

---

#### Regras de drag & drop

**De Planos Prévios → Em Ajuste:**
- Qualquer parametrizador pode mover
- Ao arrastar, o sistema registra quem assumiu o plano e quando
- Se o plano já tem um responsável sugerido diferente de quem está arrastando, o sistema pede confirmação antes de reatribuir

**De Em Ajuste → Em Revisão:**
- Apenas o parametrizador responsável pelo plano pode mover
- Ao mover, o sistema notifica o revisor designado
- Se houver tickets relacionados ao plano ainda em aberto em Solicitações, o sistema exibe um aviso (não bloqueia, mas alerta)

**De Em Revisão → Em Ajuste (devolução):**
- Apenas o revisor pode devolver
- Comentário obrigatório explicando o motivo da devolução
- O parametrizador responsável recebe notificação com o comentário

**De Em Revisão → Aguardando Aprovação:**
- Apenas o revisor pode avançar
- O sistema verifica automaticamente quais regionais são afetadas pelos dados do plano
- Se houver impacto cross-regional: o plano vai para "Aguardando Aprovação" e o sistema notifica os aprovadores das regionais afetadas
- Se não houver impacto cross-regional: o revisor pode avançar direto para "Aprovado"

**De Aguardando Aprovação → Aprovado:**
- **Não é feito por drag.** Acontece automaticamente quando todas as aprovações necessárias são concedidas em Aprovações
- O parametrizador responsável recebe notificação

**De Aprovado → Enviado ao O9:**
- **Não é feito por drag.** Somente via botão "Marcar como Enviado" no detalhe do plano

**Restrições gerais:**
- Não é possível mover para coluna anterior após "Aguardando Aprovação"
- Não é possível arrastar cards de outros parametrizadores sem ser gestor
- Todo movimento gera evento de auditoria no histórico do plano

---

### 6.2 Sub-aba: Lista

Visão tabular de todos os planos, útil para o gestor acompanhar o status geral. Mostra os mesmos dados dos cards em formato de tabela com colunas ordenáveis. Aceita os mesmos filtros do board, mais filtro de status (coluna do board).

---

### 6.3 Sub-aba: Arquivo

Planos já enviados ao O9. Somente leitura. Filtros disponíveis: período de envio, ciclo, regional, responsável. Cada entrada mostra: ID, ciclo, data de envio, quem enviou, regionais afetadas. Clicar leva ao detalhe completo do plano (modo leitura).

---

### 6.4 Detalhe do Plano

**Seção: Cabeçalho**
- ID do plano
- Status atual (coluna do board)
- Ciclo de execução e período de vigência
- Responsável
- Data de criação / entrada no ciclo
- Deadline em relação ao cutoff

**Seção: Dados do plano**
Lista dos dados paramétricos contidos: malhas, políticas, feriados, capacidades, demand sense que fazem parte desse plano. Cada entrada mostra os campos relevantes ao tipo (ex: para malha: origem, destino, SKU, lead time, modal). O parametrizador pode editar esses dados quando o plano está em "Em Ajuste". Após isso, os dados ficam somente leitura.

**Seção: Faseamento**
Visível apenas quando o plano está em "Em Ajuste". Mostra o status do processo de faseamento (face) — a quebra do volume mensal em necessidades diárias por SKU e CD que o O9 precisa para processar. O faseamento é executado pelos parametrizadores via scripts Python externos; esta seção registra se o faseamento foi aplicado ao plano, quando e por quem, e permite que o parametrizador marque o faseamento como concluído antes de avançar para revisão.

**Seção: Tickets relacionados**
Lista de tickets em Solicitações que foram marcados como relacionados a este plano (vínculo manual, feito pelo parametrizador). Cada entrada mostra: ID do ticket, tipo, resumo, status atual. Clicar leva ao detalhe do ticket. Botão para vincular novos tickets ao plano (busca em Solicitações por ID ou palavras-chave). O vínculo é informativo — o ticket não entra na estrutura do plano.

**Seção: Análise de impacto (calculada automaticamente)**
- Total de dados paramétricos no plano (malhas, políticas, etc.)
- Total de SKUs afetados
- Total de CDs afetados
- Regionais afetadas com tags
- A análise se atualiza em tempo real quando dados são editados

**Seção: Status de aprovação**
Mostra cada regional afetada que requer aprovação, com:
- Nome da regional
- Nome do aprovador responsável
- Status: pendente / aprovado (com nome e horário) / rejeitado (com nome, horário e comentário)

**Seção: Histórico e comentários**
Timeline com todos os eventos do plano: criação, movimentos de coluna, edições de dado (campo + antes/depois), aprovações, comentários. Campo para adicionar comentário.

**Ações fixas no rodapé:**
- **Gerar arquivo O9** — habilitado apenas quando o status é "Aprovado". Gera o CSV no formato pipe-separated, 18 chars por célula. O sistema faz o download automático do arquivo
- **Marcar como Enviado ao O9** — habilitado após "Gerar arquivo O9" ter sido executado. O parametrizador confirma o upload no SharePoint. Move o plano para "Enviado ao O9". Tickets relacionados recebem atualização de status e os solicitantes são notificados
- **Comentar** — atalho para o campo de comentário na timeline

**Dependência de entrada:** planos chegam do processo de facetamento do plano mensal SNP (via Importações SNP em Malhas), ou são criados manualmente.

**Dependência de saída:** ao ser marcado como enviado, tickets relacionados vinculados ao plano recebem notificação de conclusão para seus solicitantes.

---

## 7. Malhas

### Propósito

Hub central dos dados de malha logística — o tipo de dado mais frequente e com ciclo de vida próprio. Permite consultar, solicitar alterações e importar planos mensais do SNP.

---

### 7.1 Sub-aba: Malhas Ativas

**O que é:** base de dados de todas as malhas ativas no momento.

**O que aparece em cada linha da tabela:**

| Campo | Detalhe |
|---|---|
| Origem | Fábrica ou CD de origem (nome + UF) |
| Destino | CD de destino (nome + UF) |
| SKU(s) | Lista dos SKUs que percorrem essa malha |
| Modal | Rodoviário / Ferroviário / Aéreo / Marítimo |
| Lead time | Em horas |
| Capacidade | Em toneladas |
| Regional | Regional responsável |
| Vigência | Data de início e fim (ou "Vigente") |
| Status | Ativa / Em alteração (ticket aberto) / Proposta (aguardando aprovação) |

**Filtros disponíveis:**

| Filtro | Opções |
|---|---|
| Regional | Todas / Nordeste / Sudeste / Sul / Centro-Oeste / Norte |
| CD de destino | Seleção por nome/UF (autocomplete) |
| Fábrica / CD de origem | Seleção por nome/UF (autocomplete) |
| Modal | Todos / Rodoviário / Ferroviário / Aéreo / Marítimo |
| SKU | Campo de busca por código ou nome |
| Status | Todas / Ativas / Em alteração / Propostas |
| Tem ticket aberto | Sim / Não |

**Busca livre:** por texto — pesquisa em todos os campos visíveis.

**Visualização alternativa em mapa:** um toggle permite alternar entre tabela e mapa. O mapa mostra a rede logística como grafo onde nós são fábricas/CDs e arestas são malhas. A espessura ou cor da aresta indica o modal ou o volume. Os filtros ativos na tabela se mantêm no mapa. Clicar em uma aresta (malha) abre painel lateral com os detalhes daquela malha e as ações disponíveis.

**Ações por malha:**
- **Ver linha do tempo:** modal ou página com o histórico completo daquela malha — quando foi criada, todas as alterações já aplicadas, quem solicitou cada uma, quem aprovou, quando entrou no O9. Cada entrada mostra: data, tipo de evento, usuário, valor anterior e novo (quando alteração de campo), link para o ticket relacionado
- **Solicitar alteração:** abre o formulário de nova solicitação já com tipo "Malha" e campos de origem/destino/SKU pré-preenchidos com os valores da malha selecionada
- **Solicitar exclusão:** cria uma solicitação do tipo Malha com campo "Ação: Exclusão". Passa pelo mesmo fluxo de aprovação

**Botão geral:** "+ Solicitar nova malha" — abre o formulário de nova solicitação com tipo "Malha" em branco.

**Dependência de entrada:** malhas são criadas quando tickets do tipo Malha são aprovados e processados, ou quando uma Importação SNP é aplicada.

**Dependência de saída:** ação "Solicitar alteração" cria ticket em Solicitações.

---

### 7.2 Sub-aba: Importações SNP

**O que é:** espaço para o SNP (planejamento de médio prazo) subir o plano mensal de malhas. O sistema compara com a base atual e apresenta um diff visual para revisão antes de qualquer mudança ser aplicada.

**Lista de importações anteriores:**

| Campo | Detalhe |
|---|---|
| Data e hora | De quando foi subida |
| Arquivo | Nome do arquivo Excel |
| Subido por | Usuário |
| Status | Aguardando revisão / Aplicado / Cancelado |
| Ações | Ver diff (todas) / Revisar (se aguardando) |

**Ação: subir nova planilha SNP**
O usuário faz upload de um arquivo Excel (.xlsx). O sistema:
1. Parseia o arquivo e extrai todas as malhas
2. Compara com a base atual de malhas ativas
3. Classifica cada diferença encontrada como: nova malha, malha alterada (campos mudaram), malha removida
4. Detecta conflitos: malhas do diff que têm ticket aberto em Solicitações

**Tela de revisão do diff:**

O sistema mostra um resumo com os contadores: novas (N), alteradas (N), removidas (N), conflitos (N).

A lista de diferenças é dividida em seções, nesta ordem de prioridade visual:
1. **Conflitos** — sempre expandidos por padrão. Para cada conflito, mostra: qual malha, qual ticket aberto está conflitando. O usuário decide por item: "Manter ticket existente" (ignora essa mudança do SNP) ou "Sobrescrever" (aplica a mudança do SNP e cancela o ticket)
2. **Novas malhas** — cada entrada mostra: origem, destino, SKU(s), modal, lead time, capacidade
3. **Malhas alteradas** — cada entrada mostra o que mudou: campo, valor anterior, valor novo
4. **Malhas removidas** — origem, destino, SKU(s) a serem removidos

**Filtro na tela de diff:** dropdown para mostrar apenas uma categoria (Todas / Novas / Alteradas / Removidas / Conflitos).

**Ações ao final da revisão:**
- **Aplicar mudanças** — aplica todas as alterações confirmadas diretamente na base de malhas, sem passar pelo fluxo de tickets. Registra em auditoria que a mudança veio de importação SNP com referência ao arquivo
- **Gerar tickets** — em vez de aplicar diretamente, cria um ticket de Malha para cada alteração, passando pelo fluxo normal (análise, aprovação, pré-plano). Ideal quando a governança exige rastreabilidade formal de cada mudança
- **Cancelar** — descarta a importação sem aplicar nada

**Dependência de saída:** "Aplicar mudanças" atualiza a base de Malhas Ativas diretamente. "Gerar tickets" cria tickets em Solicitações.

---

### 7.3 Sub-aba: Solicitações de Malha

Atalho filtrado de Solicitações, mostrando apenas tickets do tipo Malha. Aceita os mesmos filtros de Solicitações. Inclui botão "+ Nova solicitação de malha" que abre o formulário já com tipo "Malha" selecionado.

---

## 8. Aprovações

### Propósito

Espaço dedicado para gerentes e coordenadores regionais tomarem decisões sobre pré-planos e tickets que impactam suas regiões. Foco em velocidade: o aprovador deve conseguir decidir sem precisar abrir o detalhe.

---

### 8.1 Sub-aba: Pendentes

**O que aparece em cada card de aprovação:**
- Indicador de SLA (tempo restante para decisão)
- ID e tipo do objeto que aguarda aprovação (pré-plano ou ticket individual)
- Resumo executivo: o que está mudando, em linguagem clara
- Quantidade de tickets / SKUs / CDs afetados
- Regionais afetadas com tag
- Quem solicitou e há quanto tempo
- Status das outras aprovações (ex: "NE e SE já aprovaram, você é o último")

**Ações inline no card (sem precisar abrir o detalhe):**
- ✅ **Aprovar** — aprovação com comentário opcional
- ❌ **Rejeitar** — ao clicar, abre campo de comentário obrigatório antes de confirmar
- 💬 **Pedir mais informação** — cria comentário no ticket/pré-plano e notifica o solicitante. O item retorna para o aprovador quando o solicitante responder

**Ordenação:** por urgência de SLA (mais crítico no topo).

**Filtros:**
| Filtro | Opções |
|---|---|
| Tipo de objeto | Todos / Pré-plano / Ticket individual |
| Regional | Todas / por regional |
| Solicitado por | Campo de busca |
| SLA | Todos / Crítico / Em risco / Normal |

---

### 8.2 Sub-aba: Histórico

Todas as aprovações já decididas pelo usuário. Mostra: data da decisão, objeto, decisão tomada (aprovado/rejeitado), comentário, e o SLA no momento da decisão (para avaliar se foi dentro do prazo).

**Filtros do histórico:**
| Filtro | Opções |
|---|---|
| Decisão | Todas / Aprovadas / Rejeitadas |
| Período | Últimos 7 dias / 30 dias / Customizado |
| Regional | Por regional |
| Tipo de objeto | Todos / Pré-plano / Ticket |

---

### 8.3 Página de detalhe da aprovação

**Seção: Resumo executivo**
Texto curto e direto: o que está sendo solicitado, quando, por quem, e o impacto agregado.

**Seção: Análise de impacto**
- Quebra por tipo de dado: quantos tickets de cada tipo (Malha, Política, Feriado, Capacidade)
- Por regional: quantas alterações por regional, e quais outras regionais já aprovaram
- Insight histórico: se houver casos similares aprovados ou rejeitados no histórico, o sistema exibe um resumo ("3 alterações similares foram aprovadas nos últimos 30 dias")

**Seção: Tickets incluídos (expansível)**
Lista compacta dos tickets do pré-plano, com ID, tipo, resumo. Clicável para ver o ticket em detalhes sem perder a página de aprovação.

**Seção: Decisão (fixa, sempre visível no rodapé)**
Campo de comentário (opcional para aprovar, obrigatório para rejeitar) e os três botões de decisão: Rejeitar / Pedir mais info / Aprovar.

**O que acontece após a decisão:**
- Aprovação: o sistema verifica se todas as aprovações necessárias foram obtidas. Se sim, o pré-plano move automaticamente para "Aprovado" no Board e o parametrizador recebe notificação
- Rejeição: o pré-plano volta para "Em Revisão" no Board. O parametrizador recebe notificação com o comentário do aprovador. O ticket permanece no pré-plano mas com status "Rejeitado"
- Pedir mais info: o objeto permanece em "Aguardando Aprovação". O solicitante (ou parametrizador responsável) é notificado. Quando responde, o aprovador é notificado de volta

**Dependência de entrada:** itens chegam aqui automaticamente quando pré-planos cruzam para a coluna "Aguardando Aprovação" no Board, ou quando tickets individuais têm aprovação requerida.

**Dependência de saída:** aprovação completa move pré-plano para "Aprovado" no Board.

---

## 9. Analytics

### Propósito

Visibilidade operacional e estratégica. KPIs, gráficos e insights para parametrizadores acompanharem sua carga e para o gestor enxergar gargalos e tendências.

**Filtro global de período:** presente em todas as sub-abas. Opções: Hoje / Últimos 7 dias / Últimos 30 dias / Últimos 90 dias / Período customizado.

---

### 9.1 Sub-aba: Visão Geral

**O que aparece:**
- Total de solicitações no período
- % de SLA cumprido no período
- Tempo médio de resolução (da criação ao envio ao O9)
- Total de pré-planos enviados ao O9 no período
- Gráfico de volume de solicitações por dia/semana
- Distribuição de solicitações por tipo (Malha / Política / Feriado / Capacidade)
- Distribuição por regional
- Card de gargalos detectados: etapas onde os itens ficam mais tempo parados

---

### 9.2 Sub-aba: SLA & Performance

**O que aparece:**
- % de SLA cumprido por tipo de dado
- Tempo médio por etapa do fluxo: Aberto → Em Análise → Aprovação → Pré-plano → Enviado ao O9
- Identificação da etapa que mais atrasa (gargalo automático)
- Heatmap de horários críticos: em quais horários e dias da semana mais solicitações chegam ou mais SLAs estourarão
- Histórico de brechas de cutoff: quantas vezes a operação esteve em risco e por quê

---

### 9.3 Sub-aba: Volume & Tendências

**O que aparece:**
- Volume de solicitações por dia / semana / mês (configurável)
- Comparação com período anterior (delta %)
- Top solicitantes (quem mais abre tickets)
- Top tipos de mudança
- Sazonalidade: identificação de picos recorrentes (pré-fechamento de mês, pós-feriado, etc.)
- Volume de importações SNP e quantas malhas mudaram por importação

---

### 9.4 Sub-aba: Carga da Equipe

**O que aparece:**
- Distribuição atual de tickets em aberto entre os parametrizadores
- Tempo médio de resolução por parametrizador
- Quantidade de pré-planos concluídos por parametrizador no período
- Alertas de sobrecarga: parametrizador com carga >X% acima da média
- Evolução da carga ao longo do tempo (serie temporal por pessoa)

---

### 9.5 Sub-aba: Insights de IA

**O que aparece:**
- **Predição de breach de cutoff:** baseado no volume atual de solicitações em aberto e no histórico de tempo de resolução, o modelo estima a probabilidade de o cutoff ser atingido com itens pendentes. Mostra o cenário atual e o ponto de virada
- **Anomalias detectadas:** lista de situações suspeitas no período — duplicatas, solicitações que contradizem aprovações recentes, pedidos fora do padrão histórico de determinada regional, alterações em dados que foram modificados há poucos dias
- **Classificação automática de criticidade:** os tickets da semana com a classificação atribuída pelo modelo vs a classificação definida manualmente pelo usuário, para calibração
- Cada insight é acompanhado de link para o objeto relevante

---

## 10. Auditoria (novo na V2)

### Propósito

Trilha de auditoria completa de todas as ações realizadas no sistema. Garante rastreabilidade total: quem fez o quê, quando, em qual objeto, e o que mudou.

A auditoria existe em dois níveis:

### 10.1 Auditoria contextual (dentro de cada objeto)

Presente em: detalhe de ticket (como timeline), detalhe de pré-plano (como histórico), linha do tempo de uma malha. Cada um mostra apenas os eventos relativos àquele objeto específico.

**Eventos registrados por objeto:**

| Tipo de objeto | Eventos registrados |
|---|---|
| Ticket | Criação, atribuição (e reatribuição), mudança de status, edição de campo (campo + valor anterior + valor novo), comentário, anexo adicionado, vínculo com pré-plano, aprovação recebida, rejeição recebida |
| Pré-plano | Criação, ticket adicionado, ticket removido, movimento de coluna (de/para), comentário, arquivo O9 gerado, marcado como enviado, aprovação recebida por regional |
| Malha | Criação (com origem — ticket ou importação SNP), alteração de campo (antes/depois), remoção, qual ticket ou importação gerou cada evento |

**O que aparece em cada entrada da timeline:**
- Timestamp preciso (data + hora + minuto)
- Ícone que representa o tipo de evento
- Descrição em linguagem natural ("William moveu para 'Em Revisão'", "Ana Lima comentou: ...", "Campo Lead Time alterado de 24h para 20h")
- Link para o usuário que realizou a ação
- Quando aplicável: valores anterior e novo em destaque

---

### 10.2 Log global de auditoria (tela Auditoria)

Acessível pelo Gestor (visão completa) e pelo Parametrizador (visão dos seus próprios objetos).

**Filtros do log global:**

| Filtro | Opções |
|---|---|
| Período | Data de / Data até (seleção de intervalo) |
| Tipo de evento | Todos / Criação / Atualização de campo / Mudança de status / Comentário / Aprovação / Geração de arquivo / Envio ao O9 / Importação SNP |
| Tipo de objeto | Todos / Ticket / Pré-plano / Malha / Configuração |
| Usuário | Campo de busca por nome |
| Regional afetada | Por regional |
| Objeto específico | Busca por ID (TICK-XXXX, PP-XXXX, etc.) |

**O que aparece em cada entrada do log:**

| Campo | Detalhe |
|---|---|
| Timestamp | Data + hora + minuto |
| Tipo de evento | Ícone + rótulo |
| Objeto afetado | Tipo + ID, clicável — navega para o objeto |
| Usuário | Nome + avatar, clicável — filtra por usuário |
| Descrição | Texto em linguagem natural do que aconteceu |
| Campo alterado | Quando aplicável |
| Valor anterior | Quando aplicável |
| Valor novo | Quando aplicável |

**Exportação:** o gestor pode exportar o log filtrado em CSV para análise externa ou compliance.

**Casos de uso da auditoria:**
- Investigar por que um dado incorreto entrou no O9
- Verificar quem aprovou determinada mudança crítica
- Auditar a produtividade da equipe num período
- Comprovar a rastreabilidade do processo para conformidade interna

---

## 11. Configurações

Acessível apenas pelo Gestor. As sub-seções são acessadas como navegação interna dentro da própria tela de Configurações.

### Usuários e papéis
- Lista de todos os usuários cadastrados
- Para cada usuário: nome, e-mail, papel atual (Solicitante / Parametrizador / Aprovador / Gestor), ativo/inativo
- Ações: adicionar usuário, editar papel, desativar usuário

### Regiões e aprovadores
- Mapa de quais regionais existem
- Para cada regional: qual gerente/coordenador é o aprovador responsável
- Possibilidade de ter aprovador secundário (substituto quando o primário estiver ausente)

### Regras de SLA
- Tempo esperado por tipo de solicitação (Malha / Política / Feriado / Capacidade)
- Tempo esperado por etapa do fluxo (análise, aprovação)
- Limiares para mudança de estado do indicador visual (ex: vermelho quando < 30min)

### Critérios de criticidade e aprovação
- O que dispara o fluxo de aprovação regional:
  - Impacto cross-regional (detectado automaticamente)
  - Mudança que afeta mais de X CDs
  - Mudança em SKU marcado como crítico
  - Alteração de capacidade acima de X%
- O gestor pode ajustar esses critérios sem envolver desenvolvimento

### Campos por tipo de dado
- Quais campos são obrigatórios em cada tipo de solicitação
- Quais campos são opcionais
- O gestor pode adicionar campos customizados (texto livre, numérico, seleção)

---

## 12. Dependências entre telas

```
Formulário Nova Solicitação (Solicitações)
  └─→ cria Ticket em Solicitações

Botão "Solicitar alteração" em Malhas Ativas
  └─→ cria Ticket em Solicitações (com campos pré-preenchidos)

"Gerar tickets" na tela de Diff de Importações SNP
  └─→ cria Ticket(s) em Solicitações

Importação SNP processada + facetamento
  └─→ cria cards na coluna "Planos Prévios" do Board

Ticket aprovado em Solicitações
  └─→ fica disponível para o parametrizador vincular manualmente a um plano no Board
  └─→ NÃO entra automaticamente no Board (trilhas separadas)

Parametrizador vincula ticket a um plano (no detalhe do plano)
  └─→ ticket aparece na seção "Tickets relacionados" do plano
  └─→ é apenas uma referência informativa

Plano movido para "Aguardando Aprovação" no Board
  └─→ cria item(ns) em Aprovações (sub-aba Pendentes)

Aprovação concedida em Aprovações
  └─→ plano move para "Aprovado" no Board automaticamente

"Aplicar mudanças" em Importações SNP
  └─→ atualiza base de Malhas Ativas diretamente

"Marcar como Enviado" no detalhe do Plano
  └─→ tickets relacionados vinculados recebem notificação de conclusão para os solicitantes
  └─→ malhas afetadas recebem entrada na linha do tempo

Configurações → Regiões e Aprovadores
  └─→ define quem recebe itens em Aprovações

Configurações → Critérios de criticidade
  └─→ define quando o fluxo de aprovação é disparado no Board

Toda ação em qualquer tela
  └─→ gera entrada no Log de Auditoria
```

---

## 13. Fluxo end-to-end

### Fluxo A — Ciclo mensal: SNP → facetamento → O9

```
1. SNP entrega o plano mensal base (Excel de malhas)
   → William sobe o arquivo em Malhas → Importações SNP
   → sistema processa o diff (novas, alteradas, removidas, conflitos)
   → William revisa e aplica as mudanças na base de malhas

2. O processo de facetamento divide o plano mensal em planos semanais por regional
   → planos aparecem na coluna "Planos Prévios" do Board

3. William arrasta PLAN-2026-W21-NE para "Em Ajuste"
   → revisa os dados de malha, política, feriados do ciclo
   → incorpora ajustes da operação

4. William arrasta para "Em Revisão"
   → analista (revisor) é notificado

5. Analista revisa → detecta impacto em SE além do NE
   → arrasta para "Aguardando Aprovação"
   → sistema notifica gerente NE e gerente SE

6. Gerentes aprovam em Aprovações → Pendentes
   → plano move automaticamente para "Aprovado"

7. William abre o detalhe do plano
   → clica "Gerar arquivo O9" → CSV pipe-separated, 18 chars
   → faz upload no SharePoint
   → clica "Marcar como Enviado"
   → plano vai para "Enviado ao O9"

8. Tudo registrado na Auditoria:
   - Quem importou o SNP, quando
   - Quem ajustou quais dados, quais campos mudaram
   - Quem aprovou, quando, com qual comentário
   - Horário exato do envio ao O9
```

---

### Fluxo B — Alteração ad-hoc: ticket → ajuste no plano

```
1. Planejador S&OE abre "Nova Solicitação" em Solicitações
   → preenche formulário de Malha (origem, destino, SKU, modal, lead time, motivo)
   → sistema avisa: "Malha não existe. Regional NE será notificada."
   → prioridade sugerida: Crítica (cutoff em 2h)
   → ticket criado: TICK-1024 | status: Aberto | atribuído: William

2. William abre TICK-1024 em Solicitações → Atribuídas a Mim
   → analisa, adiciona comentário, identifica impacto cross-regional: NE + SE
   → muda status para Em Análise → depois para Aprovado internamente

3. William vai ao Board → abre o plano do ciclo corrente (Em Ajuste)
   → entra no detalhe do plano
   → adiciona a nova malha nos dados do plano
   → vincula TICK-1024 como ticket relacionado (referência informativa)
   → atualiza TICK-1024 em Solicitações com comentário: "Incorporado ao PLAN-2026-W21-NE"

4. O plano segue o fluxo normal:
   Em Ajuste → Em Revisão → Aguardando Aprovação → Aprovado → Enviado ao O9

5. Quando o plano é marcado como Enviado:
   → solicitante do TICK-1024 recebe notificação de que a mudança foi ao O9
   → TICK-1024 tem seu status atualizado para "Enviado ao O9"
```

---

## 14. Matriz de acesso por tela e papel

| Tela / Ação | Solicitante | Parametrizador | Aprovador | Gestor |
|---|---|---|---|---|
| Dashboard | Visão própria (minhas solicitações) | Visão operacional (fila, SLA) | Visão de aprovações pendentes | Visão consolidada + alertas |
| Solicitações — Minhas | ✓ ver e criar | ✓ ver as suas | — | ✓ ver todas |
| Solicitações — Atribuídas | — | ✓ principal | — | — |
| Solicitações — Todas | — | — | — | ✓ |
| Criar solicitação | ✓ | ✓ | — | ✓ |
| Editar ticket | — | ✓ (enquanto em análise) | — | ✓ (sempre) |
| Planos — Board | — | ✓✓ (mover, criar, gerenciar) | — | ✓ (ler) |
| Planos — Lista/Arquivo | — | ✓ | — | ✓ |
| Gerar arquivo O9 | — | ✓ | — | ✓ |
| Malhas Ativas | ✓ (consultar) | ✓✓ | — | ✓ |
| Solicitar alteração de malha | ✓ | ✓ | — | ✓ |
| Importações SNP | — | ✓✓ | — | ✓ |
| Aprovar / Rejeitar | — | — | ✓✓ | — |
| Analytics | — | ✓ (carga própria) | ✓ (suas decisões) | ✓✓ |
| Auditoria — Log global | — | ✓ (seus objetos) | — | ✓✓ (tudo) |
| Configurações | — | — | — | ✓✓ |
