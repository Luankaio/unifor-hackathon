# O-HACKA-TA-ON — Desafio 05
## Visibilidade e Governança no Planejamento Logístico | M. Dias Branco

---

### Problema em uma frase

O cérebro logístico da M. Dias Branco (sistema O9 DRP) depende de inputs manuais críticos que chegam de forma caótica, sem rastreabilidade e sem governança, gerando riscos operacionais crescentes.

---

### Navegação do repositório

| Pasta / Arquivo | Conteúdo |
|---|---|
| [`docs/desafio.md`](docs/desafio.md) | Descrição oficial do desafio + contexto do O9 DRP |
| [`docs/contexto-operacional.md`](docs/contexto-operacional.md) | Detalhes extraídos da live: papéis, fluxos, regras, ferramentas |
| [`docs/dores-e-gaps.md`](docs/dores-e-gaps.md) | Pontos de dor mapeados e lacunas do processo atual |
| [`solucao/`](solucao/) | Desenvolvimento da solução proposta (a construir) |

---

### TL;DR do contexto

- **Sistema central:** O9 DRP — calcula distribuição de produtos entre fábricas e CDs cruzando estoque, demanda e transporte
- **Quem alimenta:** 2 Parametrizadores (William + 1 analista) via inputs manuais
- **Como chegam as solicitações:** Teams, e-mail, reuniões — sem padrão
- **Risco imediato:** erro descoberto após 08h → corrige em 3-4h → perde o corte logístico de meio-dia
- **Risco futuro:** o volume de informações vai crescer drasticamente até 2027, tornando o modelo atual inviável
