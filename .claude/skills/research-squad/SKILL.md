---
name: research-squad
description: "Use this skill for any research intelligence command: *research-competitor {name}, *clone-brain {person}, or *master-topic {topic}. Triggers on: competitor analysis, researching a company or brand, cloning someone's mental models, mastering a topic fast. Routes automatically to the correct research-squad workflow (competitor-intelligence-flow, person-brain-clone-flow, or topic-mastery-flow) and orchestrates the specialized agents: intelligence-hunter, context-analyst, brain-mapper, report-architect. Use when the user types *research-competitor, *clone-brain, or *master-topic with optional --context or --depth flags."
---

# research-squad — Orchestrador de Inteligência

Este skill ativa o **research-squad** e roteia para o workflow correto baseado no comando.

## Squad Base

- **Localização:** `/Volumes/KINGSTON/aiox/squads/research-squad/`
- **Workflows:** `squads/research-squad/workflows/`
- **Agentes:** `squads/research-squad/agents/`
- **Tasks:** `squads/research-squad/tasks/`

---

## Roteamento de Comandos

### Ao receber `*research-competitor {name} [--context {path}] [--depth quick|deep|exhaustive]`

Executar: `squads/research-squad/workflows/competitor-intelligence-flow.md`

**Sequência obrigatória:**

**PASSO 1 — Coleta (@intelligence-hunter / Hunt)**
Ler: `squads/research-squad/tasks/hunt-competitor.md`
- Buscar perfil da empresa (site, LinkedIn, Crunchbase) via EXA + WebFetch
- Mapear produtos, preços e features via WebFetch
- Coletar posicionamento: tagline, ICP, diferenciais (homepage, about)
- Varrer social: LinkedIn, Instagram, X, YouTube (Apify + TranscriptAPI)
- Coletar conteúdo recente 90 dias: blog, newsletter, YouTube
- Identificar pessoas-chave: CEO, cofundadores, heads (Apify + EXA)
- Mapear tech stack: BuiltWith, job listings, GitHub (EXA)
- Coletar reviews: G2, Trustpilot, App Store (EXA + WebFetch)
- Buscar notícias e press dos últimos 12 meses (EXA)
- Salvar como `raw-intel.json`

**PASSO 2 — Validar Fontes (@intelligence-hunter)**
Ler: `squads/research-squad/tasks/validate-sources.md`
- Verificar acessibilidade e credibilidade de cada fonte
- Marcar fontes duvidosas com flag `needs_review`

**PASSO 3 — Análise Cruzada (@context-analyst / Vex)**
Ler: `squads/research-squad/tasks/analyze-against-context.md`
- Se `--context` fornecido: ler arquivos do projeto em `{client_context_path}`
- Cruzar achados do concorrente com posicionamento real do cliente
- Identificar gaps, sobreposições e ameaças diretas
- Salvar como `analysis.md`

**PASSO 4 — SWOT (@context-analyst)**
Ler: `squads/research-squad/tasks/swot-analysis.md`
- Strengths/Weaknesses do concorrente vs cliente
- Opportunities/Threats para o cliente
- Adicionar seção SWOT no `analysis.md`

**PASSO 5 — Mapa de Oportunidades (@context-analyst)**
Ler: `squads/research-squad/tasks/opportunity-map.md`
- Priorizar oportunidades por impacto + facilidade de execução
- Adicionar seção de oportunidades priorizadas no `analysis.md`

**PASSO 6 — Relatório Executivo (@report-architect / Ray)**
Ler: `squads/research-squad/tasks/build-report.md`
- Montar `REPORT-{name}-{YYYYMMDD}.md` com estrutura padrão:
  - TL;DR (3 bullets)
  - Contexto (quem é o alvo)
  - Achados Principais (por categoria)
  - Análise Estratégica (SWOT + oportunidades)
  - Plano de Ação (tabela: prioridade | ação | prazo)
  - Fontes

**PASSO 7 — 1-Pager Executivo (@report-architect)**
Ler: `squads/research-squad/tasks/executive-summary.md`
- Resumir em `SUMMARY-{name}-{YYYYMMDD}.md` para decisão rápida

**Entregáveis gerados:**
- `raw-intel.json` — dados brutos
- `analysis.md` — análise estratégica com SWOT
- `REPORT-{name}-{YYYYMMDD}.md` — relatório completo
- `SUMMARY-{name}-{YYYYMMDD}.md` — 1-pager executivo

**Onde salvar:** Se `--context` fornecido → salvar em `{client_context_path}/research/`. Caso contrário → criar pasta `research/{name}-{YYYYMMDD}/` no diretório atual.

---

### Ao receber `*clone-brain {person} [--context {path}] [--focus {areas}]`

Executar: `squads/research-squad/workflows/person-brain-clone-flow.md`

**Sequência obrigatória:**

**PASSO 1 — Coleta (@intelligence-hunter / Hunt)**
Ler: `squads/research-squad/tasks/hunt-person.md`
- Varrer todo conteúdo público: YouTube, X/Twitter, LinkedIn, livros, podcasts (EXA + Apify + TranscriptAPI)
- Priorizar: entrevistas longas, threads, livros (alta densidade de modelos mentais)
- Salvar como `raw-intel.json`

**PASSO 2 — Auditoria de Conteúdo (@brain-mapper / Lex)**
Ler: `squads/research-squad/tasks/content-audit.md`
- Catalogar e priorizar por densidade de insight
- Identificar conteúdo mais citado / mais engajamento

**PASSO 3 — Mapeamento do Cérebro (@brain-mapper)**
Ler: `squads/research-squad/tasks/map-brain.md`
- Extrair: modelos mentais, crenças centrais, padrões de decisão
- Identificar evolução do pensamento ao longo do tempo
- Salvar como `brain-map.md`

**PASSO 4 — Extração de Frameworks (@brain-mapper)**
Ler: `squads/research-squad/tasks/extract-frameworks.md`
- Documentar frameworks aplicáveis com instruções de uso
- Se `--context` fornecido: mostrar como aplicar no contexto do cliente

**PASSO 5 — Relatório + 1-Pager (@report-architect / Ray)**
Ler: `squads/research-squad/tasks/build-report.md` + `squads/research-squad/tasks/executive-summary.md`
- `REPORT-{person}-{YYYYMMDD}.md` com frameworks completos
- `SUMMARY-{person}-{YYYYMMDD}.md` com top 3 insights + como aplicar agora

---

### Ao receber `*master-topic {topic} [--level beginner|intermediate|expert] [--time {duration}] [--context {path}]`

Executar: `squads/research-squad/workflows/topic-mastery-flow.md`

**Sequência obrigatória:**

**PASSO 1 — Curadoria (@intelligence-hunter / Hunt)**
Ler: `squads/research-squad/tasks/hunt-topic.md`
- Encontrar melhores recursos por categoria: livros, cursos, artigos, vídeos, experts
- Ranquear por qualidade + aplicabilidade ao nível solicitado
- Identificar key concepts e experts do tema

**PASSO 2 — Filtro por Contexto (@context-analyst / Vex)** _(somente se `--context` fornecido)_
Ler: `squads/research-squad/tasks/analyze-against-context.md`
- Filtrar recursos pela aplicabilidade ao negócio/projeto do cliente

**PASSO 3 — Guia de Domínio + 1-Pager (@report-architect / Ray)**
Ler: `squads/research-squad/tasks/build-report.md` + `squads/research-squad/tasks/executive-summary.md`
- `REPORT-{topic}-{YYYYMMDD}.md` com learning path completo
- `SUMMARY-{topic}-{YYYYMMDD}.md` com: "comece aqui" + o que estudar hoje

---

## Comportamento ao Ativar

1. **Identificar o comando** recebido nos argumentos (`*research-competitor`, `*clone-brain`, `*master-topic`)
2. **Extrair parâmetros**: nome/tópico, `--context`, `--depth`, `--level`, `--time`, `--focus`
3. **Anunciar o workflow** que será executado e os entregáveis esperados
4. **Executar os passos em sequência** — cada passo anuncia qual agente está executando (ex: `🕵️ Hunt coletando...`)
5. **Produzir e salvar todos os entregáveis** ao final de cada passo
6. **Resumo final**: listar todos os arquivos gerados com paths absolutos

## Flags Globais

| Flag | Valores | Default | Comportamento |
|------|---------|---------|---------------|
| `--depth` | `quick\|deep\|exhaustive` | `deep` | Controla profundidade da coleta |
| `--context` | path absoluto | — | Cruza análise com projeto real do cliente |
| `--level` | `beginner\|intermediate\|expert` | `intermediate` | Para *master-topic |
| `--time` | `"1 day"\|"3 days"\|etc` | `"1 day"` | Constraint de aprendizado |
| `--focus` | lista separada por vírgula | — | Áreas específicas (clone-brain) |

## Exemplo de Output no Terminal

```
🔬 research-squad ativado — workflow: competitor-intelligence-flow
Alvo: Balena | Profundidade: deep | Contexto: /Volumes/KINGSTON/cerebro/projetos/mr-lion

🕵️ Hunt [PASSO 1/7] — Coletando inteligência sobre "Balena"...
  ✓ Perfil da empresa
  ✓ Produtos & preços
  ✓ Posicionamento
  ...

🕵️ Hunt [PASSO 2/7] — Validando fontes...

🧠 Vex [PASSO 3/7] — Cruzando com contexto Mr. Lion...

🧠 Vex [PASSO 4/7] — Construindo SWOT...

🧠 Vex [PASSO 5/7] — Mapeando oportunidades...

📋 Ray [PASSO 6/7] — Montando relatório executivo...

📋 Ray [PASSO 7/7] — Escrevendo 1-pager...

✅ Entregáveis gerados em /Volumes/KINGSTON/cerebro/projetos/mr-lion/research/:
  - raw-intel.json
  - analysis.md
  - REPORT-Balena-20260312.md
  - SUMMARY-Balena-20260312.md
```
