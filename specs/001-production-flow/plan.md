# Implementation Plan: Production Flow

**Feature**: Production Flow
**Status**: Draft
**Created**: 2026-09-09

## Objetivo

Implementar um MVP web responsivo de gestão de produção audiovisual com foco em centralização da informação, acompanhamento de objetivos por área, supervisão, colaboração em tempo real e organização visual aderente ao Design System GOV.BR (DSGOV).

## Arquitetura proposta

### Stack

- Frontend web responsivo: React
- Mobile nativo: fora do MVP; evolução futura com React Native
- Backend/API: Node.js + TypeScript + Express ou Next.js API routes
- Banco de dados: PostgreSQL
- Autenticação do MVP: Google SSO
- Sincronização em tempo real: WebSockets ou Supabase realtime
- Persistência local mobile: fora do MVP
- Estado global: React Query + Zustand ou Redux Toolkit
- UX/UI: Design System GOV.BR com componentes, fundamentos visuais, tokens oficiais, acessibilidade e padrões de interação DSGOV

### Estrutura de pastas

```text
production-flow/
├── apps/
│   ├── web/
│   └── mobile/            # futuro, fora do MVP
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

- Login com Google SSO no web responsivo
- Apple ID e app mobile nativo fora do MVP
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
- Indicadores visuais de responsável, usuários ativos e progresso
- Ícones para pessoas trabalhando no item
- Atualização do percentual da área por objetivos concluídos sobre total de objetivos da área

### 4. Objetivos e contexto

- Cada objetivo é uma tarefa simples com resumo, próximos passos e contexto do diretor
- Links e documentos anexados por objetivo
- Comentários, sugestões e histórico
- Documentos e links acessíveis sempre que o objetivo estiver visível para o usuário

### 5. Supervisão

- Visão do diretor e assistente de direção
- Progresso por área
- Acesso a materiais de todos os objetivos visíveis para supervisão
- Acompanhamento de riscos e pendências

### 6. Colaboração em tempo real

- Auto-save
- Sincronização de status e comentários em fluxo compartilhado
- Responsáveis visíveis em item em andamento
- Last write wins para edições simultâneas no MVP
- Comentários e atualização centralizada, com histórico auditável

## Design system GOV.BR

### Diretrizes obrigatórias

- O MVP deve usar DSGOV como fonte primária de componentes, fundamentos visuais, tokens oficiais e padrões de interação.
- Customizações visuais não devem substituir padrões oficiais quando houver componente ou token DSGOV equivalente.
- A interface deve cumprir acessibilidade aplicável: operação por teclado, foco visível, nomes acessíveis, progresso anunciado para tecnologias assistivas, status não dependente apenas de cor e contraste WCAG AA/eMAG quando aplicável.
- O fluxo de desenvolvimento deve priorizar `@govbr-ds/core` via npm em implementação real; CDN é aceitável apenas para protótipo estático.

### Componentes-chave

- Navegação por área em padrão DSGOV, preferencialmente horizontal ou responsiva conforme densidade da tela
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
9. O sistema preserva as mesmas regras funcionais em desktop, tablet e navegador mobile

## Critérios de aceitação de arquitetura

- A experiência em desktop, tablet e navegador mobile preserva lógica e fluxo
- O backend mantém uma única fonte de verdade para objetos de produção
- As permissões são tratadas no backend e refletidas na UI
- O auto-save, last write wins e a sincronização em tempo real são avaliados como requisitos do MVP
- O design prioriza aderência DSGOV, legibilidade, clareza e produtividade da equipe de produção

## Riscos e mitigação

### Risco: sobreposição de papéis e permissões
Mitigação: definir autorização por papel e nível de acesso e validar regras no backend.

### Risco: excesso de informação na interface
Mitigação: priorizar visão por área e contexto do item em vez de painel genérico.

### Risco: conflito de edição simultânea
Mitigação: usar last write wins no MVP, histórico de alterações e sincronização por evento com indicadores de usuário ativo.

### Risco: baixa adoção por equipe de produção
Mitigação: manter interface simples, aderente ao DSGOV e com objetivos claros por área.

### Risco: desalinhamento com acessibilidade e DSGOV
Mitigação: validar componentes com critérios DSGOV, operação por teclado, nomes acessíveis, foco visível, contraste e responsividade.

## Plano de implementação por fases

### Fase 1 - Base e autenticação

- Estrutura do monorepo
- Configuração do backend e banco
- Auth por Google SSO
- Modelos iniciais de usuário, papel e área

### Fase 2 - Dashboard e objetivos

- Criação de dashboard principal
- Checklist por área
- Detalhes do objetivo
- Definição de status e responsável

### Fase 3 - Colaboração e supervisão

- Comentários
- Visão de supervisão
- Acesso a documentos conforme visibilidade do objetivo
- Indicadores de progresso geral

### Fase 4 - Ajustes de UX e sincronização

- Auto-save
- Sincronização em tempo real
- Conformidade DSGOV
- Testes de acessibilidade, usabilidade, responsividade e regressão

## Critérios de pronto do MVP

- Login funcional com SSO
- Perfil com papel e áreas
- Checklist por área com progresso calculado por objetivos concluídos
- Objetivo com contexto e documentos
- Comentários e colaboração
- Visão de supervisão para liderança
- Fluxo consistente em desktop, tablet e navegador mobile
- Interface aderente ao DSGOV e acessível por teclado

## Observações

Este plano serve como base para o desenvolvimento do MVP e deve ser refinado em tarefas específicas após a revisão do escopo e da arquitetura final.
