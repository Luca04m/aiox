# Stories — Controle de Estoque Mr. Lion

## Fase 1 — Quick Wins (impacto imediato)

| Story | Título | Status | Estimativa |
|-------|--------|--------|-----------|
| [1.1](./1.1.dashboard-melhorias-kpis-criticos.md) | Dashboard: KPIs Comparativos e Críticos Priorizados | Draft | ~9h |
| [1.2](./1.2.empty-states-ux-polish.md) | Empty States & UX Polish | Draft | ~4h |
| [1.3](./1.3.entrada-em-lote.md) | Entrada em Lote — Múltiplos Produtos | Draft | ~8h |
| [1.4](./1.4.pedidos-numero-copiavel-whatsapp.md) | Pedidos: Número Copiável + WhatsApp | Draft | ~4h |
| [1.5](./1.5.relatorios-resumo-por-tipo-categoria.md) | Relatórios: Resumo por Tipo e Categoria | Draft | ~5h |
| [1.6](./1.6.mobile-cards-colapsiveis.md) | Mobile: Cards Colapsáveis | Draft | ~6h |

**Total Fase 1:** ~36h de dev

---

## Fase 2 — Core Features (funcionalidades críticas)

| Story | Título | Status | Estimativa |
|-------|--------|--------|-----------|
| [2.1](./2.1.inventario-fisico-contagem-reconciliacao.md) | Inventário Físico: Contagem e Reconciliação | Draft | ~10h |
| [2.2](./2.2.historico-inline-produto.md) | Histórico Inline: Drawer por Produto | Draft | ~8h |
| [2.3](./2.3.cancelamento-pedido-restock.md) | Cancelamento de Pedido com Restock | Draft | ~6h |
| [2.4](./2.4.notificacoes-push-estoque-critico.md) | Notificações Push: Estoque Crítico | Draft | ~8h |
| [2.5](./2.5.relatorio-de-perdas.md) | Relatório de Perdas Dedicado | Draft | ~7h |
| [2.6](./2.6.relatorio-pdf-export.md) | Export PDF Profissional | Draft | ~8h |
| [2.7](./2.7.filtro-por-usuario.md) | Filtro por Usuário em Relatórios | Draft | ~5h |
| [2.8](./2.8.entrada-com-nf-fornecedor.md) | Entrada com NF e Fornecedor | Draft | ~6h |

**Total Fase 2:** ~58h de dev

---

## Sequência Recomendada de Execução

```
1.2 → 1.1 → 1.3 → 1.4 → 1.5 → 1.6   (Fase 1 — sem dependências entre si)
2.1 → 2.3 → 2.7 → 2.5 → 2.2 → 2.8 → 2.4 → 2.6   (Fase 2 — leve dependência de dados)
```

**Dependências importantes:**
- Story 2.6 (PDF) depende da Story 1.5 (resumo estatístico) — fazer depois
- Story 2.7 (filtro usuário) beneficia Story 2.5 (perdas) — fazer antes
- Story 2.4 (push) independente — pode ser paralela

---

## Como Executar

```
@dev *task {story-id}   # Ex: @dev *task 1.2
```

Ou abrir a story diretamente e seguir os Tasks/Subtasks na ordem.
