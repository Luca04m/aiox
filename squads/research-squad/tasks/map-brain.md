---
task: Map Brain
responsavel: "@brain-mapper"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - raw_intel_path: Caminho para raw-intel.json da pessoa
  - application_context: Contexto de aplicação (ex: "negócios de bebidas premium")
Saida: |
  - core_beliefs: Crenças fundamentais da pessoa
  - decision_frameworks: Como ela toma decisões
  - mental_models: Modelos mentais identificados
  - recurring_themes: Temas recorrentes em todo o conteúdo
  - behavioral_patterns: Padrões de comportamento observáveis
  - brain_map_md: Arquivo brain-map.md completo
Checklist:
  - "[ ] Ler todo conteúdo coletado do raw-intel"
  - "[ ] Identificar crenças centrais (repetidas em múltiplas fontes)"
  - "[ ] Mapear como a pessoa toma decisões (processo, critérios)"
  - "[ ] Listar modelos mentais explícitos e implícitos"
  - "[ ] Identificar temas recorrentes (o que ela sempre volta a falar)"
  - "[ ] Mapear padrões de comportamento públicos"
  - "[ ] Para cada modelo: como aplicar no contexto do cliente"
  - "[ ] Identificar contradições ou evolução de pensamento"
  - "[ ] Gerar brain-map.md"
---

# map-brain

Reconstrói o modelo mental de uma pessoa a partir de todo seu conteúdo público. O resultado é aplicável — cada modelo vem com instruções de uso para o contexto do cliente.
