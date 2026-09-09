# Implementation Plan: Production Flow

**Feature**: Production Flow
**Status**: Draft
**Created**: 2026-09-09

## Objetivo

Implementar um MVP web/mobile de gestão de produção audiovisual com foco em centralização da informação, acompanhamento de objetivos por área, supervisão, colaboração em tempo real e organização visual limpa.

## Arquitetura proposta

### Stack

- Frontend web: React
- Mobile: React Native
- Backend/API: Node.js + TypeScript + Express ou Next.js API routes
- Banco de dados: PostgreSQL
- Autenticação: SSO com Google e Apple ID
- Sincronização em tempo real: WebSockets ou Supabase realtime
- Persistência local mobile: AsyncStorage ou equivalente
- Estado global: React Query + Zustand ou Redux Toolkit
- UX/UI: design system com tokens de cor pastéis e componentes reutilizáveis

### Estrutura de pastas

```text
production-flow/
├── apps/
│   ├── web/
│   └── mobile/
├── packages/
│   ├── ui/
│   ├── shared/
│   └── types/
├── services/
│   └── api/
├── prisma/
│   └── schema.prisma
├── docs/
└── README.md
```

## Requisitos principais

### 1. Autenticação e perfil

- Login com SSO do Google no web
- Login com Google ou Apple no mobile
- Cadastro de nome e papel
- Associação de áreas de atuação
- Exibição de contexto relevante por papel

### 2. Painel principal e centralização

- Dashboard com visão geral da produção
- Organização por área, etapa, cena e cronograma
- Resumo de objetivos e pendências
- Acesso rápido aos itens em execução e concluídos

### 3. Checklists por área

- Estado: pendente, em andamento e concluído
- Indicadores visuais de responsável e progresso
- Ícones para pessoas trabalhando no item
- Atualização do percentual da área

### 4. Objetivos e contexto

- Cada item possui resumo, objetivos e contexto do diretor
- Links e documentos anexados por objetivo
- Comentários, sugestões e histórico
- Liberação de documentos conforme status e permissão

### 5. Supervisão

- Visão do diretor e assistente de direção
- Progresso por área
- Acesso supervisionado a materiais quando concluídos
- Acompanhamento de riscos e pendências

### 6. Colaboração em tempo real

- Auto-save
- Sincronização de alterações em fluxo compartilhado
- Responsáveis visíveis em item em andamento
- Comentários e atualização centralizada

## Design system

### Paleta recomendada

- Branco principal
- Tons pastéis: azul suave, lilás suave, rosa claro, verde menta, amarelo pêssego
- Contraste moderado para legibilidade
- Acentos discretos para estados de progresso

### Componentes-chave

- Sidebar de navegação por área
- Cards de objetivos com status visual
- Checklist horizontal/vertical
- Modal de detalhe do objetivo
- Badges de responsável e progresso
- Tabela ou painel resumido por departamento

## Fluxo de usuário

1. Usuário faz login
2. Seleciona papel/áreas
3. Acessa dashboard principal
4. Navega entre objetivos por área
5. Abre item e consulta contexto, links, comentários e responsáveis
6. Atualiza status para em andamento ou concluído
7. O progresso da área e da produção é recalculado automaticamente
8. Diretoria acompanha visão de supervisão e intervenções necessárias

## Critérios de aceitação de arquitetura

- A experiência da web e mobile são consistentes em lógica e fluxo
- O backend mantém uma única fonte de verdade para objetos de produção
- As permissões são tratadas no backend e refletidas na UI
- O auto-save e a sincronização em tempo real são avaliados como requisitos do MVP
- O design prioriza legibilidade, clareza e produtividade da equipe de produção

## Riscos e mitigação

### Risco: sobreposição de papéis e permissões
Mitigação: definir autorização por papel e nível de acesso e validar regras no backend.

### Risco: excesso de informação na interface
Mitigação: priorizar visão por área e contexto do item em vez de painel genérico.

### Risco: conflito de edição simultânea
Mitigação: usar revisão de concorrência e sincronização por evento com indicadores de responsável.

### Risco: baixa adoção por equipe de produção
Mitigação: manter interface simples, visual minimalista e objetivos claros por área.

## Plano de implementação por fases

### Fase 1 - Base e autenticação

- Estrutura do monorepo
- Configuração do backend e banco
- Auth por SSO
- Modelos iniciais de usuário, papel e área

### Fase 2 - Dashboard e objetivos

- Criação de dashboard principal
- Checklist por área
- Detalhes do objetivo
- Definição de status e responsável

### Fase 3 - Colaboração e supervisão

- Comentários
- Visão de supervisão
- Restrição de documentos por permissão
- Indicadores de progresso geral

### Fase 4 - Ajustes de UX e sincronização

- Auto-save
- Sincronização em tempo real
- Refinamento visual
- Testes de usabilidade e regressão

## Critérios de pronto do MVP

- Login funcional com SSO
- Perfil com papel e áreas
- Checklist por área com progresso real
- Objetivo com contexto e documentos
- Comentários e colaboração
- Visão de supervisão para liderança
- Fluxo consistente em web e mobile

## Observações

Este plano serve como base para o desenvolvimento do MVP e deve ser refinado em tarefas específicas após a revisão do escopo e da arquitetura final.
