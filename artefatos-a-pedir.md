# Artefatos a pedir antes de começar a produzir

Lista de materiais para solicitar ao contato da M. Dias Branco (William ou outro)
antes do time começar a desenvolver o protótipo. Sem isso, a gente inventa demais
e o protótipo perde aderência à realidade.

Priorizado em 3 níveis: 🔴 crítico • 🟡 importante • 🟢 bônus

---

## 🔴 Crítico (sem isso o protótipo fica genérico demais)

### 1. Planilha do plano mensal do SNP (Excel)
- **O que pedir:** o arquivo Excel que o SNP envia mensalmente com o plano de malhas
- **Por que:** define exatamente os campos, a estrutura e os nomes que aparecem na tela de importação. Sem isso, vamos inventar colunas
- **Pode ser:** anonimizado, com dados fictícios, mas mantendo a estrutura real

### 2. Arquivo final que vai para o O9 (CSV pipe-separated)
- **O que pedir:** um exemplo de cada tipo de arquivo que sobem no SharePoint (malha, política, feriado, capacidade)
- **Por que:** o sistema precisa gerar esse arquivo exatamente no formato esperado. Sem o exemplo real, a feature de "Gerar arquivo O9" não funciona de verdade
- **Detalhe técnico:** confirmar a regra dos 18 caracteres por célula — quais campos? Todos? Só alguns?

### 3. Campos exatos de cada tipo de dado
- **Malha:** quais campos compõem um registro completo? (origem, destino, SKU, modal, lead time, capacidade, vigência, política, ...?)
- **Política de estoque:** estoque mínimo, máximo, ponto de reposição, ...?
- **Feriado / inventário de CD:** data, tipo, duração, impacto?
- **Capacidade do CD:** unidade (toneladas? paletes?), período de vigência, ...?
- **Por que:** sem isso, os formulários de solicitação ficam adivinhados

### 4. Lista de CDs, fábricas e regionais
- **O que pedir:** mapa das fábricas, CDs e como eles se agrupam em regionais
- **Por que:** para preencher os dropdowns com dados reais. "CD-Recife" é muito mais convincente que "CD-001"
- **Pode ser:** anonimizado, mas com nomes reais de cidades

---

## 🟡 Importante (melhora muito o protótipo)

### 5. Exemplo do log diário de integração que vem por email
- **O que pedir:** screenshot ou texto de um e-mail típico de log do O9
- **Por que:** podemos integrar essa informação na plataforma (substituindo o e-mail). Sem o exemplo, a gente inventa um formato que não bate com a realidade

### 6. Exemplos reais de solicitações que chegam pelo Teams
- **O que pedir:** 2-3 prints (anonimizados) de mensagens típicas no Teams pedindo alteração
- **Por que:** entender o tom, o nível de detalhe, o que costuma faltar. Isso valida o desenho do formulário — se hoje as pessoas mandam "preciso de uma malha pra Recife urgente", o form precisa cobrir esse caso de baixa informação

### 7. Lista de regionais e seus aprovadores
- **O que pedir:** quais regionais existem e quem são os gerentes/coordenadores de cada uma
- **Por que:** o diferencial de "roteamento automático para o aprovador correto" precisa dessa tabela. Pode ser fictício, mas a estrutura tem que ser real
- **Pode ser:** "Regional Nordeste — Gerente: João Andrade, Coordenadora: Maria Souza" (nomes podem ser fictícios)

### 8. Volume aproximado de solicitações em um mês típico
- **O que pedir:** uma ordem de grandeza — 50? 500? 5.000?
- **Por que:** define se o protótipo precisa parecer cheio (com muitos tickets na tela) ou enxuto. Também ajuda no pitch

### 9. Glossário de termos internos
- **O que pedir:** SNO, S&OE, SNP, TLB, "planilhão", "rodada", "cutoff" — quais são as palavras que eles usam no dia a dia?
- **Por que:** se o protótipo usa termos que eles reconhecem, ganha pontos de credibilidade no pitch

---

## 🟢 Bônus (se conseguirem, ouro)

### 10. Screenshot/print da tela do O9 (mesmo que parcial)
- **Por que:** visualmente, entender o que eles olham hoje ajuda muito a desenhar nossa solução como "o que vem antes" sem conflitar com o que existe

### 11. Print do SharePoint onde sobem os arquivos
- **Por que:** entender a estrutura de pastas atual. Nossa solução pode até replicar isso na hora de organizar os arquivos gerados

### 12. Print do "planilhão" de contingência
- **Por que:** entender qual era o "plano B" deles quando o sistema falhava. Isso vira material de pitch (substituímos o planilhão)

### 13. Caso real de um erro que causou impacto na operação
- **O que pedir:** uma história — "no mês passado, um erro de malha fez tal coisa acontecer"
- **Por que:** material narrativo de ouro para o pitch ("hoje, esse erro custa X. Com nossa solução, ele teria sido evitado porque...")

### 14. Identidade visual da M. Dias Branco
- **O que pedir:** logo, paleta de cores, fontes (ou link para o branding deles)
- **Por que:** o protótipo parecer "deles" no pitch tem peso emocional. Não usar cores genéricas

### 15. Estrutura organizacional resumida
- **O que pedir:** quem responde para quem nas áreas que tocam o O9 (S&OE, SNO, SNP, Operações Logísticas)
- **Por que:** ajuda a contextualizar quem é "gestor", quem é "parametrizador", quem é "aprovador" no nosso modelo

---

## Como pedir

Sugestão de mensagem para o contato:

> "Oi [nome]! Estamos avançando bem no protótipo do Desafio 05 e precisamos de
> alguns artefatos para deixar o sistema mais aderente ao contexto real de vocês.
> Mandei a lista priorizada em anexo. Os itens em vermelho são os mais críticos —
> sem eles a gente acaba inventando estrutura demais. Os outros são bem-vindos
> se vocês conseguirem. Todos podem ser anonimizados / com dados fictícios, só
> precisamos da estrutura. Pode ser?"

Anexar este arquivo ou um resumo dele.

---

## Plano B se não conseguirem entregar

Se nada vier, a gente segue com dados inventados — mas vale registrar essa decisão
para mencionar no pitch ("estrutura proposta baseada no que extraímos da live,
sujeita a refinamento com dados reais"). Isso protege contra críticas de
"isso não tem cara da minha planilha".
