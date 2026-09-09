# Implementation Plan: Production Flow

**Branch**: `001-production-flow` | **Date**: 2026-09-09 | **Spec**: [spec.md](spec.md)

**Status**: Ready

## Summary

Implementar um MVP web responsivo para centralizar a pré-produção audiovisual em um quadro Kanban por área, com abas de Objetivos e Resumo, autorização por papel e área, criação de objetivos por Diretor/AD, colaboração em objetivos compartilhados, documentos, comentários, histórico, auto-save e sincronização em tempo real. O protótipo em `prototipo/` é a referência de interação; arrays locais, troca manual de usuário, CDN e IDs gerados no navegador não fazem parte da arquitetura de produção.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 22 LTS, React 19  
**Primary Dependencies**: React, Vite, TanStack Query, Zustand, `@govbr-ds/core`, Fastify, Prisma, Socket.IO, Zod  
**Storage**: PostgreSQL 16; arquivos externos representados por metadados e URL no MVP  
**Authentication**: Google OAuth 2.0/OIDC, sessão em cookie `HttpOnly`, `Secure` e `SameSite=Lax`  
**Testing**: Vitest, React Testing Library, testes de integração da API, Playwright e `@axe-core/playwright`  
**Target Platform**: Navegadores evergreen em desktop, tablet e mobile  
**Project Type**: Aplicação web com frontend e API separados em monorepo  
**Performance Goals**: dashboard interativo em até 2 s após sessão validada; mutações comuns confirmadas em até 500 ms p95 na rede de referência; eventos em tempo real percebidos em até 1 s  
**Constraints**: WCAG AA/eMAG aplicável, DSGOV como base visual, autorização sempre no servidor, sem escrita offline, somente três status no MVP  
**Scale/Scope**: múltiplas produções, dezenas de áreas e centenas de objetivos por produção; paginação e agregação executadas no backend

## Constitution Check

*GATE: aprovado antes do design e reavaliado após as decisões abaixo.*

- **Centralização**: PostgreSQL e API são a fonte oficial de objetivos, decisões, responsáveis, documentos e progresso.
- **Papéis e permissões**: autorização é avaliada no backend; esconder controles na UI não concede segurança.
- **Checklist e progresso**: objetivo usa apenas `pending`, `in_progress` e `complete`; progresso existe somente como agregado de concluídos sobre total.
- **Contexto e colaboração**: detalhe mantém resumo, visão do diretor, responsável, documentos, comentários e histórico próximos ao objetivo.
- **Experiência e DSGOV**: componentes, tokens, foco, contraste e semântica seguem DSGOV; a composição Kanban é a experiência operacional aprovada e não usa a wordmark gov.br.
- **Escopo MVP**: React Native, Apple ID, push notifications, exclusão/reabertura e resolução avançada de conflitos permanecem fora do MVP.

Não há violações constitucionais que exijam justificativa de complexidade.

## Project Structure

### Documentation

```text
specs/001-production-flow/
├── spec.md
├── plan.md
├── sdd-ears.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── openapi.yaml
│   └── realtime-events.md
└── tasks.md
```

### Source Code

```text
apps/
└── web/
    ├── src/
    │   ├── app/
    │   ├── features/auth/
    │   ├── features/dashboard/
    │   ├── features/objectives/
    │   ├── features/profile/
    │   ├── features/summary/
    │   ├── lib/
    │   └── styles/
    └── tests/

services/
└── api/
    ├── src/
    │   ├── modules/auth/
    │   ├── modules/areas/
    │   ├── modules/objectives/
    │   ├── modules/comments/
    │   ├── modules/documents/
    │   ├── modules/history/
    │   ├── modules/realtime/
    │   └── plugins/
    └── tests/

packages/
├── ui/
├── types/
└── shared/

prisma/
├── schema.prisma
├── migrations/
└── seed.ts
```

**Structure Decision**: pnpm workspaces com frontend, API e pacotes compartilhados. React Native não recebe pasta no MVP para evitar estrutura ociosa; tipos e regras independentes de plataforma ficam em `packages/`.

## Architecture

### Frontend

- React Router organiza autenticação, onboarding e dashboard.
- TanStack Query mantém estado remoto, invalidação e mutações otimistas controladas.
- Zustand fica restrito a estado efêmero de interface e presença; dados persistentes não são duplicados nele.
- `@govbr-ds/core` é instalado via npm. Componentes React finos encapsulam marcação e tokens DSGOV usados pelo produto.
- O dashboard possui abas acessíveis `Objetivos` e `Resumo`; Objetivos é a aba inicial.
- Objetivos usa Kanban horizontal com uma coluna persistente por área. Colunas sem dados autorizados mostram contagem zero, progresso 0% e estado vazio.
- Cards exibem título, cena e etapa quando informadas, responsável, prazo, status textual/visual e selo de compartilhamento quando aplicável; não exibem percentual individual.
- Filtros de cena e etapa são aplicados no backend sobre a consulta autorizada, sem alterar as colunas de área do Kanban.
- O detalhe e a criação usam modais com `aria-modal`, foco inicial, fechamento por Escape e retorno ao acionador.

### API and Authorization

- Fastify expõe contratos REST validados por Zod e tipos compartilhados.
- Toda consulta recebe `productionId` do contexto autorizado, nunca apenas do cliente.
- Política de leitura de objetivo:
  - Diretor/AD da produção: todos os objetivos;
  - membro: objetivo cuja área principal pertence ao usuário ou que foi compartilhado com uma de suas áreas.
- Política de escrita estrutural: somente Diretor/AD cria ou altera título, área, cena, etapa, responsável, prazo, resumo, visão do diretor e compartilhamentos.
- Política de escrita operacional: Diretor/AD e membros autorizados podem alterar status, comentar e manter documentos/links.
- Exclusão de objetivo e edição/exclusão de comentário não são expostas no MVP.
- Endpoints respondem `401` para sessão inválida, `403` para autorização negada, `409` para conflito de versão e `422` para dados inválidos.

### Data and Progress

- `Objective` referencia uma área principal e um usuário responsável elegível na produção; `sceneReference` e `stageReference` são textos opcionais normalizados para busca, e `dueDate` representa sua referência de cronograma.
- `ObjectiveSharedArea` representa compartilhamento N:N com áreas secundárias e impede duplicidade com a área principal.
- O status inicial é `pending`; transições aceitas permanecem entre os três estados do MVP.
- Não existe coluna de percentual no objetivo.
- Progresso de área e produção é calculado por `COUNT(complete) / COUNT(total)` no escopo autorizado; conjunto vazio retorna 0%.
- Toda mutação relevante cria `HistoryEntry` na mesma transação do dado alterado.
- Last write wins usa `updatedAt`/versão recebida pelo cliente; a última gravação aceita torna-se atual sem apagar o histórico.

### Realtime and Failure Handling

- Socket.IO autentica a mesma sessão da API e usa salas por produção e objetivo.
- Eventos mínimos: `objective.status_changed`, `objective.comment_added`, `objective.document_changed`, `objective.presence_changed` e `sync.error`.
- Presença é efêmera e não substitui o responsável designado.
- A perda de conexão exibe estado offline; alterações offline não são enfileiradas no MVP.
- Falha de sincronização mantém dados confirmados no servidor e oferece recarregar ou tentar novamente.

## Interfaces

### REST

- `GET /me` e `PUT /me/profile`
- `GET /productions/:productionId/areas`
- `GET /productions/:productionId/objectives` — aceita filtros opcionais `scene` e `stage` dentro do escopo autorizado
- `POST /productions/:productionId/objectives` — Diretor/AD
- `GET /objectives/:objectiveId`
- `PATCH /objectives/:objectiveId` — campos estruturais, Diretor/AD
- `PATCH /objectives/:objectiveId/status` — usuário autorizado
- `POST /objectives/:objectiveId/comments`
- `GET /objectives/:objectiveId/history`
- `POST|PATCH|DELETE /objectives/:objectiveId/documents`
- `GET /productions/:productionId/summary` — resposta agregada conforme escopo do usuário

### UI Contracts

- **Objetivos**: aba default, colunas de área, cards autorizados, empty states e criação supervisor-only.
- **Resumo**: cards numéricos, resumo por área e supervisão; agregados globais apenas para Diretor/AD.
- **Objetivo compartilhado**: permanece na coluna da área principal e recebe texto `Compartilhado com sua área` para membros da área secundária.
- **Novo objetivo**: título, área principal, responsável, prazo, resumo e visão do diretor obrigatórios; cena, etapa e áreas compartilhadas opcionais, sem repetir a área principal.

## Implementation Phases

### Phase 1 — Foundation

- Criar monorepo pnpm, configurações TypeScript, lint, testes e variáveis de ambiente.
- Configurar PostgreSQL, Prisma, migrações e seed de papéis/áreas.
- Integrar Google OAuth e sessão segura.

### Phase 2 — Identity and Authorization

- Implementar onboarding de perfil, papéis e áreas.
- Implementar políticas centralizadas de leitura, escrita estrutural e escrita operacional.
- Cobrir acessos negados com testes de API antes de construir a UI protegida.

### Phase 3 — Objectives and Dashboard

- Implementar modelo, consultas autorizadas, criação e atualização de status.
- Construir shell DSGOV, abas, Kanban, cards, empty states e modais.
- Implementar Resumo com agregados escopados no servidor.

### Phase 4 — Context and Collaboration

- Implementar documentos/links, comentários append-only e histórico.
- Adicionar auto-save para campos permitidos e tratamento de conflitos.
- Implementar Socket.IO para status, comentários e presença.

### Phase 5 — Quality and Release

- Validar acessibilidade, responsividade, segurança, concorrência e falhas de rede.
- Executar cenários E2E por papel e preparar evidências do MVP.

## Testing Strategy

- **Unit**: cálculo de progresso, validações, políticas de autorização e transições de status.
- **Integration**: API + PostgreSQL para criação, compartilhamento, histórico, agregados e negativas 401/403/409/422.
- **Component**: tabs, cards, empty states, formulários e modais com foco.
- **E2E**: Diretor/AD cria e supervisiona; membro vê próprias áreas e compartilhamentos; membro não cria nem edita campos estruturais.
- **Accessibility**: teclado, foco visível, nomes acessíveis, status por texto e visual, `progressbar` semântico e contraste.
- **Responsive**: desktop, tablet e mobile, com scroll horizontal intencional no Kanban.

## Risks and Mitigations

- **Vazamento por agregados**: summary é calculado no backend no mesmo escopo das consultas de objetivos.
- **Autorização apenas visual**: middleware e políticas de domínio validam todas as mutações e leituras.
- **Duplicidade multiárea**: consultas usam IDs únicos; compartilhamentos possuem restrição composta.
- **Conflito simultâneo**: versão/`updatedAt`, last write wins e histórico transacional.
- **DSGOV parecer portal institucional**: usar fundamentos e componentes sem wordmark; manter composição densa de ferramenta operacional.
- **Kanban em telas pequenas**: colunas com largura estável e rolagem horizontal acessível, sem comprimir cards.

## Prototype Boundary

Os seguintes elementos são apenas mecanismos da demonstração e devem ser substituídos: usuários/áreas/objetivos hardcoded, troca de usuário por `select`, React via CDN, dados em memória, IDs por `Date.now()`, links `#`, responsável em texto livre e ausência de autorização no servidor. O protótipo permanece referência para hierarquia, tabs, Kanban, cards, estados vazios, modais e feedback visual.

## Definition of Done

- Google SSO e perfil obrigatório funcionam.
- Autorização no backend cobre leitura, criação, escrita estrutural e operacional.
- Objetivos e Resumo respeitam escopo global ou de membro sem vazamento.
- Diretor/AD cria objetivo válido para qualquer área; membro recebe `403`.
- Kanban, cards, compartilhamentos, modais e estados vazios seguem a decisão de UX.
- Progresso agregado é correto e não existe percentual individual por objetivo.
- Documentos, comentários, histórico, auto-save e realtime funcionam conforme EARS.
- Testes automatizados, acessibilidade e responsividade passam nos cenários definidos.

## Complexity Tracking

Nenhuma violação constitucional identificada.