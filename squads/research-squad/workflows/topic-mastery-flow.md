---
workflow: topic-mastery-flow
squad: research-squad
trigger: "*master-topic {topic}"
description: Dominar qualquer tema em 1 dia com curadoria inteligente e learning path otimizado
estimated_time: "30-60min (pesquisa) + tempo de estudo"
---

# topic-mastery-flow

Não é sobre acumular conteúdo. É sobre encontrar o caminho mais curto entre zero e proficiente — com os melhores recursos, na ordem certa, aplicados ao seu contexto.

## Uso

```
*master-topic "precificação premium"
*master-topic "copywriting" --level expert --time "3 days"
*master-topic "branding pessoal" --context /Volumes/KINGSTON/cerebro/projetos/mrlion
```

## Steps

```
1. @intelligence-hunter → *hunt-topic {topic}
   Input: topic + level + time_constraint
   Output: recursos ranqueados + key concepts + experts

2. @context-analyst → *analyze-against-context (opcional)
   Se client_context fornecido: filtra o que é relevante para o cliente
   Output: recursos filtrados por aplicabilidade

3. @report-architect → *build-report --type topic
   Input: hunt output + analysis (se disponível)
   Output: REPORT-{topic}-{date}.md com learning path

4. @report-architect → *executive-summary
   Output: SUMMARY-{topic}-{date}.md
```

## Entregáveis Finais

| Arquivo | Descrição |
|---------|-----------|
| `REPORT-{topic}-{date}.md` | Guia completo: conceitos + experts + recursos + learning path |
| `SUMMARY-{topic}-{date}.md` | Começa aqui: top 3 recursos + o que estudar hoje |
