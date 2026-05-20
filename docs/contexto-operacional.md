# Contexto Operacional — Insights da Live de Dúvidas

Fonte: transcrição da live de dúvidas sobre o desafio, analisada via NotebookLM.

---

## Glossário do Sistema

| Termo | Significado |
|---|---|
| **O9 DRP** | Sistema APS de planejamento avançado que calcula distribuição entre fábricas e CDs |
| **SNO** | Planejamento de Curto Prazo (~4 semanas): produção, distribuição nos CDs, demanda, estoques |
| **SNP** | Planejamento de Médio/Longo Prazo: fornece o plano de malha mensal básico (origem x destino) |
| **S&OE** | Sales & Operations Execution — planejadores que consomem a saída do O9 e executam no SAP |
| **CD** | Centro de Distribuição |
| **TLB** | Sistema de formação de carga |
| **Cutoff / Corte** | Horário limite (meio-dia) para os planejadores consultarem o sistema O9 |
| **Planilhão** | Plano de contingência em Excel usado quando o O9 está indisponível |

---

## Papéis e Responsabilidades

### Parametrizadores (SNO)
- **Quem:** William + 1 analista (total: 2 pessoas)
- **O que fazem:** consolidam planilhas e realizam o input manual no O9 via SharePoint ou scripts Python
- **Como recebem demandas:** via Teams, reuniões, e-mail — sem padrão
- **Coordenação entre si:** grupo de Teams, baseada em disponibilidade/"afinidade" — sem divisão formal de tarefas

### Planejadores (S&OE)
- **O que fazem:** consomem a saída do O9, analisam sugestões de distribuição e criam reservas no SAP/TLB
- **Quando consultam o sistema:** a partir das 07:30
- **Dependência:** precisam que o O9 esteja funcionando e com dados corretos antes do cutoff de meio-dia

### SNP (Planejamento de Médio/Longo Prazo)
- Fornece o plano de malha mensal básico como ponto de partida para o SNO

### Operações Logísticas / Corporativo
- Informa calendários de feriados, inventários e capacidades dos CDs
- **Problema:** uma pessoa desse time altera o O9 diretamente, sem comunicar o S&OE

### Gerentes/Coordenadores Regionais
- Atuam como aprovadores de alterações críticas que impactam outras regiões
- Aprovações hoje acontecem via e-mail ou mensagem

---

## Fluxos Operacionais

### Fluxo de Malha
```
Plano mensal (SNP)
  → Validação inicial (Planejadores/Estoque)
  → Ajustes manuais (Parametrizadores)
  → Processamento (O9)
  → Execução (SAP/TLB)
```

### Fluxo de Feriados e Capacidade dos CDs
```
Calendário (Logística Corporativa)
  → Envio para SNO (via e-mail/Teams)
  → Input manual (Parametrizador)
  → Atualização de capacidade no O9
```

### Fluxo de Demanda
```
Colaboração comercial semanal
  → Consolidação de arquivos regionais
  → Input via script Python
  → Geração de sugestão de envio pelo O9
```

### Fluxo de Atualização Diária (operação padrão)
```
Gatilho: erros em logs de integração (e-mail) ou solicitação via Teams
  → Parametrizador identifica e corrige o dado
  → Gera arquivo CSV formatado
  → Carrega no SharePoint
  → O9 processa e está disponível para os planejadores às 07:30
```

---

## Regras e Restrições Técnicas

### Formato de arquivo obrigatório
- **Tipo:** CSV separado por pipe (`|`)
- **Estrutura:** rígida — 18 caracteres por célula
- **Validação do O9:** valida apenas estrutura (nome e formato do arquivo), **não valida a coerência do dado**

### Checkpoints temporais críticos
| Horário | Evento |
|---|---|
| 07:30 | Planejadores consultam o O9 |
| 08:00 | Erros descobertos após esse horário comprometem a rodada do dia |
| 12:00 | **Cutoff (corte)** — prazo final para uso do sistema na operação do dia |

### Tempo de correção de erros
Erro detectado pela manhã → **3 a 4 horas para corrigir** → risco de estouro do cutoff de meio-dia.

---

## Ferramentas e Canais

### Sistemas
| Sistema | Uso |
|---|---|
| **O9 DRP** | Sistema central de planejamento (APS) |
| **SAP** | ERP — origem de parte dos dados e destino das reservas de carga |
| **Python** | Scripts para geração e carga de arquivos de demanda |
| **TLB** | Formação de carga |
| **SharePoint** | Repositório de inputs manuais para o O9 |

### Canais de comunicação (todos informais)
- **Microsoft Teams** — canal principal de solicitações
- Reuniões diárias de fechamento
- E-mail

### Artefatos
- **"Planilhão"** — plano de contingência em Excel
- **Plano Mensal SNP** — base de malha para o mês
- **Logs diários de integração** — recebidos por e-mail, indicam erros no O9
