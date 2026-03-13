---
task: Opportunity Map
responsavel: "@context-analyst"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - analysis_path: Caminho para analysis.md
  - client_goals: Objetivos do cliente (opcional)
Saida: |
  - opportunities_ranked: Lista priorizada por impacto x esforço
  - quick_wins: O que pode ser feito esta semana
  - long_term_plays: Movimentos de médio/longo prazo
Checklist:
  - "[ ] Listar todas as oportunidades identificadas"
  - "[ ] Pontuar cada uma (impacto 1-5, esforço 1-5)"
  - "[ ] Separar quick wins (alta impact, baixo esforço)"
  - "[ ] Separar long term plays (alto impacto, alto esforço)"
  - "[ ] Descartar baixo impacto"
  - "[ ] Para cada quick win: sugerir próximo passo concreto"
---

# opportunity-map

Transforma a análise em prioridades claras. O cliente sai sabendo exatamente o que fazer primeiro.
