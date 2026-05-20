# Fluxo Completo — Do Planejamento Estratégico ao O9

Fonte: transcrição da live de dúvidas (via NotebookLM) + docs do desafio.
**Escopo da solução:** tudo até o upload no SharePoint (inclusive). O processamento no O9 e a execução no SAP/TLB estão fora do nosso escopo.

---

## Visão geral do fluxo

```
SNP (plano mensal)
  └─→ "Crítica" pelos planejadores e analistas de estoque
        └─→ Ajustes e validação do plano base
              └─→ Parametrizadores consolidam + faseamento via Python
                    └─→ Arquivo CSV carregado no SharePoint
                          └─→ O9 processa ← FORA DO NOSSO ESCOPO
                                └─→ Sugestão de distribuição para planejadores (S&OE)
                                      └─→ Execução no SAP via TLB ← FORA DO NOSSO ESCOPO
```

Paralelamente ao fluxo mensal, um fluxo **diário e ad-hoc** de ajustes operacionais alimenta o mesmo ponto de entrada (parametrizadores → SharePoint).

---

## Etapa 1 — Plano Mensal Base (SNP)

**Quem inicia:** equipe de SNP (Planejamento de Médio e Longo Prazo).

**O que é produzido:** um arquivo (normalmente Excel) com o plano de malhas do mês — define as rotas que estarão ativas: origem × destino × SKU. Esse é o "plano prévio" ou "plano base" que serve como ponto de partida para toda a operação logística do período.

**O que esse plano contém:**
- Pares origem–destino (fábricas → CDs, CDs → CDs)
- Quais SKUs percorrem cada rota
- Lead times
- Capacidades de transporte por rota

**Para quem vai:** parametrizadores (William e analista) e, em paralelo, planejadores S&OE e analistas de estoque para a etapa de "crítica".

---

## Etapa 2 — "Crítica" do Plano Base

**Quem participa:** planejadores (S&OE) e analistas de estoque.

**O que é:** uma revisão colaborativa do plano mensal antes de ele ser oficializado no sistema. O objetivo é garantir que nada crítico ficou de fora — rotas ausentes, SKUs esquecidos, CDs com restrições não mapeadas.

**Como funciona hoje:** é feita informalmente, via Teams ou reunião, sem registro estruturado.

**O que nosso sistema faz aqui:** substitui esse processo informal por um fluxo estruturado de revisão dentro da tela de Importações SNP (Malhas). O SNP sobe o Excel, o sistema mostra o diff em relação à base atual, planejadores e analistas revisam e aprovam ou apontam problemas antes da aplicação oficial.

---

## Etapa 3 — Ajustes Operacionais Diários (fluxo paralelo contínuo)

Enquanto o plano mensal segue seu ciclo, a operação gera uma demanda constante de ajustes. São as **solicitações ad-hoc** que chegam todos os dias.

### 3.1 Quem solicita e o quê

| Quem | O que solicita | Tipo de dado |
|---|---|---|
| Planejadores S&OE | Criar nova rota porque produto acabou em uma região e precisa ser transferido de outra | Malha |
| Planejadores S&OE | Ajustar lead time de uma rota existente | Malha |
| Operações Logísticas Corporativo | Calendário de feriados, inventários e manutenções programadas dos CDs | Feriado de CD |
| Operações Logísticas Corporativo | Volume de recebimento máximo de cada CD por período | Capacidade de CD |
| Analistas de Estoque | Definição de cobertura mínima por SKU/CD | Política de Estoque |
| Time Comercial (via analistas de demanda) | Ajuste semanal nas previsões de demanda (Demand Sense) | Demand Sense |
| Gerentes Regionais | Alterações que impactam outras regiões | Qualquer tipo |

### 3.2 Como chegam hoje (o problema)

Tudo chega pelos canais informais:
- Microsoft Teams (principal)
- E-mail
- Grupos de WhatsApp
- Reunião de fechamento ao final do dia
- Ligação direta para o parametrizador

Sem padrão, sem fila, sem registro, sem SLA. Um parametrizador pode receber 30 pedidos enquanto o outro fica ocioso.

### 3.3 O que nosso sistema faz aqui

Substitui todos esses canais por **tickets estruturados** em Solicitações. Cada solicitante abre um ticket com os campos obrigatórios do tipo de dado, a plataforma atribui ao parametrizador correto, registra tudo e mantém o solicitante informado sobre o status.

---

## Etapa 4 — Consolidação pelos Parametrizadores

**Quem executa:** William e o analista (2 pessoas no total).

**O que fazem:**

### 4.1 Consolidar as solicitações
Hoje: catam as mensagens de Teams, e-mail, WhatsApp, anotam em planilha ou na memória.
Com nosso sistema: abrem a fila de tickets atribuídos e trabalham em ordem de prioridade/SLA.

### 4.2 Preparar os arquivos via Python
Os parametrizadores utilizam **scripts Python** para:
- Formatar os dados conforme a especificação do O9 (CSV separado por pipe `|`, 18 caracteres por célula)
- Realizar o **faseamento (face)** da demanda: pegar o volume mensal por SKU e quebrar em necessidades diárias por CD — é essa granularidade que o O9 precisa para processar

> Citação direta (William): *"a gente só atualiza ali a base, aí ele gera o Python já"* — ou seja, o parametrizador atualiza os dados de entrada e o script gera o arquivo formatado.

### 4.3 Validação estrutural
Existe um validador separado que checa apenas:
- Nome do arquivo (formato correto)
- Estrutura do CSV (colunas, separador, quantidade de caracteres por célula)

**O validador NÃO checa semântica** — não verifica se o dado faz sentido para o negócio (ex: SKU que não deveria estar naquela malha, rota logisticamente impossível).

> Citação direta (William): *"o validador é só para checar mesmo... ele vai checar o nome do arquivo, se está correto, a estrutura do arquivo em si"*

### 4.4 Upload no SharePoint
O arquivo validado é carregado no SharePoint. O O9 consome os arquivos dali para iniciar a integração.

**Este é o último passo do nosso escopo.**

---

## Etapa 5 — Processamento no O9 *(fora do nosso escopo)*

O O9 DRP cruza os dados recebidos com:
- Estoques atuais
- Produção prevista
- Demanda faseada

E gera uma **sugestão de distribuição**: quais produtos enviar, de onde, para onde, em que quantidade e quando.

**Logs de erro:** todo dia às 07:30 os parametrizadores recebem um e-mail com os logs de integração. Se houver erro crítico, precisam corrigir e rodar novamente antes do cutoff de meio-dia.

> Esse e-mail de erro é um ponto de entrada reativo. O nosso sistema pode exibir esses logs como notificações para que o parametrizador aja sem precisar esperar o e-mail do dia seguinte — mas a integração com o O9 para capturar esses logs é opcional/roadmap.

---

## Etapa 6 — Execução pelos Planejadores *(fora do nosso escopo)*

Os planejadores S&OE acessam a sugestão gerada pelo O9 e:
1. Verificam se o plano faz sentido operacional para a regional
2. Criam reservas e pedidos de transferência (STOs) no SAP
3. Formam as cargas no sistema TLB (Transport Load Builder)
4. Contratam transporte e roteirizam as entregas

---

## Checkpoints temporais críticos (relevantes para o nosso sistema)

| Horário | Evento | Impacto |
|---|---|---|
| Noite anterior | Upload no SharePoint | O O9 roda durante a noite com os novos dados |
| 07:30 | Planejadores começam a consultar o O9 | Dados precisam estar corretos antes disso |
| 08:00 | Deadline real de correção | Erros detectados após esse horário levam 3-4h para corrigir — risco de estourar o cutoff |
| 12:00 | **Cutoff (corte)** | Prazo final para uso do sistema O9 na operação do dia |

---

## Tipos de dado no escopo da solução

| Tipo | O que define | Frequência de alteração |
|---|---|---|
| **Malha** | Rota logística: origem × destino × SKU × modal × lead time × capacidade | Alta — o tipo mais solicitado |
| **Política de Estoque** | Cobertura mínima de dias por SKU e CD | Média |
| **Feriado de CD** | Calendário de fechamento, inventário ou manutenção de cada CD | Periódica (mensal/pontual) |
| **Capacidade de CD** | Volume máximo de recebimento por CD por período | Periódica |
| **Demand Sense** | Ajuste semanal da demanda em colaboração com o time comercial | Semanal |

---

## O que nosso sistema resolve (mapeamento dor → solução)

| Dor do processo atual | O que a solução endereça |
|---|---|
| Solicitações chegam por canais informais (Teams, WhatsApp, e-mail) sem padrão | Tickets estruturados em Solicitações substituem os canais informais |
| Sem rastreabilidade (quem pediu, quando, o quê, por quê, quem executou) | Auditoria completa de cada ação — quem, quando, o quê, campo alterado |
| Sem visibilidade de status para o solicitante | Status em tempo real do ticket (Aberto → Em Análise → Aprovado → Enviado ao O9) |
| Distribuição desequilibrada de carga entre parametrizadores | Atribuição automática por carga atual + fila visível |
| "Crítica" do plano SNP feita informalmente | Importação SNP com diff visual e revisão estruturada antes de aplicar |
| Aprovações de impacto cross-regional via e-mail sem registro | Fluxo de aprovação formal com registro, SLA e notificação automática para os aprovadores corretos |
| Faseamento e geração de arquivo feitos manualmente em Python | Sistema suporta o fluxo de criação e revisão do plano; geração do CSV O9 é integrada |
| Operações Logísticas altera dados sem notificar o S&OE | Qualquer alteração gera notificação para os planejadores afetados |
| Sem visibilidade consolidada para liderança | Analytics com SLA, carga da equipe, gargalos e tendências |
