# Telas e Componentes — V1

Wireframes em ASCII de cada tela do sistema, com descrição de cada componente e sua funcionalidade.
Documento de referência para design e desenvolvimento do protótipo.

Cada seção tem três blocos:
1. **Layout** — descrição em prosa de como os componentes estão dispostos na tela (qual coluna, qual largura, qual empilhamento)
2. **Wireframe** — representação ASCII para referência visual rápida
3. **Componentes** — tabela com cada elemento e sua funcionalidade

---

## 0. Layout base (todas as telas)

### Layout

Toda a aplicação usa o mesmo esqueleto:

- **Header fixo no topo** (altura ~56px): logo à esquerda, busca global ocupando ~40% da largura central, e os controles (switcher, notificações, avatar) à direita.
- **Sidebar fixa à esquerda** (largura ~240px expandida, ~64px colapsada): lista vertical dos 6 itens principais, com separador antes de "Configurações" no rodapé.
- **Área de conteúdo** ocupa todo o resto à direita da sidebar (~calc(100% - 240px)).
- **Cutoff banner** (quando ativo) fica entre o header e a área de conteúdo, ocupando 100% da largura.

### Comportamento da sidebar

**A sidebar é flat — não tem dropdowns.** Cada item leva direto à página principal da seção, e as subabas (Minhas/Atribuídas/Todas, Ativas/Importações/Solicitações, etc.) ficam **dentro da página**, no topo da área de conteúdo, como um conjunto de pills/tabs horizontais.

Razões dessa escolha:
- Mais simples de demonstrar no pitch
- Menos cliques em níveis aninhados
- Subnavegação contextual aparece no escopo da página que ela serve

**Exceção:** o item "Configurações" (só gestor) tem sub-itens muitos — Usuários, Regras de SLA, Regras de Aprovação, Tipos de Dado. Esses **podem** aparecer como dropdown expansível na sidebar (com chevron), ou como uma sub-navegação interna na página de Configurações. Recomendo a segunda opção para manter consistência.

### Wireframe

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [LOGO]    🔍 Buscar (ticket, plano, malha...)    [Switcher ▼] 🔔³ [👤 Avatar]  │ ← Header
├──────────┬──────────────────────────────────────────────────────────────────────┤
│          │                                                                       │
│ 🏠 Dashboard                                                                     │
│ 📋 Solicitações                                                                  │
│ 📦 Planos          │                                                             │
│ 🗺️  Malhas         │            ÁREA DE CONTEÚDO PRINCIPAL                       │
│ ✅ Aprovações      │                                                             │
│ 📊 Analytics       │                                                             │
│                    │                                                             │
│ ─────────────────  │                                                             │
│ ⚙️  Configurações  │                                                             │
│                                                                                  │
└──────────┴──────────────────────────────────────────────────────────────────────┘
       ↑                                       ↑
   Sidebar (collapsable)              Cutoff banner global aparece aqui:
                                      "⚠ Cutoff em 2h 30min — 4 pré-planos pendentes"
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Logo** | Identidade visual. Clicar leva para o Dashboard |
| **Busca global** | Busca por ID (TICK-1024, PP-2026-05-19-001), nome de SKU, origem/destino, regional. Retorna resultados agrupados por tipo |
| **Switcher de papel** | (Só protótipo) Dropdown que troca o papel ativo: Solicitante / Parametrizador / Aprovador / Gestor. Recarrega a tela com a visão correspondente |
| **Sino de notificações** | Badge com contagem de não lidas. Click abre popover com últimas 10 |
| **Avatar/perfil** | Menu: meus dados, sair |
| **Sidebar** | Navegação principal. Item ativo destacado. Collapsable para ganhar espaço |
| **Cutoff banner** | Barra global mostrando quanto tempo até meio-dia. Verde > 4h, amarelo 2-4h, vermelho < 2h. Some após o cutoff |

---

## 1. Dashboard (visão do Parametrizador como exemplo)

### Layout

Estrutura vertical empilhada, da seguinte forma (de cima para baixo):

1. **Cabeçalho da página** (linha única, full-width): saudação à esquerda, botão "+ Nova Solicitação" à direita.
2. **Cutoff banner** (linha única, full-width): barra horizontal de alerta.
3. **Grid de KPIs** (4 colunas iguais, full-width): cards retangulares lado a lado. Em telas menores que ~900px, viram 2x2.
4. **Bloco "Minha Fila"** (full-width): card único ocupando toda a largura, com lista vertical interna dos 5 tickets prioritários.
5. **Grid inferior de 2 colunas** (50/50): à esquerda "Atividade Recente", à direita "Alertas". Ambos são cards de altura similar.

Todo o conteúdo cabe em uma viewport de 1080p sem scroll vertical no estado inicial (5 tickets na fila + atividade + alertas).

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Olá, William 👋                                              [+ Nova Solic.] │
│ Visão: Parametrizador                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ ⚠ CUTOFF EM 2h 30min  •  4 pré-planos aguardando envio ao O9                │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   12         │  │   3 🔴       │  │   2          │  │   8          │    │
│  │ Atribuídos   │  │ SLA em risco │  │ Pré-planos   │  │ Aprovações   │    │
│  │ a mim        │  │              │  │ em montagem  │  │ vinculadas   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌─ Minha fila (top 5 por prioridade) ──────────────────────────────────┐  │
│  │ 🔴 TICK-1024 Malha CE→PE • SKU 5567 • Solic: M. Souza • SLA 30min   │  │
│  │ 🟡 TICK-1019 Política CD-Recife • Solic: A. Lima • SLA 1h30        │  │
│  │ 🟡 TICK-1018 Feriado CD-Fortaleza • Solic: J. Oliveira • SLA 2h    │  │
│  │ 🟢 TICK-1015 Capacidade CD-Salvador • Solic: P. Costa • SLA 4h     │  │
│  │ 🟢 TICK-1012 Malha SP→BA • SKU 8821 • Solic: L. Mendes • SLA 5h    │  │
│  │                                                  [Ver fila completa]│  │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─ Atividade recente ──────────────────┐ ┌─ Alertas ──────────────────┐  │
│  │ • PP-2026-05-19-001 aprovado (10h)   │ │ ⚠ Importação SNP de       │  │
│  │ • TICK-1024 atribuído a mim (09h45)  │ │   maio pendente revisão    │  │
│  │ • Comentário em TICK-1019 (09h20)    │ │ 🔴 3 tickets em risco     │  │
│  │ • TICK-1009 enviado ao O9 (08h50)    │ │   de estourar cutoff       │  │
│  └──────────────────────────────────────┘ └────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Header de boas-vindas** | Saudação personalizada + indicador do papel ativo |
| **Botão "+ Nova Solicitação"** | Atalho global, abre modal de criação |
| **Cutoff banner** | Sempre visível quando relevante. Click leva para Planos |
| **Cards de KPI (x4)** | Números que importam para o papel atual. Click leva à listagem filtrada |
| **Minha fila** | Top 5 tickets atribuídos a mim, ordenados por SLA. Indicador visual de urgência |
| **Atividade recente** | Feed cronológico das últimas ações nos meus itens |
| **Alertas** | Avisos proativos que precisam de ação (importações pendentes, riscos) |

**Variações por papel:**
- **Solicitante:** KPIs focam em "minhas solicitações ativas", "aguardando minha resposta"
- **Aprovador:** KPI de "aprovações pendentes" em destaque + lista de aprovações urgentes
- **Gestor:** KPIs agregados (SLA compliance, volume do dia, gargalos)

---

## 2. Solicitações — Lista

### Layout

Página de lista clássica com 4 zonas empilhadas verticalmente:

1. **Cabeçalho** (linha única, full-width): título "Solicitações" à esquerda, botão "+ Nova Solicitação" à direita.
2. **Barra de subabas** (linha única, full-width): pills horizontais [Minhas] [Atribuídas a mim*] [Todas]. Asterisco indica notificação/contagem.
3. **Barra de filtros + busca** (linha única, full-width): dropdowns de filtro à esquerda em sequência horizontal, busca à direita.
4. **Tabela de tickets** (full-width, ocupa todo o resto da tela): linhas horizontais com colunas de largura proporcional ao conteúdo.

Paginação fica fixa no rodapé da tabela. A tabela tem scroll vertical próprio se ultrapassar a viewport. Não há scroll horizontal — colunas se ajustam à largura disponível.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Solicitações                                                [+ Nova Solic.] │
├──────────────────────────────────────────────────────────────────────────────┤
│  [ Minhas ] [ Atribuídas a mim* ] [ Todas ]              * 12 ativas        │
├──────────────────────────────────────────────────────────────────────────────┤
│  Filtros: [Tipo ▼] [Status ▼] [SLA ▼] [Regional ▼] [Período ▼]   🔍 Buscar │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ID         Tipo      Resumo                  Solicitante  Atrib.  Status   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  🔴 TICK-1024 [Malha]   Nova rota CE→PE SKU... M. Souza    William  Em análise│
│  🟡 TICK-1019 [Política] Política CD-Recife    A. Lima     William  Aberto  │
│  🟡 TICK-1018 [Feriado] Inventário FOR 22/05  J. Oliveira  Outro    Aberto  │
│  🟢 TICK-1015 [Capac.]  CD-Salvador +20%       P. Costa    William  Em pré-│
│  🟢 TICK-1012 [Malha]   Alteração SP→BA SKU... L. Mendes   William  Aprovado│
│  🟢 TICK-1009 [Malha]   Nova rota PE→RN        M. Souza    William  Enviado│
│  ⚪ TICK-1003 [Feriado] Manutenção REC 30/04  A. Lima     Outro    Rejeitado│
│                                                                              │
│                          ◀ 1 2 3 ... 12 ▶                                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Subabas (Minhas / Atribuídas / Todas)** | Filtros pré-definidos por relação do usuário com o ticket |
| **Botão "+ Nova Solicitação"** | Abre modal de criação |
| **Barra de filtros** | Múltiplos filtros combináveis. Chips ativos aparecem abaixo |
| **Busca da lista** | Busca dentro do resultado filtrado |
| **Coluna ID** | Link clicável para a página de detalhe |
| **Coluna Tipo** | Chip colorido por tipo de dado |
| **Coluna Resumo** | Título auto-gerado a partir dos campos principais |
| **Coluna Status** | Badge com cor por status |
| **Indicador SLA** | Bolinha colorida (🔴🟡🟢⚪) à esquerda do ID |
| **Paginação** | 20 itens por página, navegação numerada |

---

## 3. Solicitações — Detalhe do Ticket

### Layout

Página de detalhe estruturada em **2 colunas assimétricas** abaixo de um cabeçalho:

1. **Cabeçalho da página** (linha única, full-width): breadcrumb "◀ Voltar", ID/tipo/SLA no centro, menu de ações "⋯" à direita.
2. **Barra de contexto** (linha única, full-width): status, prioridade e link para o pré-plano vinculado.
3. **Coluna esquerda — Detalhes (~35% da largura)**: lista vertical empilhada com os campos do ticket (Origem, Destino, SKU...), seguida dos blocos "Anexos" e "Aprovação". Cada bloco é separado por divisor.
4. **Coluna direita — Comentários & Histórico (~65% da largura)**: timeline cronológica em scroll vertical próprio, com caixa de "Adicionar comentário" fixa no rodapé da coluna.

Ambas colunas têm a mesma altura visual. Apenas a timeline rola verticalmente quando há muito histórico — os detalhes permanecem visíveis.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ◀ Voltar           TICK-1024 • Malha • 🔴 SLA: 30min            [⋯ Ações]  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Status: Em Análise   Prioridade: Crítica   Vinculado: PP-2026-05-19-001    │
├──────────────────────┬───────────────────────────────────────────────────────┤
│  📋 Detalhes         │  💬 Comentários & Histórico                          │
│                      │                                                       │
│  Origem: CE          │  ┌─ Timeline ─────────────────────────────────────┐ │
│  Destino: PE         │  │ 10:23  William: Validando o lead time com      │ │
│  SKU: 5567           │  │        a operação                              │ │
│  Modal: Rodoviário   │  │                                                │ │
│  Lead time: 24h      │  │ 10:15  Status mudou: Aberto → Em Análise       │ │
│  Vigência: 20/05     │  │                                                │ │
│  Regional: Nordeste  │  │ 10:12  M. Souza: Cliente XYZ precisa receber  │ │
│  Motivo: Cliente XYZ │  │        no dia 21. Verificar se conseguimos.   │ │
│                      │  │                                                │ │
│  Solicitante:        │  │ 10:10  TICK-1024 criado por M. Souza          │ │
│   M. Souza           │  │        Atribuído a: William                    │ │
│  Atribuído:          │  └────────────────────────────────────────────────┘ │
│   William            │                                                       │
│                      │  ┌─ Adicionar comentário ─────────────────────────┐ │
│  ─────────────────  │  │                                                │ │
│  📎 Anexos (1)      │  │                                                │ │
│  • pedido-xyz.pdf   │  │                                       [Enviar] │ │
│                      │  └────────────────────────────────────────────────┘ │
│                      │                                                       │
│  🔗 Aprovação        │                                                       │
│   Aguardando: Ger. NE│                                                       │
│   ⏱ 30min restantes │                                                       │
│                      │                                                       │
└──────────────────────┴───────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Voltar** | Retorna para a lista mantendo filtros |
| **Cabeçalho com ID, tipo, SLA** | Identificação rápida + urgência sempre visível |
| **Menu de ações (⋯)** | Mudar status, reatribuir, vincular a pré-plano, duplicar, cancelar |
| **Barra de status/contexto** | Status, prioridade, pré-plano vinculado (link) |
| **Painel de Detalhes (esquerda)** | Todos os campos do ticket. Editável conforme permissão e status |
| **Anexos** | Lista de arquivos enviados, com preview |
| **Card de Aprovação** | Quando aplicável, mostra status de aprovação e quem é o aprovador |
| **Timeline (direita)** | Histórico cronológico de tudo que aconteceu no ticket |
| **Caixa de comentário** | Adicionar comentário texto. Suporta menção (@usuário) |
| **Cards de comentário** | Distinguem visualmente comentário humano de eventos do sistema |

---

## 4. Solicitações — Modal de Nova Solicitação

### Layout

Modal centralizado sobre overlay escuro, largura fixa (~640px), altura adaptável ao conteúdo. Estrutura em wizard de 2 passos:

**Passo 1 — Seleção de tipo:**
- Título no topo, botão "✕" à direita
- Subtítulo indicando "Passo 1 de 2"
- **Grid horizontal de 4 cards** lado a lado, iguais em largura (~140px cada)
- Rodapé: botões alinhados à direita ([Cancelar] [Próximo →])

**Passo 2 — Formulário contextual:**
- Mesmo cabeçalho, agora com nome do tipo escolhido
- **Lista vertical de campos**, um por linha (label em cima, input embaixo)
- Quando aplicável, **mensagens em destaque visual** (💡 azul) aparecem inline entre campos relacionados
- Bloco de "Prioridade" como radio buttons horizontais
- Botão de anexo discreto no final
- Rodapé: 3 botões à direita ([← Voltar] [Cancelar] [Enviar])

O modal trava o scroll da página de fundo. O conteúdo do modal rola internamente se ultrapassar a altura máxima (~80vh).

### Wireframe

```
┌────────────────────────────────────────────────────────────┐
│ Nova Solicitação                                       [✕] │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Passo 1 de 2: Tipo de alteração                           │
│                                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  🗺️       │  │  📋      │  │  📅      │  │  📦      │  │
│  │ Malha    │  │ Política │  │ Feriado  │  │ Capac.   │  │
│  │ (rota)   │  │ estoque  │  │ do CD    │  │ do CD    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                            │
│                                          [Cancelar] [Próximo →] │
└────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────

┌────────────────────────────────────────────────────────────┐
│ Nova Solicitação — Malha                              [✕]  │
├────────────────────────────────────────────────────────────┤
│  Passo 2 de 2: Detalhes da alteração                       │
│                                                            │
│  Origem:    [ CE - Fortaleza      ▼ ]                     │
│  Destino:   [ PE - Recife         ▼ ]                     │
│  SKU(s):    [ 5567               ] [+]                    │
│  Modal:     [ Rodoviário          ▼ ]                     │
│  Lead time: [ 24 ] horas                                  │
│  Vigência a partir de: [ 20/05/2026 ]                     │
│                                                            │
│  💡 Esta malha não existe. Será solicitada nova criação.  │
│  💡 Regional Nordeste será notificada para aprovação.     │
│                                                            │
│  Motivo / Contexto:                                        │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Cliente XYZ precisa receber no dia 21...            │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Prioridade: ( ) Normal  (●) Alta  ( ) Crítica            │
│  💡 Detectamos cutoff próximo. Sugerimos "Crítica".       │
│                                                            │
│  📎 [Anexar arquivo]                                       │
│                                                            │
│                          [← Voltar] [Cancelar] [Enviar]   │
└────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Passo 1: Seletor de tipo** | Cards visuais para escolher o tipo. Cada um abre form específico |
| **Form contextual** | Campos mudam conforme o tipo escolhido no passo 1 |
| **Dropdowns com busca** | Origem/destino/CD puxam da base de dados, com autocomplete |
| **Detector de novidade** | Quando a combinação não existe, sistema avisa que é criação de novo dado |
| **Sugestão de aprovador** | Sistema mostra qual regional será notificada baseado nos campos |
| **Sugestão de prioridade** | Baseado em palavras-chave do motivo + horário em relação ao cutoff |
| **Anexos** | Suporte a múltiplos arquivos (PDF, planilha, imagem) |
| **Validação inline** | Erros aparecem em tempo real, antes de submeter |

---

## 5. Planos — Board Kanban

### Layout

**Restrição crítica:** todas as 6 colunas precisam caber na tela sem scroll horizontal. Isso define o desenho.

Estrutura:

1. **Cabeçalho da página** (linha única, full-width): título + subabas [Board] [Lista] [Arquivo] à direita.
2. **Barra de filtros** (linha única, full-width): filtros à esquerda, botão "+ Novo Plano" à direita.
3. **Board kanban** (full-width, ocupa todo o resto vertical da tela):
   - **6 colunas de largura igual**, distribuídas via `flex: 1` ou `grid-template-columns: repeat(6, 1fr)` para preencher exatamente 100% da largura disponível.
   - Cada coluna tem header sticky no topo (nome + contagem).
   - Coluna tem **scroll vertical próprio** quando o número de cards passa da altura.
   - Cards são **compactos** — projetados para ~200px de largura (cabem em viewport de 1440px com sidebar aberta).
   - Espaçamento entre colunas: ~8px (dividers verticais sutis ou gaps).
   - Cards têm `cursor: grab` indicando que são arrastáveis.

**Densidade do card:** layout em 3 linhas internas:
- Linha 1: ID + chip de tipo
- Linha 2: contagem de tickets + tags de regional (chips pequenos, podem quebrar para a próxima linha)
- Linha 3: responsável + indicador de SLA

Tudo cabe em ~100px de altura por card. Em telas menores que 1280px, a sidebar colapsa automaticamente para liberar espaço.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ Planos                                                       [Board] [Lista] [Arquivo]│
├──────────────────────────────────────────────────────────────────────────────────────┤
│ Filtros: [Responsável ▼] [Regional ▼] [Urgência ▼]                  [+ Novo Plano]  │
├─────────────┬──────────────┬─────────────┬──────────────────┬──────────┬─────────────┤
│ Backlog (8) │ Em Montagem  │ Em Revisão  │ Aguard. Aprov.   │Aprovado  │ Enviado O9  │
│             │ (2)          │ (1)         │ (3)              │ (1)      │ (5 hoje)    │
├─────────────┼──────────────┼─────────────┼──────────────────┼──────────┼─────────────┤
│ ┌─────────┐ │ ┌──────────┐ │ ┌─────────┐ │ ┌──────────────┐ │ ┌──────┐ │ ┌─────────┐ │
│ │TICK-1024│ │ │ PP-...001│ │ │PP-..002 │ │ │ PP-2026-001  │ │ │PP-003│ │ │PP-2026-..│ │
│ │🗺️ Malha │ │ │5 tickets │ │ │3 tickets│ │ │ 8 tickets    │ │ │6 t.  │ │ │7 tickets │ │
│ │🔴 SLA   │ │ │NE • SP   │ │ │SP       │ │ │ NE • SP • CE │ │ │NE    │ │ │NE        │ │
│ │30min    │ │ │William   │ │ │Analista │ │ │ William      │ │ │Wm    │ │ │William   │ │
│ └─────────┘ │ │🔴 30min  │ │ │🟡 1h30  │ │ │ 🟡 2h        │ │ │🟢 4h │ │ │✓ 09:30   │ │
│             │ └──────────┘ │ └─────────┘ │ │ Aprov: 2/3   │ │ └──────┘ │ └─────────┘ │
│ ┌─────────┐ │              │             │ └──────────────┘ │          │             │
│ │TICK-1019│ │ ┌──────────┐ │             │                  │          │ ┌─────────┐ │
│ │📋 Polit.│ │ │ PP-...004│ │             │ ┌──────────────┐ │          │ │PP-2026-..│ │
│ │🟡 1h30  │ │ │2 tickets │ │             │ │ PP-2026-005  │ │          │ │4 tickets │ │
│ └─────────┘ │ │CE        │ │             │ │ 4 tickets    │ │          │ │SP        │ │
│             │ │William   │ │             │ │ NE           │ │          │ │✓ 08:50   │ │
│ ┌─────────┐ │ │🟡 2h     │ │             │ │ 🟢 3h        │ │          │ └─────────┘ │
│ │TICK-...│  │ └──────────┘ │             │ │ Aprov: 1/2   │ │          │             │
│             │              │             │ └──────────────┘ │          │             │
└─────────────┴──────────────┴─────────────┴──────────────────┴──────────┴─────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Subabas (Board/Lista/Arquivo)** | Visões diferentes do mesmo dado |
| **Filtros do board** | Filtram colunas mantendo a estrutura |
| **Botão "+ Novo Plano"** | Cria pré-plano vazio em "Em Montagem" |
| **Header da coluna** | Nome + contagem de cards |
| **Card de ticket (coluna Backlog)** | Ticket individual aprovado, ainda não agrupado. Pode ser arrastado para um pré-plano em montagem |
| **Card de pré-plano** | ID, contagem de tickets, regionais (chips), responsável, SLA visual |
| **Indicador de aprovações** | Em "Aguardando Aprovação", mostra "Aprov: 2/3" — quantos já aprovaram |
| **Drag & drop entre colunas** | Move o card. Mudanças de coluna disparam regras (ex: ir para "Aguard. Aprovação" notifica os aprovadores) |
| **Click no card** | Abre página de detalhe |

---

## 6. Planos — Detalhe do Pré-Plano

### Layout

Página de detalhe em **coluna única vertical** (full-width), com cards empilhados de cima para baixo. Não usa layout de 2 colunas como o detalhe de ticket porque os blocos aqui são mais largos e tabelares.

Ordem de empilhamento:

1. **Cabeçalho** (linha única, full-width): voltar à esquerda, ID + status no centro, menu de ações à direita.
2. **Barra de metadados** (linha única, full-width): responsável, data de criação, deadline.
3. **Card "Análise de impacto"** (full-width, altura compacta): números agregados em linha horizontal + chips de regionais coloridos por status.
4. **Card "Status de aprovação"** (full-width): lista vertical de aprovadores, um por linha, com seu status visual.
5. **Card "Tickets incluídos"** (full-width, expansível): tabela ou lista densa dos N tickets do pré-plano. Cada linha clicável.
6. **Barra de ações fixa no rodapé** (full-width, sticky): 3 botões principais [Gerar arquivo O9] [Marcar como Enviado] [Comentar].

Toda a página rola verticalmente como uma só. A barra de ações no rodapé fica sempre visível.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ◀ Voltar     PP-2026-05-19-001 • Aguardando Aprovação        [⋯ Ações]      │
├──────────────────────────────────────────────────────────────────────────────┤
│ Responsável: William • Criado em: 19/05 09:00 • Deadline cutoff: 12:00      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ ┌─ Análise de impacto ────────────────────────────────────────────────────┐ │
│ │  8 tickets   •   23 SKUs afetados   •   5 CDs   •   3 regionais         │ │
│ │  Regionais: 🟢 Nordeste  🟢 Sudeste  🟢 Centro-Oeste                    │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ┌─ Status de aprovação ───────────────────────────────────────────────────┐ │
│ │  Nordeste:      ✅ Aprovado por J. Andrade (10:15)                     │ │
│ │  Sudeste:       ✅ Aprovado por R. Pinheiro (10:42)                    │ │
│ │  Centro-Oeste:  ⏱ Aguardando A. Vasconcellos                           │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ┌─ Tickets incluídos (8) ─────────────────────────────────────────────────┐ │
│ │  TICK-1024 🗺️ Malha CE→PE SKU 5567       (M. Souza)        Crítica    │ │
│ │  TICK-1019 📋 Política CD-Recife          (A. Lima)         Alta       │ │
│ │  TICK-1015 📦 Capacidade CD-Salvador +20% (P. Costa)        Normal     │ │
│ │  TICK-1012 🗺️ Malha SP→BA SKU 8821       (L. Mendes)       Normal     │ │
│ │  TICK-1010 🗺️ Malha GO→TO SKU 7723       (R. Silva)        Normal     │ │
│ │  TICK-1008 📅 Feriado CD-Fortaleza 22/05  (J. Oliveira)     Normal     │ │
│ │  TICK-1006 📦 Capacidade CD-Goiânia -10%  (R. Silva)        Normal     │ │
│ │  TICK-1004 🗺️ Malha SP→MG SKU 4412       (L. Mendes)       Normal     │ │
│ │                                                          [+ Add ticket]│ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ┌─ Ações ──────────────────────────────────────────────────────────────────┐│
│ │  [📄 Gerar arquivo O9]  [📤 Marcar como Enviado]  [💬 Comentar]         ││
│ └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Cabeçalho** | ID, status, responsável, deadline em relação ao cutoff |
| **Análise de impacto** | Auto-calculada: tickets, SKUs, CDs e regionais afetadas. Atualiza ao adicionar/remover tickets |
| **Status de aprovação** | Lista de aprovadores e situação. Mostra quem já aprovou, quando, quem falta |
| **Lista de tickets incluídos** | Cards compactos. Click leva ao detalhe. Botão "+ Add ticket" busca tickets aprovados do backlog |
| **Botão "Gerar arquivo O9"** | Produz CSV pipe-separated, 18 chars. Habilitado só quando o status é "Aprovado" |
| **Botão "Marcar como Enviado"** | Move o card para "Enviado ao O9". Registra horário e usuário |
| **Botão "Comentar"** | Abre área de comentários do pré-plano (similar ao ticket) |

---

## 7. Malhas — Subaba "Malhas Ativas"

### Layout

Estrutura vertical empilhada:

1. **Cabeçalho da página** (linha única, full-width): título "Malhas".
2. **Barra de subabas** (linha única, full-width): pills horizontais [Malhas Ativas] [Importações SNP] [Solicitações de Malha].
3. **Barra de controles** (linha única, full-width): toggle de visualização (Tabela/Mapa) à esquerda, botão "+ Solicitar nova malha" à direita.
4. **Barra de filtros** (linha única, full-width): filtros à esquerda, busca à direita.
5. **Área de conteúdo** (full-width, ocupa todo o resto vertical):
   - Quando em **modo Tabela**: tabela densa com linhas horizontais, paginação no rodapé. Coluna "Ações" sempre à direita, fixa.
   - Quando em **modo Mapa**: canvas SVG/Canvas ocupando todo o espaço. Painel lateral direito (~280px) que aparece com detalhes ao clicar em uma rota — overlay sem empurrar o mapa.

A troca entre Tabela e Mapa mantém os filtros ativos.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Malhas                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│  [ Malhas Ativas ] [ Importações SNP ] [ Solicitações de Malha ]            │
├──────────────────────────────────────────────────────────────────────────────┤
│  Visualização: ( Tabela ●) ( Mapa )         [+ Solicitar nova malha]        │
│  Filtros: [Regional ▼] [CD ▼] [Modal ▼] [SKU ▼]              🔍 Buscar     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Origem    Destino   SKU(s)      Modal       Lead   Cap.   Regional  Ações  │
│  ──────────────────────────────────────────────────────────────────────────  │
│  Fortaleza Recife    5567,8812   Rodoviário  24h    100t   NE        [···] │
│  Fortaleza Natal     5567,3344   Rodoviário  18h    80t    NE        [···] │
│  Recife    Salvador  8821        Rodoviário  20h    120t   NE        [···] │
│  São Paulo Curitiba  4412,7723   Rodoviário  16h    150t   Sul       [···] │
│  São Paulo Goiânia   8821        Rodoviário  22h    100t   CO        [···] │
│  ...                                                                         │
│                                                                              │
│                                              ◀ 1 2 3 ... 25 ▶                │
└──────────────────────────────────────────────────────────────────────────────┘

  Click no [···]:
  ┌─────────────────────┐
  │ Ver linha do tempo  │
  │ Solicitar alteração │
  │ Solicitar exclusão  │
  └─────────────────────┘
```

**Visualização em Mapa:**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Visualização: ( Tabela ) ( Mapa ●)                                          │
│  [+ Solicitar nova malha]                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                  CE ●────────● PE                                           │
│                     \         \                                              │
│                      \         ● RN                                          │
│                       \                                                      │
│            SP ●────────● BA                                                  │
│               \                                                              │
│                \────● PR                                                     │
│                 \                                                            │
│                  ●─── GO ── TO                                              │
│                                                                              │
│  Legenda: ── Rodoviário  ━━ Aéreo                                           │
│  Click em uma rota para ver detalhes                                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Toggle Tabela / Mapa** | Alterna entre as duas visões da mesma base |
| **Filtros** | Combináveis. Aplicam-se a ambas as visões |
| **Botão "+ Solicitar nova malha"** | Atalho que abre o form com tipo Malha pré-selecionado |
| **Coluna "Ações" da tabela** | Menu por linha: ver histórico, solicitar alteração (pré-preenche o form), solicitar exclusão |
| **Linha do tempo de uma malha** | Modal/página mostrando tudo que já aconteceu com aquela malha desde a criação |
| **Mapa visual** | Grafo da rede logística. Nodes são CDs/fábricas, edges são malhas. Click leva ao detalhe |

---

## 8. Malhas — Subaba "Importações SNP" + Tela de Diff

### Layout da lista de importações

Estrutura simples vertical:

1. Cabeçalho da página (full-width).
2. Barra de subabas (full-width).
3. **Barra de ação** (linha única, full-width): botão "📤 Subir nova planilha SNP" alinhado à direita.
4. **Tabela full-width** de importações anteriores, com coluna "Ações" à direita.

### Wireframe — Lista

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Malhas                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│  [ Malhas Ativas ] [ Importações SNP* ] [ Solicitações de Malha ]           │
│                          * 1 pendente revisão                                │
├──────────────────────────────────────────────────────────────────────────────┤
│                                              [📤 Subir nova planilha SNP]    │
│                                                                              │
│  Data       Arquivo                  Subido por   Status         Ações       │
│  ──────────────────────────────────────────────────────────────────────────  │
│  19/05 09h  Plano-SNP-maio-v3.xlsx   William     ⚠ Aguard. rev. [Revisar]   │
│  03/05 14h  Plano-SNP-maio-v2.xlsx   William     ✅ Aplicado    [Ver]       │
│  28/04 10h  Plano-SNP-maio-v1.xlsx   J. Andrade  ❌ Cancelado   [Ver]       │
│  01/04 09h  Plano-SNP-abril.xlsx     William     ✅ Aplicado    [Ver]       │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Layout da tela de diff

Esta é uma tela densa de revisão. Layout vertical empilhado em **uma coluna única (full-width)**:

1. **Cabeçalho** (full-width): voltar + nome do arquivo + metadados do upload.
2. **Card "Resumo das mudanças"** (full-width, altura compacta): 4 contadores em linha horizontal, lado a lado (Novas / Alteradas / Removidas / Conflitos), cada um com cor própria.
3. **Filtro de tipo** (linha única): dropdown para filtrar quais categorias mostrar.
4. **Seções colapsáveis empilhadas** (full-width cada), nesta ordem de prioridade visual:
   - ⚠ Conflitos (sempre expandido por padrão)
   - 🟢 Novas
   - 🟡 Alteradas
   - 🔴 Removidas

   Cada seção é um card com header (ícone + contagem) e lista interna de itens. As listas têm scroll vertical próprio quando muito longas.
5. **Barra de ações fixa no rodapé** (full-width, sticky): [Cancelar] à esquerda, [Aplicar mudanças] e [Gerar tickets] à direita.

A barra de ações é sticky porque o usuário pode rolar muito a lista antes de decidir.

### Wireframe — Diff

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ◀ Voltar    Revisar Importação: Plano-SNP-maio-v3.xlsx                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ Subido por William em 19/05 09:00                                            │
│                                                                              │
│ ┌─ Resumo das mudanças ───────────────────────────────────────────────────┐ │
│ │  🟢 Novas: 12     🟡 Alteradas: 8     🔴 Removidas: 3     ⚠ Conflitos: 2│ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ Filtrar: [Todas ▼]                                                           │
│                                                                              │
│ ⚠ Conflitos detectados                                                       │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 🔴 CE → PE • SKU 5567                                                  │ │
│  │    Existe ticket aberto (TICK-1024) modificando esta malha             │ │
│  │    [ Manter ticket ] [ Sobrescrever ]                                  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ 🟢 Novas malhas (12)                                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ + Curitiba → Florianópolis • SKU 4412 • Rodoviário • 8h                │ │
│  │ + São Paulo → Ribeirão Preto • SKU 7723 • Rodoviário • 4h              │ │
│  │ + ... (mostrar todas)                                                  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ 🟡 Alteradas (8)                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ ✎ Fortaleza → Recife • SKU 8812                                        │ │
│  │   Lead time: 24h → 20h                                                 │ │
│  │   Capacidade: 100t → 120t                                              │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ 🔴 Removidas (3)                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ - Salvador → Aracaju • SKU 3344                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│                              [Cancelar] [Aplicar mudanças] [Gerar tickets]   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Botão "Subir nova planilha"** | Upload de Excel. Trigger do parser |
| **Lista de importações** | Histórico de todos os uploads, com status |
| **Resumo das mudanças** | Cards com contagem por categoria (novas/alteradas/removidas/conflitos) |
| **Filtro de tipo de mudança** | Mostrar só novas, ou só alteradas, etc. |
| **Card de conflito** | Destaque para casos que precisam de decisão. Botões para resolver inline |
| **Cards de mudança** | Visual claro do antes/depois (📍 → 📍, valor antigo → novo) |
| **Botão "Aplicar mudanças"** | Aplica todas as alterações diretamente nas malhas (caminho mais rápido) |
| **Botão "Gerar tickets"** | Cria um ticket para cada mudança, passando pelo fluxo normal de aprovação (caminho governado) |
| **Botão "Cancelar"** | Descarta a importação |

---

## 9. Aprovações — Lista

### Layout

Lista vertical de **cards full-width empilhados**. Diferente da lista de Solicitações (que é uma tabela), aqui cada item é um card grande com todo o resumo necessário para decidir sem precisar abrir.

Estrutura:

1. Cabeçalho da página (full-width).
2. Barra de subabas (full-width): [Pendentes (N)] [Histórico].
3. **Coluna única vertical** de cards empilhados:
   - Cada card ocupa 100% da largura disponível.
   - Altura adaptável ao conteúdo (~140-160px cada).
   - Ordenação por SLA — mais urgente no topo.
   - Espaçamento vertical entre cards: ~16px.
   - Botões de ação inline alinhados à direita no rodapé do card.

Não há paginação na lista de pendentes — ela é projetada para ser curta (idealmente < 10 itens). Histórico tem paginação.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Aprovações                                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│  [ Pendentes (3) ] [ Histórico ]                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 🔴 SLA: 30min restantes                                                │ │
│  │ PP-2026-05-19-001 — Pré-plano                                          │ │
│  │ 8 tickets • 23 SKUs • 5 CDs • Regionais: NE, SE, CO                   │ │
│  │ Solicitado por William • há 1h30                                       │ │
│  │ Resumo: Alterações de malha para atendimento de pedidos críticos       │ │
│  │                                                                        │ │
│  │ [Ver detalhes]   [✅ Aprovar]   [❌ Rejeitar]   [💬 Mais info]        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 🟡 SLA: 2h restantes                                                   │ │
│  │ TICK-1019 — Política de estoque                                        │ │
│  │ CD-Recife • SKU 8821                                                   │ │
│  │ Solicitado por A. Lima • há 45min                                      │ │
│  │ Resumo: Redução de estoque mínimo de 500 para 300 unidades            │ │
│  │                                                                        │ │
│  │ [Ver detalhes]   [✅ Aprovar]   [❌ Rejeitar]   [💬 Mais info]        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ 🟢 SLA: 4h restantes                                                   │ │
│  │ ...                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Subabas Pendentes/Histórico** | Filtros por situação |
| **Card de aprovação** | Resumo executivo para decisão sem precisar abrir |
| **Indicador de SLA no topo** | Ordem da lista é por urgência |
| **Botões inline** | Aprovar e rejeitar diretamente da lista. Rejeitar pede comentário obrigatório |
| **Botão "Mais info"** | Cria comentário no ticket pedindo informação adicional. Volta para o solicitante |

---

## 10. Aprovações — Detalhe (caso de pré-plano)

### Layout

Página de leitura focada em decisão rápida. **Coluna única vertical**, cards empilhados, com a área de decisão sempre visível no rodapé.

Estrutura:

1. **Cabeçalho** (full-width): voltar + título da aprovação.
2. **Card "Resumo executivo"** (full-width): 4-5 linhas de texto-chave, sem ornamentos. É a primeira coisa que o aprovador lê.
3. **Card "Análise de impacto"** (full-width): números agregados + breakdown por regional. Linhas verticais dentro do card.
4. **Card "Tickets do pré-plano"** (full-width, expansível/colapsável): por padrão expandido com lista compacta dos N tickets. Pode ser fechado.
5. **Card "Sua decisão" fixo no rodapé** (full-width, sticky): textarea de comentário + 3 botões grandes ([Rejeitar] [Pedir mais info] [APROVAR] com APROVAR em destaque visual à direita).

A página inteira rola verticalmente. O card de decisão é sticky para que o aprovador sempre veja os botões sem precisar rolar.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ◀ Voltar    Aprovar PP-2026-05-19-001                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ ┌─ Resumo executivo ──────────────────────────────────────────────────────┐ │
│ │  Pré-plano com 8 alterações em malhas, políticas e capacidade           │ │
│ │  Impacta 23 SKUs, 5 CDs em 3 regionais                                  │ │
│ │  Solicitado por William em 19/05 09:00                                  │ │
│ │  Deadline: cutoff 12:00 (1h30 restantes)                                │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ┌─ Análise de impacto ────────────────────────────────────────────────────┐ │
│ │  Tickets por tipo:                                                      │ │
│ │    🗺️ Malha: 4    📋 Política: 1    📅 Feriado: 1    📦 Capacidade: 2 │ │
│ │                                                                         │ │
│ │  Regionais afetadas:                                                    │ │
│ │    🟢 Nordeste — 5 alterações  (aprovação: J. Andrade ✅)              │ │
│ │    🟢 Sudeste — 2 alterações   (aprovação: R. Pinheiro ✅)             │ │
│ │    🟡 Centro-Oeste — 1 alteração  (aprovação: VOCÊ)                    │ │
│ │                                                                         │ │
│ │  💡 Insight histórico: 3 alterações similares aprovadas neste mês      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ┌─ Tickets do pré-plano ──────────────────────────────────────────────────┐ │
│ │  [Lista expandível dos 8 tickets, similar ao detalhe do pré-plano]      │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ┌─ Sua decisão ───────────────────────────────────────────────────────────┐ │
│ │  Comentário (opcional para aprovar, obrigatório para rejeitar):         │ │
│ │  ┌────────────────────────────────────────────────────────────────────┐ │ │
│ │  │                                                                    │ │ │
│ │  └────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                         │ │
│ │           [❌ Rejeitar]  [💬 Pedir mais info]  [✅ APROVAR]            │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Resumo executivo** | Tudo que o aprovador precisa saber sem rolar a tela |
| **Análise de impacto detalhada** | Quebra por tipo, regional, e mostra status dos outros aprovadores |
| **Insight histórico** | Diferencial de IA — busca casos similares no histórico e mostra como foram decididos |
| **Lista expandível de tickets** | Aprovador pode "drill down" se quiser |
| **Caixa de comentário + botões de decisão** | Decisão final. Rejeitar força comentário |

---

## 11. Analytics — Dashboard Visão Geral

### Layout

Dashboard clássico em grid, semelhante ao Dashboard inicial mas com mais widgets e gráficos.

Estrutura vertical empilhada:

1. **Cabeçalho** (full-width): título "Analytics".
2. **Barra de subabas** (full-width): pills horizontais para as 5 visões de dashboard.
3. **Seletor de período** (linha única): dropdown alinhado à esquerda.
4. **Grid de KPIs (4 colunas iguais, full-width)**: cards com números grandes, iguais ao Dashboard.
5. **Grid 2x2 de cards visuais**, cada quadrante full-width na sua metade:
   - **Linha 1 esquerda (~60%)**: gráfico de série temporal (barras/linha) ocupando largura maior
   - **Linha 1 direita (~40%)**: bloco "Top tipos" com barras horizontais ou donut
   - **Linha 2 esquerda (~60%)**: distribuição por regional (barras horizontais)
   - **Linha 2 direita (~40%)**: card "Gargalos detectados" com lista de alertas

Em telas menores, o grid 2x2 vira 1 coluna vertical com os 4 cards empilhados.

### Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Analytics                                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  [ Visão Geral ] [ SLA & Performance ] [ Volume ] [ Carga ] [ IA Insights ] │
├──────────────────────────────────────────────────────────────────────────────┤
│  Período: [ Últimos 30 dias ▼ ]                                              │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   342        │  │   94%        │  │   2h 15min   │  │   78         │    │
│  │ Solicitações │  │ SLA cumprido │  │ Tempo médio  │  │ Pré-planos   │    │
│  │ totais       │  │              │  │ resolução    │  │ enviados O9  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌─ Solicitações por dia ───────────────────────┐ ┌─ Top tipos ──────────┐ │
│  │                                              │ │  🗺️ Malha       62%  │ │
│  │     ▂▃▅▇█▆▅▃▂▄▆█▆▅▄▃▆█▇▅                   │ │  📦 Capacidade  18%  │ │
│  │                                              │ │  📋 Política    12%  │ │
│  │  abr 21          mai 19                      │ │  📅 Feriado      8%  │ │
│  └──────────────────────────────────────────────┘ └──────────────────────┘ │
│                                                                              │
│  ┌─ Distribuição por regional ──────────────────┐ ┌─ Gargalos detectados ┐ │
│  │  Nordeste     ████████████  45%             │ │  ⚠ Aprovação CO      │ │
│  │  Sudeste      ████████      28%             │ │    tempo médio 3h    │ │
│  │  Centro-Oeste ████          15%             │ │  ⚠ Volume seg às 9h │ │
│  │  Sul          ███           12%             │ │    +40% vs média     │ │
│  └──────────────────────────────────────────────┘ └──────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Seletor de período** | Últimos 7d / 30d / 90d / período customizado |
| **KPIs principais** | 4 números essenciais sempre visíveis |
| **Gráfico de série temporal** | Volume de solicitações ao longo do tempo |
| **Distribuição por tipo** | Donut chart ou barras horizontais |
| **Distribuição por regional** | Barras com %s. Click filtra o dashboard inteiro |
| **Gargalos detectados** | Análise automática que aponta problemas (não só dado, mas insight acionável) |
| **Outras abas** | SLA detalhado / Volume com sazonalidade / Carga por parametrizador / IA Insights (anomalias, predições) |

---

## 12. Notificações — Popover do sino

### Layout

Popover ancorado ao ícone do sino no header, alinhado pela borda direita. Largura fixa (~360px), altura adaptável até um máximo (~480px) com scroll interno.

Estrutura interna do popover:

1. **Header do popover** (linha única, sticky no topo): título "Notificações" à esquerda, link "Marcar todas" à direita.
2. **Lista vertical de notificações** (ocupa o corpo, com scroll próprio): cada item é uma linha horizontal com ícone + texto, separados por divisor.
3. **Footer do popover** (linha única, sticky no rodapé): botão "Ver todas" que leva a uma página dedicada de histórico.

O popover fecha ao clicar fora dele. Click em uma notificação fecha o popover e navega para o item relacionado.

### Wireframe

```
                                                              ┌────────────────────────────────┐
                                                              │ Notificações       [Marcar todas]│
                                                              ├────────────────────────────────┤
                                                              │ • há 5 min                     │
                                                              │ ✅ TICK-1024 foi aprovado      │
                                                              │   por J. Andrade               │
                                                              ├────────────────────────────────┤
                                                              │ • há 12 min                    │
                                                              │ 💬 R. Pinheiro comentou em     │
                                                              │   PP-2026-05-19-001            │
                                                              ├────────────────────────────────┤
                                                              │ • há 45 min                    │
                                                              │ 🔴 TICK-1024 está com SLA      │
                                                              │   em risco (30min restantes)   │
                                                              ├────────────────────────────────┤
                                                              │ • há 1h                        │
                                                              │ 📋 Você foi atribuído ao       │
                                                              │   TICK-1024                    │
                                                              ├────────────────────────────────┤
                                                              │           [Ver todas]          │
                                                              └────────────────────────────────┘
```

### Componentes

| Componente | Funcionalidade |
|---|---|
| **Badge no sino** | Conta de não lidas |
| **Popover compacto** | Últimas 10 notificações, com ícone por tipo |
| **Botão "Marcar todas"** | Marca todas como lidas |
| **Item da notificação** | Click leva direto para o objeto relevante (ticket, pré-plano, aprovação) |
| **Indicador visual de não lida** | Ponto colorido ou fundo destacado |
| **Botão "Ver todas"** | Abre página dedicada com histórico completo de notificações |

---

## 13. Resumo: matriz de tela × papel

Quais telas cada papel acessa e com qual frequência.

| Tela | Solicitante | Parametrizador | Aprovador | Gestor |
|---|:---:|:---:|:---:|:---:|
| Dashboard | ✓ (visão própria) | ✓✓ (principal) | ✓ (foco em aprov.) | ✓ (consolidado) |
| Solicitações | ✓✓ (cria e acompanha) | ✓✓ (executa) | — | ✓ (audita) |
| Planos | — | ✓✓ (trabalha aqui) | — | ✓ (acompanha) |
| Malhas | ✓ (consulta) | ✓✓ (administra) | — | ✓ (acompanha) |
| Aprovações | — | — | ✓✓ (principal) | ✓ (audita) |
| Analytics | — | ✓ (sua carga) | ✓ (suas decisões) | ✓✓ (gestão) |
| Configurações | — | — | — | ✓✓ |

Legenda: ✓✓ = uso principal, ✓ = uso eventual, — = não acessa
