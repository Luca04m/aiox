---
task: Content Audit
responsavel: "@brain-mapper"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - raw_intel_path: Caminho para raw-intel.json da pessoa
Saida: |
  - content_catalog: Catálogo completo por tipo e tema
  - top_pieces: Top 10 conteúdos mais impactantes
  - evolution_timeline: Como o pensamento evoluiu no tempo
Checklist:
  - "[ ] Catalogar todo conteúdo por tipo (livro, video, artigo, post)"
  - "[ ] Agrupar por tema/área"
  - "[ ] Identificar os 10 conteúdos mais citados/impactantes"
  - "[ ] Mapear evolução cronológica do pensamento"
  - "[ ] Identificar mudanças de posição ao longo do tempo"
---

# content-audit

Auditoria completa do conteúdo público de uma pessoa. Revela a evolução intelectual e identifica os conteúdos mais densos para priorizar no estudo.
