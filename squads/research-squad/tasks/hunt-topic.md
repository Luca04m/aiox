---
task: Hunt Topic
responsavel: "@intelligence-hunter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - topic: Tema a dominar (obrigatório)
  - target_level: beginner | intermediate | expert (default: intermediate)
  - time_constraint: Tempo disponível ex: "1 day", "1 week" (default: "1 day")
  - application_context: Contexto de aplicação opcional (ex: "para negócios de bebidas premium")
Saida: |
  - best_resources: Lista rankeada de recursos por qualidade
  - key_concepts: Conceitos fundamentais com definição
  - leading_experts: Principais especialistas e seus frameworks
  - learning_path: Sequência de estudo otimizada
  - practical_exercises: Exercícios práticos
Checklist:
  - "[ ] Identificar os 5 melhores livros sobre o tema"
  - "[ ] Identificar os 5 melhores criadores/canais YouTube"
  - "[ ] Encontrar os podcasts mais densos sobre o tema"
  - "[ ] Mapear os principais experts mundiais (2-5 nomes)"
  - "[ ] Extrair os conceitos-chave e definições mais aceitas"
  - "[ ] Identificar os frameworks mais aplicados"
  - "[ ] Listar erros comuns de iniciantes"
  - "[ ] Encontrar casos práticos e estudos de caso"
  - "[ ] Construir learning path otimizado para o tempo disponível"
  - "[ ] Priorizar recursos para o contexto de aplicação informado"
---

# hunt-topic

Curadoria inteligente de fontes para dominar um tema no menor tempo possível. Não entrega tudo — entrega o que realmente importa, na ordem certa.

## Uso

```
@intelligence-hunter
*hunt-topic "precificação premium"
*hunt-topic "sales funnel" --level expert --time "1 day"
*hunt-topic "branding pessoal" --context "para negócios de bebidas premium"
```

## Critérios de Qualidade dos Recursos

| Critério | Peso |
|----------|------|
| Densidade de insight por hora | 40% |
| Aplicabilidade prática | 30% |
| Reputação da fonte | 20% |
| Atualidade | 10% |

## Learning Path por Tempo Disponível

| Tempo | Estratégia |
|-------|-----------|
| 1 dia | 1 livro-resumo + 3 vídeos densos + 1 exercício prático |
| 3 dias | 2 livros + 5 vídeos + podcast + 2 exercícios |
| 1 semana | Imersão completa com deep dives |
