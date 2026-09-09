# SDD/EARS: Production Flow MVP

**Feature**: Production Flow  
**Status**: Ready  
**Created**: 2026-09-09  
**Scope**: MVP web responsivo

## 1. Escopo

O MVP do Production Flow é uma aplicação web responsiva para centralizar objetivos de produção audiovisual, checklists por área, documentos, comentários, progresso, supervisão e colaboração em tempo real.

Fora do MVP:

- aplicativo mobile nativo;
- Apple ID;
- publicação em lojas de aplicativo;
- notificações push;
- resolução manual avançada de conflito;
- exclusão de objetivos;
- estados de objetivo além de pendente, em andamento e concluído.

## 2. Atores

- **Diretor**: usuário com acesso a todos os objetivos da produção, comentários, documentos e atualização de status.
- **Assistente de Direção (AD)**: usuário com acesso a todos os objetivos da produção, comentários, documentos e atualização de status.
- **Membro de área**: usuário associado a uma ou mais áreas de produção, com acesso a objetivos da própria área e objetivos explicitamente compartilhados com uma de suas áreas.

## 3. Entidades

- **Usuário**: pessoa autenticada, com nome, papel principal e áreas de atuação.
- **Papel**: nível de responsabilidade e autorização do usuário.
- **Área**: departamento de produção audiovisual.
- **Objetivo**: tarefa simples com título, área principal, referências opcionais de cena e etapa, status, responsável elegível, prazo, resumo, visão do diretor, documentos/links, comentários, histórico e compartilhamentos explícitos com áreas secundárias; não possui percentual individual editável.
- **Compartilhamento de Objetivo**: relação entre um objetivo e uma área secundária autorizada, sempre distinta da área principal.
- **Checklist**: conjunto de objetivos de uma área.
- **Documento**: link ou material de apoio vinculado a um objetivo.
- **Comentário**: registro textual adicionado por usuário autorizado a um objetivo visível.
- **Histórico**: registro auditável de comentários adicionados, mudanças de status e alterações de documentos/links.

## 4. Decisões Resolvidas

- O padrão visual obrigatório é DSGOV; tons pastel não fazem parte do requisito.
- A composição principal é uma ferramenta operacional em Kanban por área, sem wordmark gov.br; DSGOV permanece como fonte de componentes, tokens, acessibilidade e padrões de interação.
- A interface usa as abas Objetivos e Resumo, com Objetivos selecionada por padrão.
- Objetivo significa tarefa simples.
- Cena e etapa são referências textuais opcionais do objetivo no MVP; podem ser exibidas e usadas para filtrar objetivos, sem alterar a organização principal do Kanban por área.
- O prazo do objetivo é a referência de cronograma no MVP.
- Estados do objetivo no MVP: pendente, em andamento e concluído.
- Progresso da área é calculado por objetivos concluídos dividido pelo total de objetivos da área.
- O objetivo não possui percentual individual persistido ou editável; seu andamento é comunicado pelo status.
- Documentos e links ficam acessíveis sempre que o objetivo estiver visível para o usuário.
- Diretor e AD são supervisores por papel, veem todos os objetivos e podem criar objetivos para qualquer área; não existe elevação manual de permissão na interface.
- Membros de área veem objetivos da própria área e objetivos explicitamente compartilhados com uma de suas áreas; o compartilhamento do MVP é por área, não por usuário individual.
- Todas as colunas de área permanecem visíveis; colunas fora do escopo exibem estado vazio, contagem zero e progresso 0%, sem revelar agregados não autorizados.
- O Resumo usa escopo global para Diretor/AD e somente objetivos autorizados para membros de área.
- Edição simultânea usa last write wins no MVP.
- Comentários não podem ser editados ou apagados no MVP.
- MVP é web responsivo; app nativo fica fora do MVP.
- Autenticação do MVP usa Google SSO.
- Real-time do MVP cobre status e comentários.
- Offline não salva alterações no MVP; o sistema deve exibir estado offline.

## 5. Functional Requirements in EARS

### Authentication and Profile

- **EARS-FR-001 [WHERE]**: WHERE the system is operating as the MVP, the Production Flow system shall provide Google SSO as the authentication method for web users.
- **EARS-FR-002 [WHERE]**: WHERE the system is operating as the MVP, the Production Flow system shall not require Apple ID authentication.
- **EARS-FR-003 [WHEN]**: WHEN a user signs in for the first time, the Production Flow system shall require the user to complete a profile with name, primary role, and production areas before displaying objectives.
- **EARS-FR-004 [IF]**: IF a signed-in user has an incomplete profile, the Production Flow system shall redirect the user to profile completion before allowing access to production objectives.
- **EARS-FR-005 [IF]**: IF a user session expires, the Production Flow system shall redirect the user to the Google SSO authentication flow before allowing access to production data.

### Objective Model and Status

- **EARS-FR-006 [WHERE]**: WHERE a production checklist is displayed, the Production Flow system shall represent each objective as a simple task associated with one primary production area.
- **EARS-FR-007 [WHERE]**: WHERE an objective is created, the Production Flow system shall assign the objective status as pending by default.
- **EARS-FR-007A [WHEN]**: WHEN a Director or Assistant Director creates an objective, the Production Flow system shall require title, primary area, eligible responsible user, due date, summary, and director vision before saving it.
- **EARS-FR-007B [IF]**: IF the primary area is also selected as a shared area, the Production Flow system shall reject or remove the duplicate sharing relationship.
- **EARS-FR-008 [WHEN]**: WHEN an authorized user marks an objective as in progress, the Production Flow system shall update the objective status to in progress and display the active contributor indicator.
- **EARS-FR-009 [WHEN]**: WHEN an authorized user marks an objective as complete, the Production Flow system shall update the objective status to complete and recalculate the progress for the associated area.
- **EARS-FR-010 [WHERE]**: WHERE the system is operating as the MVP, the Production Flow system shall support only pending, in progress, and complete objective statuses.
- **EARS-FR-010A [WHERE]**: WHERE an objective is created or edited, the Production Flow system shall allow a Director or Assistant Director to associate optional scene and stage references and shall use the due date as the objective schedule reference.
- **EARS-FR-010B [WHEN]**: WHEN an authorized user filters objectives by scene or stage, the Production Flow system shall display only matching objectives within that user's authorization scope.

### Dashboard and Visibility

- **EARS-FR-011 [WHEN]**: WHEN an authenticated user opens the production dashboard, the Production Flow system shall select the Objectives tab and display a Kanban column for every production area with authorized objectives, scene and stage references when present, responsible person, due date, status, and next step.
- **EARS-FR-012 [WHILE]**: WHILE a user has the Director or Assistant Director role, the Production Flow system shall allow the user to view, comment on, and update the status of all objectives in the production.
- **EARS-FR-013 [WHILE]**: WHILE a user has a department member role, the Production Flow system shall display only objectives assigned to one of the user's areas or explicitly shared with one of those areas.
- **EARS-FR-014 [IF]**: IF a department member attempts to access an objective that is neither assigned to one of the user's areas nor explicitly shared with one of those areas, the Production Flow system shall deny access to the objective.
- **EARS-FR-015 [WHERE]**: WHERE a user profile includes multiple production areas, the Production Flow system shall use all selected areas to determine which objectives are visible to the user without displaying duplicate objectives.
- **EARS-FR-015A [WHERE]**: WHERE an area has no objectives visible to the current user, the Production Flow system shall keep the area column visible with an empty state, zero count, and 0% progress.
- **EARS-FR-015B [WHEN]**: WHEN a member views an objective from another primary area that was shared with one of the member's areas, the Production Flow system shall display a textual shared-objective indicator.

### Permissions and Objective Maintenance

- **EARS-FR-016 [WHILE]**: WHILE a user has the Director or Assistant Director role, the Production Flow system shall allow the user to create objectives for any production area.
- **EARS-FR-016A [IF]**: IF a user without the Director or Assistant Director role attempts to create an objective, the Production Flow system shall deny the request.
- **EARS-FR-017 [WHILE]**: WHILE a user has the Director or Assistant Director role, the Production Flow system shall allow the user to edit all objective fields, including scene and stage references.
- **EARS-FR-018 [WHILE]**: WHILE a user has a department member role, the Production Flow system shall allow the user to update status, comments, documents, and links only for objectives visible to that user.
- **EARS-FR-019 [IF]**: IF a department member attempts to edit an objective structural field, the Production Flow system shall prevent the change.
- **EARS-FR-020 [WHERE]**: WHERE the system is operating as the MVP, the Production Flow system shall not provide objective deletion.

### Progress

- **EARS-FR-021 [WHEN]**: WHEN an objective status changes, the Production Flow system shall recalculate the progress percentage for its primary area as completed authorized objectives divided by total authorized objectives in that area.
- **EARS-FR-022 [WHERE]**: WHERE an area has no objectives in the current user's authorization scope, the Production Flow system shall display the area progress as 0%.
- **EARS-FR-023 [WHEN]**: WHEN the system displays overall progress to a Director or Assistant Director, it shall calculate completed objectives divided by all production objectives; for a department member, it shall use only authorized objectives.
- **EARS-FR-023A [WHERE]**: WHERE an objective card is displayed, the Production Flow system shall communicate progress using the pending, in progress, or complete status without an individual percentage field.

### Documents and Links

- **EARS-FR-024 [WHEN]**: WHEN an authenticated user opens a visible objective, the Production Flow system shall display all documents and links attached to that objective regardless of the objective status.
- **EARS-FR-025 [WHEN]**: WHEN an authorized user adds, changes, or removes a document or link from a visible objective, the Production Flow system shall save the change and record it in the objective history.
- **EARS-FR-026 [IF]**: IF a user attempts to open an unavailable document or broken link, the Production Flow system shall display a user-friendly error message.

### Comments and History

- **EARS-FR-027 [WHEN]**: WHEN an authorized user adds a comment to a visible objective, the Production Flow system shall display the comment in the objective comment history with the user name and timestamp.
- **EARS-FR-028 [WHERE]**: WHERE a comment has been added to an objective, the Production Flow system shall prevent users from editing or deleting that comment in the MVP.
- **EARS-FR-029 [WHEN]**: WHEN an objective status changes, the Production Flow system shall record a history entry with the acting user, timestamp, change type, previous status, and new status.
- **EARS-FR-030 [WHEN]**: WHEN a document or link is added, changed, or removed from an objective, the Production Flow system shall record a history entry with the acting user, timestamp, change type, and summary.

### Real-Time and Auto-Save

- **EARS-FR-031 [WHEN]**: WHEN an authorized user changes an objective status, the Production Flow system shall synchronize the updated status to other authenticated users currently viewing that objective.
- **EARS-FR-032 [WHEN]**: WHEN an authorized user adds a comment to an objective, the Production Flow system shall synchronize the comment to other authenticated users currently viewing that objective.
- **EARS-FR-033 [WHILE]**: WHILE more than one authenticated user is viewing or editing the same objective, the Production Flow system shall display active user indicators for that objective.
- **EARS-FR-034 [WHEN]**: WHEN an authorized user changes a permitted objective field, document, or link, the Production Flow system shall automatically save the change.
- **EARS-FR-035 [IF]**: IF multiple users edit the same objective field concurrently, the Production Flow system shall persist the most recent saved change as the current value.
- **EARS-FR-036 [WHEN]**: WHEN an objective field or status changes, the Production Flow system shall record the change in the objective history with the acting user and timestamp.
- **EARS-FR-037 [WHERE]**: WHERE the system is operating as the MVP, the Production Flow system shall not provide push notifications.

### Supervision

- **EARS-FR-038 [WHILE]**: WHILE a user has the Director or Assistant Director role, the Production Flow system shall provide a supervision view with progress by area and access to all production checklists.
- **EARS-FR-039 [WHEN]**: WHEN a supervisor opens a visible objective, the Production Flow system shall display the objective context, comments, status, documents, and history.

### Navigation and Summary

- **EARS-FR-040 [WHERE]**: WHERE the dashboard is displayed, the Production Flow system shall provide accessible Objectives and Summary tabs with Objectives selected by default.
- **EARS-FR-041 [WHEN]**: WHEN a Director or Assistant Director opens the Summary tab, the Production Flow system shall display global numeric indicators, area summaries, and supervision progress.
- **EARS-FR-042 [WHEN]**: WHEN a department member opens the Summary tab, the Production Flow system shall calculate indicators exclusively from objectives authorized for that member.
- **EARS-FR-043 [WHERE]**: WHERE objective creation is available, the Production Flow system shall display the New Objective action only to Directors and Assistant Directors while also enforcing the permission on the server.

## 6. Non-Functional Requirements in EARS

- **EARS-NFR-001 [WHERE]**: WHERE the system renders any user interface, the Production Flow system shall use DSGOV components, visual foundations, official tokens, and interaction patterns as the primary design source.
- **EARS-NFR-002 [WHERE]**: WHERE the system renders an interactive control, the Production Flow system shall provide an accessible name for that control.
- **EARS-NFR-003 [WHILE]**: WHILE a user navigates the interface with a keyboard, the Production Flow system shall provide visible focus for the currently focused interactive element.
- **EARS-NFR-004 [WHERE]**: WHERE the system displays progress information, the Production Flow system shall expose the progress value to assistive technologies.
- **EARS-NFR-005 [WHERE]**: WHERE the system displays a status, the Production Flow system shall communicate the status using text and visual treatment rather than color alone.
- **EARS-NFR-006 [WHERE]**: WHERE the system is accessed on desktop, tablet, or mobile browser, the Production Flow system shall preserve the same objective visibility, status update, document access, comment, and supervision rules.
- **EARS-NFR-007 [IF]**: IF the Production Flow system loses network connectivity, the system shall display an offline state to the user.
- **EARS-NFR-008 [WHERE]**: WHERE the system is operating as the MVP, the Production Flow system shall not be required to save changes made while offline.
- **EARS-NFR-009 [IF]**: IF real-time synchronization fails, the Production Flow system shall notify the user and provide an option to reload or retry.
- **EARS-NFR-010 [IF]**: IF network connectivity or synchronization fails, the Production Flow system shall preserve data already saved on the server.
- **EARS-NFR-011 [WHERE]**: WHERE contrast requirements apply to text or controls, the Production Flow system shall meet WCAG AA/eMAG contrast expectations.
- **EARS-NFR-012 [WHERE]**: WHERE the system is operating as the MVP, the Production Flow system shall not require a native mobile application or app store distribution.
- **EARS-NFR-013 [WHILE]**: WHILE a user navigates the dashboard tabs with a keyboard, the Production Flow system shall support focus movement between tabs and expose selected-tab semantics.
- **EARS-NFR-014 [WHEN]**: WHEN a modal opens or closes, the Production Flow system shall move focus into the modal and return it to the triggering control when closed.

## 7. Traceability Matrix

| Source | EARS Requirements | Status |
| --- | --- | --- |
| User Story 1: centralizar produção | EARS-FR-010A, EARS-FR-010B, EARS-FR-011, EARS-FR-040 to EARS-FR-042, EARS-NFR-006 | Ready |
| User Story 2: checklist e status | EARS-FR-006 to EARS-FR-010, EARS-FR-021 to EARS-FR-023 | Ready |
| User Story 3: colaboração | EARS-FR-013 to EARS-FR-015B, EARS-FR-018, EARS-FR-027, EARS-FR-031 to EARS-FR-036 | Ready |
| User Story 4: supervisão | EARS-FR-012, EARS-FR-016 to EARS-FR-016A, EARS-FR-038 to EARS-FR-043 | Ready |
| User Story 5: login e perfil | EARS-FR-001 to EARS-FR-005, EARS-FR-015 | Ready |
| User Story 6: documentos | EARS-FR-024 to EARS-FR-026, EARS-FR-030 | Ready |
| DSGOV and accessibility | EARS-NFR-001 to EARS-NFR-006, EARS-NFR-011 | Ready |
| Offline and failures | EARS-NFR-007 to EARS-NFR-010 | Ready |

## 8. Acceptance Test Themes

- Google SSO and mandatory profile completion.
- Role-based objective visibility for Director, AD, department member, and multi-area user.
- Kanban by area with persistent empty columns and no unauthorized aggregate leakage.
- New objective creation restricted to Director/AD with required structural fields and pending default status.
- Shared-by-area indicator and operational permissions for members of shared areas.
- Objective status transitions limited to pending, in progress, and complete.
- Optional scene and stage context displayed and filtered within the authorized objective scope; due date used as schedule reference.
- Area and overall progress calculated by completed objectives in the authorized scope; no individual objective percentage.
- Documents visible for every visible objective regardless of status.
- Comments append-only in MVP.
- History recorded for status, documents/links, and comments.
- Real-time sync for status and comments.
- Last write wins for concurrent field edits.
- DSGOV UI compliance, keyboard navigation, accessible names, progress semantics, status text, contrast, and responsive behavior.
- Offline, sync failure, broken link, and unavailable document states.

## 9. Open Questions

No blocking conflicts remain for the MVP SDD/EARS baseline. Future releases may revisit native mobile app scope, Apple ID, push notifications, objective archive/delete behavior, additional statuses, and advanced conflict resolution.
