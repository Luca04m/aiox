---
task: Validate Sources
responsavel: "@intelligence-hunter"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - sources_list: Lista de URLs coletadas
Saida: |
  - validated_sources: Fontes com score de credibilidade
  - flagged_sources: Fontes suspeitas ou desatualizadas
Checklist:
  - "[ ] Verificar se URLs ainda estão acessíveis"
  - "[ ] Verificar data de publicação/atualização"
  - "[ ] Avaliar credibilidade da fonte (domínio, autor)"
  - "[ ] Flaggar conteúdo com mais de 2 anos"
  - "[ ] Remover duplicatas"
---

# validate-sources

Garante que o raw-intel foi construído com fontes confiáveis e atuais antes de passar para análise.
