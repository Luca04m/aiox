---
task: Analyze Against Client Context
responsavel: "@context-analyst"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - raw_intel_path: Caminho para raw-intel.json do alvo
  - client_context_path: Caminho para contexto do cliente em cerebro/projetos
Saida: |
  - relevance_map: O que do alvo é relevante para o cliente
  - competitive_gaps: Onde o cliente está atrás
  - client_advantages: Onde o cliente está à frente
  - threats: Ameaças reais identificadas
  - analysis_md: Arquivo analysis.md completo
Checklist:
  - "[ ] Ler e compreender contexto do cliente (cerebro/projetos)"
  - "[ ] Cruzar produtos/serviços do alvo com o do cliente"
  - "[ ] Identificar gaps de funcionalidade/oferta"
  - "[ ] Identificar vantagens do cliente não exploradas"
  - "[ ] Mapear ameaças reais com evidências"
  - "[ ] Identificar diferenciais do alvo que o cliente pode replicar"
  - "[ ] Listar oportunidades com nível de esforço e impacto"
  - "[ ] Gerar analysis.md estruturado"
---

# analyze-against-context

Cruza a inteligência coletada sobre o alvo com a realidade do cliente. Nunca analisa no vácuo — o contexto do cliente é o ponto de referência de tudo.

## Uso

```
@context-analyst
*analyze-against-context --intel ./raw-intel.json --context /Volumes/KINGSTON/cerebro/projetos/mrlion
```

## Estrutura do analysis.md

```markdown
# Análise: {Alvo} vs {Cliente} — {Data}

## O que o alvo tem que o cliente não tem
(gaps com prioridade: alta | média | baixa)

## O que o cliente tem que o alvo não tem
(vantagens competitivas não exploradas)

## Ameaças diretas
(evidências concretas)

## Oportunidades identificadas
| Oportunidade | Impacto | Esforço | Prazo Sugerido |

## Similaridades (benchmarking)
(onde aprender com o alvo)
```
