# Tasks: Production Flow

**Feature**: Production Flow
**Status**: Draft
**Created**: 2026-09-09

## Phase 1: Setup do projeto e infraestrutura

- [ ] T001 Definir monorepo inicial com estrutura de apps web e mobile
- [ ] T002 Configurar ambiente de desenvolvimento com React, React Native e Node.js
- [ ] T003 Inicializar backend com TypeScript e banco de dados PostgreSQL
- [ ] T004 Configurar autenticação SSO para Google e Apple ID
- [ ] T005 Definir modelo de dados inicial: usuário, papel, área, objetivo, checklist, documento e comentário
- [ ] T006 Criar seed inicial para papéis e áreas de produção audiovisual

## Phase 2: Autenticação e perfil

- [ ] T101 Implementar fluxo de login no web com Google SSO
- [ ] T102 Implementar fluxo de login no mobile com Google e Apple
- [ ] T103 Criar onboarding de perfil com nome, papel e áreas
- [ ] T104 Persistir perfil e permissões no backend
- [ ] T105 Exibir contexto relevante conforme papel do usuário
- [ ] T106 Validar estados de autenticação e sessão expirada

## Phase 3: Dashboard e visão central

- [ ] T201 Criar dashboard principal da produção
- [ ] T202 Agrupar objetivos por área, etapa e cena
- [ ] T203 Exibir percentual de progresso por área
- [ ] T204 Exibir pendências e próximos passos da produção
- [ ] T205 Implementar navegação por área e contexto de objetivo
- [ ] T206 Adicionar cards de status com indicadores visuais

## Phase 4: Checklists e progresso

- [ ] T301 Implementar checklist por área
- [ ] T302 Adicionar estados pendente, em andamento e concluído
- [ ] T303 Exibir responsável e usuários ativos em cada objetivo
- [ ] T304 Recalcular progresso da área ao mudar status do item
- [ ] T305 Permitir definição de próximos passos e responsabilidades
- [ ] T306 Validar feedback visual e acessibilidade em componentes de checklist

## Phase 5: Objetivos, documentos e comentários

- [ ] T401 Criar tela de detalhe do objetivo
- [ ] T402 Exibir resumo, visão do diretor e contexto da tarefa
- [ ] T403 Adicionar suporte a links e documentos anexados
- [ ] T404 Implementar comentários e histórico de decisões
- [ ] T405 Controlar acesso a documentos por permissão e status
- [ ] T406 Validar persistência e recuperação de materiais e comentários

## Phase 6: Supervisão e permissões

- [ ] T501 Implementar visão de supervisão para diretor e assistente de direção
- [ ] T502 Exibir progresso geral por área
- [ ] T503 Permitir acesso aos documentos concluídos apenas para supervisão autorizada
- [ ] T504 Ajustar permissões por papel e área
- [ ] T505 Validar regras de visibilidade e autorização no backend

## Phase 7: Colaboração em tempo real e UX

- [ ] T601 Implementar auto-save de alterações de objetivo
- [ ] T602 Implementar sincronização em tempo real de status e comentários
- [ ] T603 Exibir indicadores de quem está trabalhando no item
- [ ] T604 Refinar paleta visual e design system do app
- [ ] T605 Ajustar responsividade da web e mobile
- [ ] T606 Realizar testes de usabilidade e refinamento de UX

## Phase 8: Validação e QA

- [ ] T701 Validar fluxo completo de login e perfil
- [ ] T702 Validar checklist e mudança de status
- [ ] T703 Validar colaboração entre áreas e comentários
- [ ] T704 Validar visão de supervisão e permissões
- [ ] T705 Validar sincronização e auto-save
- [ ] T706 Preparar checklist final de MVP e documentar evidências
