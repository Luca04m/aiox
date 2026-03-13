---
task: Build Report
responsavel: "@report-architect"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - report_type: competitor | person | topic (obrigatório)
  - raw_intel_path: Caminho para raw-intel.json
  - analysis_path: Caminho para analysis.md (se disponível)
  - client_context_path: Caminho para contexto do cliente
  - target_name: Nome do alvo para o título
Saida: |
  - report_path: Caminho para REPORT-{target}-{date}.md
  - key_findings: 5-7 achados principais
  - action_items: Lista priorizada de ações
Checklist:
  - "[ ] Ler todos os inputs disponíveis"
  - "[ ] Escrever TL;DR (máx 3 bullets)"
  - "[ ] Seção de contexto (quem é o alvo, por que pesquisamos)"
  - "[ ] Seção de achados principais (específica por tipo)"
  - "[ ] Seção de análise estratégica (com SWOT se disponível)"
  - "[ ] Plano de ação priorizado (impacto x esforço)"
  - "[ ] Lista de fontes verificadas"
  - "[ ] Revisar: zero jargão, zero fluff"
  - "[ ] Salvar como REPORT-{target}-{YYYYMMDD}.md"
---

# build-report

Monta o relatório executivo final. O produto que o cliente vai ler, guardar e usar para tomar decisões.

## Estrutura por Tipo

### competitor
- TL;DR → Quem são → Produtos & Preços → Posicionamento → Pessoas-chave → Social & Conteúdo → Análise vs Cliente → Plano de Ação

### person
- TL;DR → Quem é → Mental Models → Frameworks Aplicáveis → Conteúdo Prioritário → Como Aplicar

### topic
- TL;DR → Conceitos Fundamentais → Experts de Referência → Learning Path → Recursos Ranqueados → Exercícios Práticos

## Regras de Escrita

- Parágrafos máx 3 linhas
- Listas > parágrafos para achados
- Negrito apenas no que o cliente precisa agir
- Plano de ação em tabela: Ação | Impacto | Prazo | Quem
