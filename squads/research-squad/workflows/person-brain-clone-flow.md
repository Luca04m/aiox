---
workflow: person-brain-clone-flow
squad: research-squad
trigger: "*clone-brain {person_name}"
description: Clona o cérebro de uma pessoa pública — modelos mentais, frameworks e como aplicar
estimated_time: "60-120min"
---

# person-brain-clone-flow

Varra tudo que uma pessoa publicou e transforme em um manual do jeito que ela pensa, decide e opera — aplicável ao seu contexto.

## Uso

```
*clone-brain "Dan Koe"
*clone-brain "Alex Hormozi" --context /Volumes/KINGSTON/cerebro/projetos/mrlion
*clone-brain "Andrew Huberman" --focus mindset,methodology
```

## Steps

```
1. @intelligence-hunter → *hunt-person {name}
   Output: raw-intel.json (todo conteúdo público)

2. @brain-mapper → *content-audit
   Input: raw-intel.json
   Output: catálogo priorizado de conteúdo

3. @brain-mapper → *map-brain
   Input: raw-intel.json + content audit
   Output: brain-map.md (modelos mentais, padrões, crenças)

4. @brain-mapper → *extract-frameworks
   Input: brain-map.md
   Output: frameworks aplicáveis com instruções de uso

5. @report-architect → *build-report --type person
   Input: raw-intel.json + brain-map.md
   Output: REPORT-{name}-{date}.md

6. @report-architect → *executive-summary
   Output: SUMMARY-{name}-{date}.md
```

## Entregáveis Finais

| Arquivo | Descrição |
|---------|-----------|
| `brain-map.md` | Mapa mental completo da pessoa |
| `REPORT-{name}-{date}.md` | Relatório completo com frameworks aplicáveis |
| `SUMMARY-{name}-{date}.md` | Top 3 insights + como aplicar agora |
