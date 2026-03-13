---
task: Hunt Person
responsavel: "@intelligence-hunter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - person_name: Nome completo da pessoa (obrigatório)
  - focus_areas: Áreas de foco opcionais (business | mindset | methodology | all)
  - depth: quick | deep | exhaustive (default: deep)
Saida: |
  - raw_intel: Objeto JSON com todo conteúdo público catalogado
  - content_catalog: Lista de todo conteúdo por tipo
  - sources: Lista de URLs com data de acesso
Checklist:
  - "[ ] Biografia e background (origem, educação, carreira)"
  - "[ ] Livros publicados (títulos, resumos, teses principais)"
  - "[ ] Canal YouTube (vídeos, títulos, temas recorrentes)"
  - "[ ] Podcasts como host e convidado (episódios, transcrições-chave)"
  - "[ ] Artigos e newsletters publicados"
  - "[ ] Twitter/X (threads, posts virais, posições)"
  - "[ ] LinkedIn (artigos, posts, atividade)"
  - "[ ] Instagram (conteúdo, estilo, mensagens)"
  - "[ ] Palestras e entrevistas (YouTube, conferências)"
  - "[ ] Frases e citações recorrentes"
  - "[ ] Network visível (colaboradores, menções frequentes)"
  - "[ ] Salvar raw-intel.json com todo conteúdo catalogado"
---

# hunt-person

Varredura completa de pessoa pública para construção de brain map. Coleta todo conteúdo publicado — livros, vídeos, podcasts, posts, artigos — pronto para @brain-mapper processar.

## Uso

```
@intelligence-hunter
*hunt-person "Dan Koe"
*hunt-person "Alex Hormozi" --focus-areas business,mindset
*hunt-person "Andrew Huberman" --depth exhaustive
```

## Categorias de Coleta

| Categoria | Fontes | Tool |
|-----------|--------|------|
| Biografia | Wikipedia, site pessoal, LinkedIn | WebFetch, EXA |
| Livros | Amazon, Goodreads, resumos | EXA, WebFetch |
| YouTube | Canal próprio, aparições | TranscriptAPI |
| Podcasts | Spotify, Apple, transcrições | TranscriptAPI, EXA |
| Artigos/Newsletter | Substack, Medium, site | WebFetch, EXA |
| Twitter/X | Posts, threads, posições | Apify |
| LinkedIn | Artigos, posts | Apify |
| Palestras | YouTube, conferências | TranscriptAPI |

## Output: raw-intel.json

```json
{
  "target": "Dan Koe",
  "collected_at": "2026-03-12T00:00:00Z",
  "data": {
    "biography": { "origin": "...", "education": "...", "career_path": "..." },
    "books": [{ "title": "...", "year": 0, "core_thesis": "..." }],
    "youtube": [{ "title": "...", "url": "...", "transcript_excerpt": "..." }],
    "podcasts": [{ "show": "...", "episode": "...", "key_insights": [] }],
    "articles": [],
    "twitter_threads": [{ "url": "...", "theme": "...", "content": "..." }],
    "quotes": [],
    "network": [{ "name": "...", "relationship": "..." }]
  },
  "sources": []
}
```
