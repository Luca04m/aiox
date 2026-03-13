---
task: Executive Summary
responsavel: "@report-architect"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - report_path: Caminho para o relatório completo
Saida: |
  - one_pager_path: Caminho para SUMMARY-{target}-{date}.md
  - top_3_insights: Os 3 insights que mudam algo
  - immediate_next_steps: O que fazer nas próximas 48h
Checklist:
  - "[ ] Ler relatório completo"
  - "[ ] Selecionar os 3 insights que mais impactam o cliente"
  - "[ ] Escrever cada insight em 1-2 frases (sem contexto, só o ponto)"
  - "[ ] Listar 3 ações para as próximas 48 horas"
  - "[ ] Verificar: cabe em 1 página impressa"
  - "[ ] Salvar como SUMMARY-{target}-{YYYYMMDD}.md"
---

# executive-summary

1 página. 3 insights. 3 ações. O cliente lê em 3 minutos e sabe o que fazer hoje.

## Formato

```markdown
# {Alvo} — Resumo Executivo ({Data})

## Os 3 insights que importam
1. **{Insight 1}** — {1-2 frases}
2. **{Insight 2}** — {1-2 frases}
3. **{Insight 3}** — {1-2 frases}

## O que fazer nas próximas 48h
- [ ] {Ação concreta 1}
- [ ] {Ação concreta 2}
- [ ] {Ação concreta 3}

---
*Relatório completo: REPORT-{target}-{date}.md*
```
