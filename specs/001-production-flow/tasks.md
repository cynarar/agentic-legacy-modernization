# Tasks: Production Flow

**Feature**: Production Flow
**Status**: Draft
**Created**: 2026-09-09

## Phase 1: Setup do projeto e infraestrutura MVP

- [ ] T001 Definir monorepo inicial com app web responsivo e espaço reservado para mobile futuro
- [ ] T002 Configurar ambiente de desenvolvimento com React web, Node.js e TypeScript
- [ ] T003 Inicializar backend com TypeScript e banco de dados PostgreSQL
- [ ] T004 Configurar autenticação Google SSO para o MVP web
- [ ] T005 Definir modelo de dados inicial: usuário, papel, área, objetivo, checklist, documento, comentário e histórico
- [ ] T006 Criar seed inicial para papéis e áreas de produção audiovisual
- [ ] T007 Configurar dependência e base visual do Design System GOV.BR para web

## Phase 2: Autenticação e perfil

- [ ] T101 Implementar fluxo de login no web com Google SSO
- [ ] T102 Redirecionar usuário com sessão expirada para o fluxo Google SSO
- [ ] T103 Criar onboarding de perfil com nome, papel e áreas
- [ ] T104 Persistir perfil e permissões no backend
- [ ] T105 Exibir contexto relevante conforme papel do usuário
- [ ] T106 Bloquear exibição de objetivos até o perfil obrigatório estar completo

## Phase 3: Dashboard e visão central

- [ ] T201 Criar dashboard principal da produção
- [ ] T202 Agrupar objetivos por área principal e compartilhamento explícito
- [ ] T203 Exibir percentual de progresso por área
- [ ] T204 Exibir pendências e próximos passos da produção
- [ ] T205 Implementar navegação por área e contexto de objetivo
- [ ] T206 Adicionar cards de status com indicadores visuais e nomes acessíveis
- [ ] T207 Garantir que usuário multiárea veja objetivos sem duplicidade

## Phase 4: Checklists e progresso

- [ ] T301 Implementar checklist por área
- [ ] T302 Adicionar estados pendente, em andamento e concluído
- [ ] T303 Exibir responsável e usuários ativos em cada objetivo
- [ ] T304 Recalcular progresso da área como objetivos concluídos dividido pelo total de objetivos da área
- [ ] T305 Permitir definição de próximos passos e responsabilidades
- [ ] T306 Validar feedback visual e acessibilidade em componentes de checklist
- [ ] T307 Garantir que estados fora do MVP, como bloqueado e reaberto, não sejam exigidos

## Phase 5: Objetivos, documentos e comentários

- [ ] T401 Criar tela de detalhe do objetivo
- [ ] T402 Exibir resumo, visão do diretor e contexto da tarefa
- [ ] T403 Adicionar suporte a links e documentos anexados
- [ ] T404 Implementar comentários sem edição e sem exclusão no MVP
- [ ] T405 Exibir documentos e links sempre que o objetivo estiver visível para o usuário
- [ ] T406 Validar persistência e recuperação de materiais e comentários
- [ ] T407 Registrar histórico de mudança de status, alteração de documentos/links e comentários adicionados

## Phase 6: Supervisão e permissões

- [ ] T501 Implementar visão de supervisão para diretor e assistente de direção
- [ ] T502 Exibir progresso geral por área
- [ ] T503 Permitir que diretor e AD visualizem, comentem e alterem status de todos os objetivos
- [ ] T504 Permitir que membros de área acessem apenas objetivos da própria área ou explicitamente compartilhados com seu usuário
- [ ] T505 Validar regras de visibilidade e autorização no backend
- [ ] T506 Impedir que membros de área editem campos estruturais de objetivos
- [ ] T507 Impedir exclusão de objetivos no MVP

## Phase 7: Colaboração em tempo real e UX

- [ ] T601 Implementar auto-save de alterações de objetivo
- [ ] T602 Implementar sincronização em tempo real de status e comentários
- [ ] T603 Exibir indicadores de quem está trabalhando no item
- [ ] T604 Implementar last write wins para edições simultâneas no MVP
- [ ] T605 Exibir estado offline quando houver perda de conectividade
- [ ] T606 Avisar falha de sincronização em tempo real e permitir recarregar ou tentar novamente
- [ ] T607 Ajustar responsividade do web app para desktop, tablet e navegador mobile
- [ ] T608 Realizar testes de usabilidade e refinamento de UX

## Phase 8: DSGOV e acessibilidade

- [ ] T701 Aplicar componentes, fundamentos visuais, tokens oficiais e padrões de interação DSGOV
- [ ] T702 Validar ausência de requisitos e estilos baseados em paleta pastel fora do DSGOV
- [ ] T703 Garantir operação por teclado em todos os controles interativos
- [ ] T704 Garantir foco visível em todos os controles interativos
- [ ] T705 Garantir nomes acessíveis para botões, navegação, formulários e ações repetidas
- [ ] T706 Expor valores de progresso para tecnologias assistivas
- [ ] T707 Comunicar status por texto e visual, sem depender apenas de cor
- [ ] T708 Validar contraste compatível com WCAG AA/eMAG quando aplicável

## Phase 9: SDD/EARS e rastreabilidade

- [ ] T801 Criar documento SDD/EARS para o MVP
- [ ] T802 Converter requisitos funcionais para EARS com sujeito, condição/gatilho e resposta observável
- [ ] T803 Converter requisitos não funcionais para EARS verificável
- [ ] T804 Criar matriz de rastreabilidade entre user stories, requisitos EARS, tasks e critérios de aceite
- [ ] T805 Marcar requisitos como Ready, Needs Clarification ou Conflict
- [ ] T806 Garantir que conflitos resolvidos estejam refletidos em spec, plan e tasks

## Phase 10: Validação e QA

- [ ] T901 Validar fluxo completo de login e perfil
- [ ] T902 Validar checklist e mudança de status
- [ ] T903 Validar colaboração entre áreas e comentários
- [ ] T904 Validar visão de supervisão e permissões
- [ ] T905 Validar sincronização, auto-save e last write wins
- [ ] T906 Validar offline, falha de sincronização e link/documento indisponível
- [ ] T907 Validar responsividade em desktop, tablet e navegador mobile
- [ ] T908 Preparar checklist final de MVP e documentar evidências
