---
task: SWOT Analysis
responsavel: "@context-analyst"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - analysis_path: Caminho para analysis.md gerado
  - client_context_path: Contexto do cliente
Saida: |
  - swot_md: SWOT completo com evidências
  - strategic_implications: O que fazer com cada quadrante
Checklist:
  - "[ ] Forças do cliente (evidências concretas)"
  - "[ ] Fraquezas do cliente (honesto, sem suavizar)"
  - "[ ] Oportunidades externas (baseadas na intel do alvo)"
  - "[ ] Ameaças externas (baseadas na intel do alvo)"
  - "[ ] Para cada quadrante: implicação estratégica"
  - "[ ] Priorizar os 3 itens mais críticos de cada quadrante"
---

# swot-analysis

SWOT estruturado do cliente em relação ao alvo pesquisado. Com evidências reais, não achismos.
