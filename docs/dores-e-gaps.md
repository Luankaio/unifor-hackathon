# Dores e Gaps do Processo Atual

Mapeamento dos problemas identificados no desafio e na live de dúvidas.
Esses pontos devem guiar os requisitos da solução.

---

## Dores Críticas (impacto operacional imediato)

### 1. Ausência de rastreabilidade
Não há registro formal de:
- Quem solicitou a alteração
- Quando foi solicitada
- O que foi solicitado e por quê
- Quem executou
- Se a execução foi bem-sucedida

**Impacto:** impossível auditar, identificar erros recorrentes ou cobrar responsabilidades.

### 2. Canal de solicitações caótico
Solicitações chegam via Teams, e-mail, reuniões e ligações — sem padrão, sem fila, sem priorização.

**Impacto:** risco de solicitações perdidas, esquecidas ou duplicadas.

### 3. Distribuição desequilibrada de carga
Sem gestão de fila, um parametrizador pode receber 30 solicitações enquanto o outro fica ocioso.

**Impacto:** sobrecarga individual e risco de atraso no processamento.

### 4. Janela de correção crítica
Erros descobertos após 08:00 levam 3-4h para corrigir — ultrapassando o cutoff de meio-dia.

**Impacto direto na operação logística do dia.**

---

## Gaps de Visibilidade

### 5. Alterações sem visibilidade para o S&OE
A pessoa de Operações Logísticas hoje já envia os dados para os parametrizadores (melhora recente),
mas quando essas alterações são executadas no O9, o S&OE não recebe nenhuma notificação.

**Impacto:** planejadores trabalham com premissas atualizadas que não sabem que mudaram.

### 6. S&OE sem visibilidade do status das alterações
Os planejadores não sabem se uma alteração solicitada foi feita, está em andamento ou foi rejeitada.

**Impacto:** decisões de planejamento baseadas em informações potencialmente desatualizadas.

---

## Gaps de Governança

### 7. Validação apenas estrutural, não semântica
O O9 aceita qualquer dado desde que o arquivo esteja no formato correto (CSV, pipe, 18 chars).
Não valida se o dado faz sentido para o negócio (ex: SKU que não deveria estar naquela malha).

**Impacto:** dados incorretos entram no sistema e geram planejamentos errados silenciosamente.

### 8. Ausência de fluxo de aprovação para alterações críticas
Alterações que impactam outras regiões precisam de aprovação de gerentes/coordenadores regionais,
mas hoje isso ocorre via e-mail/mensagem, sem registro ou SLA definido.

**Impacto:** decisões críticas sem trilha de auditoria.

### 9. Sem divisão formal de responsabilidades entre parametrizadores
A coordenação é baseada em disponibilidade e "afinidade" — sem regra clara de quem cuida de quê.

**Impacto:** ambiguidade em situações de sobrecarga ou ausência de um colaborador.

---

## Risco Estratégico

### 10. Inescalabilidade do modelo atual
Novos módulos do O9 (sequenciamento e demand sense) entram em produção pelo meio do ano — a
tendência de longo prazo é reduzir inputs manuais. Porém, no curto prazo, o volume de solicitações
e a necessidade de governança só aumentam. O processo atual, baseado em 2 pessoas e comunicação
informal, não escala nem para o volume de hoje, quanto mais para 2027.

**Implicação para a solução:** não basta resolver volume — a solução precisa ser flexível para
o dia em que os inputs manuais forem substituídos por integrações automáticas.

---

## Resumo para a solução

A solução precisa endereçar, em ordem de prioridade:

| # | Problema | Requisito da solução |
|---|---|---|
| 1 | Sem rastreabilidade | Log completo de cada solicitação (quem, quando, o quê, por quê, resultado) |
| 2 | Canal caótico | Portal/formulário centralizado de solicitações com campos estruturados |
| 3 | Carga desequilibrada | Fila de trabalho visível para os parametrizadores com atribuição |
| 4 | Alterações invisíveis | Notificação automática para o S&OE quando o O9 for atualizado |
| 5 | Sem status para o solicitante | Status em tempo real da solicitação (pendente / em execução / concluído / rejeitado) |
| 6 | Aprovações informais | Fluxo de aprovação estruturado para alterações críticas |
| 7 | Escalabilidade | Arquitetura que suporte aumento de volume sem aumentar a equipe proporcionalmente |
