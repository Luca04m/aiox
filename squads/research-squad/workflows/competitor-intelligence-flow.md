---
workflow: competitor-intelligence-flow
squad: research-squad
trigger: "*research-competitor {name} --context {client_path}"
description: Pesquisa completa de concorrente com insights para o cliente
estimated_time: "45-90min"
---

# competitor-intelligence-flow

Pesquisa end-to-end de concorrente. Da varredura bruta ao relatório executivo acionável.

## Uso

```
*research-competitor "Balena" --context /Volumes/KINGSTON/cerebro/projetos/mrlion
*research-competitor "Concorrente X" --depth quick
```

## Steps

```
1. @intelligence-hunter → *hunt-competitor {name}
   Output: raw-intel.json

2. @intelligence-hunter → *validate-sources
   Output: raw-intel.json (validado)

3. @context-analyst → *analyze-against-context
   Input: raw-intel.json + client_context_path
   Output: analysis.md

4. @context-analyst → *swot-analysis
   Input: analysis.md
   Output: swot seção no analysis.md

5. @context-analyst → *opportunity-map
   Input: analysis.md
   Output: oportunidades priorizadas

6. @report-architect → *build-report --type competitor
   Input: raw-intel.json + analysis.md + client_context
   Output: REPORT-{name}-{date}.md

7. @report-architect → *executive-summary
   Input: REPORT-{name}-{date}.md
   Output: SUMMARY-{name}-{date}.md
```

## Entregáveis Finais

| Arquivo | Descrição | Audiência |
|---------|-----------|-----------|
| `raw-intel.json` | Dados brutos completos | Arquivo |
| `analysis.md` | Análise estratégica | Interno |
| `REPORT-{name}-{date}.md` | Relatório completo | Cliente |
| `SUMMARY-{name}-{date}.md` | 1-pager executivo | Cliente (decisão) |
