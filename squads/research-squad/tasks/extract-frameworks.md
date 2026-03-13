---
task: Extract Frameworks
responsavel: "@brain-mapper"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - brain_map_path: Caminho para brain-map.md
  - application_context: Contexto de aplicação específico
Saida: |
  - frameworks_list: Lista de frameworks com descrição
  - how_to_apply: Instruções de aplicação por framework
  - examples_real: Exemplos reais de uso pelo criador
Checklist:
  - "[ ] Identificar frameworks explícitos (os que a pessoa nomeia)"
  - "[ ] Identificar frameworks implícitos (os que ela usa sem nomear)"
  - "[ ] Para cada framework: descrição em 1 parágrafo"
  - "[ ] Para cada framework: exemplo de uso pelo criador"
  - "[ ] Para cada framework: como aplicar no contexto do cliente"
  - "[ ] Ranquear por aplicabilidade ao contexto"
---

# extract-frameworks

Extrai os frameworks e metodologias de uma pessoa e os torna aplicáveis. A diferença entre "conhecer" e "usar" o pensamento de alguém.
