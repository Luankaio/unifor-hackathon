# Desafio 05 — Descrição Oficial

**Hackathon:** O-HACKA-TA-ON (M. Dias Branco)
**Tema:** Visibilidade e Governança no Planejamento Logístico

---

## Contexto

O desafio está conectado ao fluxo de informações e necessidades de novos cadastros ou ajustes dos dados de entradas manuais do sistema **APS O9 de DRP**.

O O9 DRP é um sistema avançado de planejamento que ajuda a M. Dias Branco a decidir como distribuir produtos entre fábricas, centros de distribuição e clientes. Ele cruza informações como demanda, estoques, produção, transporte e prazos para calcular automaticamente as necessidades da operação.

Manter os dados de entrada atualizados é fundamental: informações incorretas ou obsoletas (estoque, lead time, previsão de demanda) geram planejamentos errados, com impactos em toda a cadeia — falta de produto, excesso de estoque ou atrasos nas entregas.

---

## Desenho inicial do sistema

```
DADOS DE ENTRADA  →  PROCESSAMENTO (Sistema O9)  →  DADOS DE SAÍDA
```

---

## Dados de Entrada — Tipos e Responsáveis

**Função responsável:** Parametrizadores (mantêm os dados de entrada sempre atualizados)

Tipos de dados que precisam ser mantidos manualmente:

1. **Malhas** — rotas ou trechos logísticos (origem x destino)
2. **Política** — políticas de estoque específicas
3. **Feriados dos CDs** — calendário de operação dos centros de distribuição
4. **Capacidade dos CDs** — volume operacional de cada CD

As solicitações de atualização chegam aos parametrizadores por **chats, grupos, ligações, reuniões e e-mails, sem padrão definido**.

---

## A Dor Central

Como a função é compartilhada por mais de um colaborador, eles precisam coordenar entre si quais solicitações cada um vai atender.

Além disso, os líderes e planejadores do S&OE precisam saber:
- Quais alterações foram feitas (ou não)
- Se a alteração foi executada com sucesso
- Quem é responsável por cada cadastro/ajuste
- Quando a alteração ocorreu

**Hoje tudo isso acontece via mensagens e chamadas — sem registro formal.**

Há ainda uma terceira pessoa (Operações Logísticas) que altera informações de feriados e inventários **diretamente no O9**, sem notificar o time de S&OE, que perde completamente a visibilidade dessas mudanças.

### Problema de distribuição de carga

No modelo atual, um parametrizador pode receber 30 solicitações no dia enquanto o outro fica ocioso — não há mecanismo de distribuição equilibrada.

### Escalabilidade

O sistema O9 faz parte de um projeto maior da M. Dias Branco com escopo previsto para crescer significativamente até **2027**. O volume de informações e comunicações vai aumentar consideravelmente, tornando o cenário atual inviável.

---

## Objetivo do Desafio

Criar uma solução que:

1. **Organize** o fluxo de solicitações de atualização de dados
2. **Automatize** parte desse fluxo
3. **Aumente a rastreabilidade** — quem pediu, quando, o que, por que, quem executou
4. **Melhore a colaboração** entre as equipes (Parametrizadores, S&OE, Operações Logísticas)
5. **Aumente a confiabilidade** das informações utilizadas pelo O9
