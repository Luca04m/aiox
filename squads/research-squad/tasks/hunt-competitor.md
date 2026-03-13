---
task: Hunt Competitor
responsavel: "@intelligence-hunter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - competitor_name: Nome da empresa alvo (obrigatório)
  - client_context_path: Caminho para contexto do cliente em cerebro/projetos (opcional)
  - depth: quick | deep | exhaustive (default: deep)
Saida: |
  - raw_intel: Objeto JSON com todos os dados coletados
  - sources: Lista de URLs com data de acesso
  - coverage_score: % de categorias cobertas (0-100)
Checklist:
  - "[ ] Coletar perfil geral da empresa (fundação, tamanho, funding, sede)"
  - "[ ] Mapear produtos e serviços com preços (se público)"
  - "[ ] Analisar posicionamento e messaging (site, taglines, about)"
  - "[ ] Varrer presença em redes sociais (LinkedIn, Instagram, X)"
  - "[ ] Coletar conteúdo recente (posts 90d, blog, newsletter)"
  - "[ ] Identificar pessoas-chave (CEO, cofundadores, heads visíveis)"
  - "[ ] Mapear stack tecnológico (via BuiltWith, job listings, GitHub)"
  - "[ ] Coletar reviews de clientes (G2, Trustpilot, App Store, etc.)"
  - "[ ] Buscar notícias e press dos últimos 12 meses"
  - "[ ] Identificar parceiros e integrações mencionadas"
  - "[ ] Salvar raw-intel.json com todas as fontes"
---

# hunt-competitor

Varredura completa e estruturada de empresa concorrente. Coleta tudo que é público — perfil, produtos, preços, posicionamento, pessoas, tech, social, reviews e imprensa.

## Uso

```
@intelligence-hunter
*hunt-competitor "Balena"
*hunt-competitor "Balena" --depth exhaustive
*hunt-competitor "Balena" --context /Volumes/KINGSTON/cerebro/projetos/mrlion
```

## Categorias de Coleta

| Categoria | Fontes Prioritárias | Tool |
|-----------|---------------------|------|
| Perfil da empresa | Site oficial, LinkedIn, Crunchbase | EXA, WebFetch |
| Produtos & Preços | Pricing page, features page | WebFetch |
| Posicionamento | Homepage, about, taglines, ads | WebFetch, EXA |
| Social | LinkedIn, Instagram, X, YouTube | Apify, TranscriptAPI |
| Conteúdo | Blog, newsletter, YouTube | EXA, TranscriptAPI |
| Pessoas-chave | LinkedIn, Twitter, press | Apify, EXA |
| Tech stack | BuiltWith, job posts, GitHub | EXA |
| Reviews | G2, Trustpilot, App Store | EXA, WebFetch |
| Imprensa | Google News, TechCrunch, etc. | EXA |
| Parcerias | Site, press releases | EXA |

## Níveis de Profundidade

| Depth | Tempo Est. | Cobertura |
|-------|-----------|-----------|
| `quick` | ~15min | Perfil + produtos + social básico |
| `deep` | ~45min | Todas as categorias principais |
| `exhaustive` | sem limite | Máximo possível, incluindo histórico |

## Output: raw-intel.json

```json
{
  "target": "Balena",
  "collected_at": "2026-03-12T00:00:00Z",
  "depth": "deep",
  "coverage_score": 87,
  "data": {
    "profile": { "founded": "...", "size": "...", "funding": "..." },
    "products": [{ "name": "...", "price": "...", "features": [] }],
    "positioning": { "tagline": "...", "icp": "...", "differentiators": [] },
    "social": { "linkedin_followers": 0, "posts_sample": [] },
    "content": { "blog_posts": [], "youtube_videos": [] },
    "key_people": [{ "name": "...", "role": "...", "linkedin": "..." }],
    "tech_stack": [],
    "reviews": { "avg_score": 0, "themes_positive": [], "themes_negative": [] },
    "news": [],
    "partnerships": []
  },
  "sources": [{ "url": "...", "accessed_at": "...", "category": "..." }]
}
```
