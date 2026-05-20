# Insights da Live — Respostas Confirmadas

Fonte: transcrição da live analisada via NotebookLM.
Formato: resposta fiel à transcrição + implicação para a solução.

---

## Integrações técnicas

### Como os dados entram no O9
- **Confirmado:** somente via arquivo no SharePoint. Sem menção a API.
- **Implicação:** a solução precisa gerar e depositar arquivos no SharePoint — não tem atalho via API.

### Como o O9 notifica sobre erros
- **Confirmado:** o O9 envia um e-mail diário com todos os logs de integração (sucesso e erro).
  > *"todo dia de manhã a gente recebe um e-mail com todos os logs que deram erro e sucesso na integração que teve do dia"* — William
- **Implicação:** hoje a única visibilidade é reativa (e-mail matinal). A solução pode interceptar ou substituir esse fluxo por alertas em tempo real.

### Scripts Python
- **Confirmado:** alguns scripts rodam de forma semi-automática — o parametrizador atualiza a base e o Python gera o arquivo. Outros parecem manuais.
  > *"a gente só atualiza ali a base, aí ele gera o Python já"* — William
- **Confirmado:** os scripts fazem geração/formatação, **não validação**. O validador é separado e checa apenas nome e estrutura do arquivo.
  > *"o validador é só para checar mesmo... ele vai checar o nome do arquivo, se está correto, a estrutura do arquivo em si"* — William
- **Não confirmado:** quem criou e mantém os scripts.
- **Implicação:** podemos estender os scripts para incluir validação semântica (ex: SKU existe naquela malha?). É um ponto de entrada técnico viável.

---

## Volume e frequência

### Tipo de dado mais atualizado
- **Confirmado:** malha (rotas/trechos) é o dado mais frequentemente solicitado.
  > *"vou usar malha como exemplo, que é o que a gente mais recebe de solicitação ali de mudanças"* — William
- **Implicação:** o MVP da solução deve focar o fluxo de solicitação de alteração de malha.

### Volume de solicitações por dia
- **Não confirmado** com número preciso. O doc cita "30 solicitações" como exemplo hipotético.

### Frequência de estouro de cutoff
- **Não confirmado** com frequência. Risco descrito como cenário, não como ocorrência regular.

---

## Processo e aprovações

### Quando uma alteração precisa de aprovação
- **Confirmado:** não há regra formal. É decidido caso a caso, escalado quando impacta outras regiões.
  > *"tem algum fluxo formal de aprovação? Não, normalmente não. Algumas informações que impacta outras regionais aí normalmente a gente só escalona"* — William
- **Implicação:** a solução precisa ter um critério de triagem (simples vs crítico) que hoje não existe. Isso pode ser um formulário com campos que disparam o fluxo de aprovação automaticamente.

### Quem aprova
- **Confirmado:** gerentes e coordenadores regionais.
  > *"normalmente os gerentes regionais... gerentes e coordenadores regionais, eles que avaliam ali, é com eles que bate o martelo"* — William

### A terceira pessoa de Operações Logísticas
- **Confirmado (com nuance):** William diz que **agora** ela já envia os dados para os parametrizadores ao invés de editar o O9 diretamente — houve uma melhora recente.
- **Problema que persiste:** o S&OE ainda não tem visibilidade clara dessas alterações quando elas acontecem.
- **Implicação:** o problema não é mais acesso direto ao O9, é a falta de notificação para o S&OE. A solução deve gerar visibilidade automática para os planejadores quando qualquer dado for alterado.

---

## Restrições e adoção

### Ferramentas Microsoft 365 disponíveis
- **Confirmado em uso:** Teams, SharePoint, Excel.
- **Não mencionados:** Power Automate, SharePoint Forms.
- **Implicação:** Teams e SharePoint são bases seguras para construir a solução. Power Automate precisaria ser validado com a empresa antes de propor.

### Sistema de tickets existente
- **Não mencionado.**

### Infraestrutura
- **Não mencionado** nenhuma restrição.

---

## Escala e 2027

### O que vai crescer
- **Parcialmente confirmado:** novos módulos do O9 (sequenciamento e demand sense) entram em produção pelo meio do ano — a tendência é **reduzir inputs manuais** a médio prazo.
- **Números de crescimento para 2027:** não mencionados.
- **Implicação importante:** a solução não pode ser desenhada apenas para crescimento de volume — precisa ser flexível para se adaptar quando os inputs manuais diminuírem.

### Caso real de erro com impacto na operação
- **Não confirmado** com caso histórico. William descreve o risco:
  > *"o impacto maior já é na rodada na hora ali mesmo. Isso tudo se o dado vier errado"*
  - Exemplifica: falta de malha cadastrada impedindo uma transferência necessária.

---

## Resumo do que ainda está em aberto

| Questão | Status |
|---|---|
| O SharePoint é polling ou event-driven? | Não mencionado |
| Quem criou/mantém os scripts Python? | Não mencionado |
| Volume médio real de solicitações/dia | Não confirmado |
| Frequência de estouro de cutoff | Não confirmado |
| Power Automate está disponível? | Não mencionado |
| Existe ticketing em outra área da empresa? | Não mencionado |
| Restrições de infra (cloud/on-prem) | Não mencionado |
| Números concretos de crescimento até 2027 | Não mencionado |
