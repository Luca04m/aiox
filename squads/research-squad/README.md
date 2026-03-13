# research-squad

Squad de inteligência e pesquisa focado em entregáveis práticos para clientes reais.

## O que este squad faz

Produz relatórios acionáveis sobre **competidores**, **pessoas** e **tópicos** — sempre cruzando com o contexto real do cliente.

## Casos de Uso

### 1. Pesquisa de Competidor
> "Quero saber tudo sobre a Balena e o que isso significa para o Mr. Lion"

```
*research-competitor "Balena" --context /Volumes/KINGSTON/cerebro/projetos/mrlion
```

### 2. Clonar o Cérebro de Alguém
> "Quero aprender a pensar como Dan Koe / Alex Hormozi / qualquer pessoa pública"

```
*clone-brain "Dan Koe"
```

### 3. Dominar um Tema em 1 Dia
> "Preciso me tornar bom em copywriting hoje"

```
*master-topic "copywriting" --time "1 day"
```

## Agentes

| Agente | Papel | Entregável |
|--------|-------|-----------|
| 🕵️ `intelligence-hunter` | Coleta tudo que é público | `raw-intel.json` |
| 🧠 `context-analyst` | Cruza com contexto do cliente | `analysis.md` |
| 🗺️ `brain-mapper` | Constrói mapa mental de pessoas | `brain-map.md` |
| 📋 `report-architect` | Monta relatório executivo final | `REPORT-*.md` |

## Workflows

| Workflow | Trigger | Tempo Est. |
|----------|---------|-----------|
| Competitor Intelligence | `*research-competitor {nome}` | 45-90min |
| Brain Clone | `*clone-brain {pessoa}` | 60-120min |
| Topic Mastery | `*master-topic {tema}` | 30-60min |

## Estrutura

```
research-squad/
├── squad.yaml
├── README.md
├── agents/
│   ├── intelligence-hunter.md
│   ├── context-analyst.md
│   ├── brain-mapper.md
│   └── report-architect.md
├── tasks/
│   ├── hunt-competitor.md
│   ├── hunt-person.md
│   ├── hunt-topic.md
│   ├── validate-sources.md
│   ├── analyze-against-context.md
│   ├── swot-analysis.md
│   ├── opportunity-map.md
│   ├── map-brain.md
│   ├── extract-frameworks.md
│   ├── content-audit.md
│   ├── build-report.md
│   └── executive-summary.md
└── workflows/
    ├── competitor-intelligence-flow.md
    ├── person-brain-clone-flow.md
    └── topic-mastery-flow.md
```

## Configuração

O squad lê contexto do cliente em `/Volumes/KINGSTON/cerebro/projetos/`.
Passe `--context {path}` para qualquer workflow para cruzar com a realidade do seu negócio.
