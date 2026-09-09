# Feature Specification: Production Flow

**Feature Branch**: `001-production-flow`

**Created**: 2026-09-09

**Status**: Draft

**Input**: User description: "Aplicativo web e mobile para centralizar produção audiovisual, com papéis, checklists por área, progresso, documentos, comentários, visão de supervisão e login com SSO."

## Cenários de Usuário e Testes

### User Story 1 - Centralizar a produção em um único espaço (Priority: P1)

Como assistente de direção ou diretor, quero visualizar todos os objetivos, entregas e decisões da produção em um único lugar para não perder contexto e evitar que informações fiquem espalhadas em canais paralelos.

**Why this priority**: A centralização da produção é a base do produto e permite que o restante do sistema funcione com clareza, rastreabilidade e menos retrabalho.

**Independent Test**: Pode ser validado ao abrir a visão principal da produção e confirmar que cada objetivo, área, responsável e status aparecem num painel único, sem depender de documentos externos.

**Acceptance Scenarios**:

1. **Given** que uma produção tem vários departamentos e documentos dispersos, **When** o usuário entra no painel principal, **Then** ele vê uma visão unificada de objetivos, pendências e status por área.
2. **Given** que uma cena ou etapa foi discutida e registrada, **When** o usuário abre o item correspondente, **Then** ele consegue ver o resumo da decisão, responsável, links e próximos passos sem sair do app.

---

### User Story 2 - Acompanhar o checklist por área com status claro (Priority: P1)

Como membro de uma área, quero visualizar o checklist dos meus objetivos e marcar tarefas como em andamento ou concluídas para manter o progresso da equipe visível e organizado.

**Why this priority**: A operação diária do app depende da clareza dos itens e da visibilidade do estado de cada entrega.

**Independent Test**: A funcionalidade é testável ao alterar o status de um objetivo e verificar que o progresso da área e os indicadores visuais refletem a mudança.

**Acceptance Scenarios**:

1. **Given** que um objetivo ainda não começou, **When** o usuário marca como em andamento, **Then** o item mostra o status ativo com o ícone do responsável e indica que há trabalho em progresso.
2. **Given** que um objetivo foi executado, **When** o usuário marca como concluído, **Then** o item fica mais transparente, muda de cor e aumenta o percentual de progresso da área.

---

### User Story 3 - Colaborar entre áreas sem perder contexto (Priority: P1)

Como qualquer membro da equipe, quero abrir um objetivo compartilhado por mais de uma área para ver o contexto, adicionar comentários e colaborar sem precisar buscar informações em documentos paralelos.

**Why this priority**: O valor do produto está em reduzir o ruído operacional e permitir colaboração real entre departamentos com o mínimo de fricção.

**Independent Test**: Pode ser validado ao abrir um objetivo compartilhado, adicionar um comentário e confirmar que o histórico, o responsável e os links permanecem associados ao item.

**Acceptance Scenarios**:

1. **Given** que arte e cinematografia compartilham um objetivo, **When** um usuário abre o item, **Then** ele consegue ver o resumo, o que foi definido, o estado e os documentos vinculados.
2. **Given** que existe uma dúvida sobre a execução de um item, **When** um colega comenta ou responde, **Then** aquela informação fica registrada no contexto do objetivo para todos os envolvidos.

---

### User Story 4 - Supervisão de diretor e assistente de direção (Priority: P2)

Como diretor ou assistente de direção, quero acessar uma visão de supervisão com progresso por área para verificar se a visão do projeto está sendo seguida e onde é necessário intervir.

**Why this priority**: O acompanhamento do estado geral do projeto é central para a liderança e para a coordenação da produção.

**Independent Test**: Pode ser validado em uma visão de supervisão que apresente progresso geral, itens por área e documentos liberados somente quando concluídos.

**Acceptance Scenarios**:

1. **Given** que o usuário possui papel de supervisão, **When** ele acessa o painel de acompanhamento, **Then** ele visualiza os checklists de todas as áreas e o percentual de progresso por departamento.
2. **Given** que uma área marcou um item como concluído, **When** o supervisor abre o conteúdo, **Then** ele consegue acessar o documento ou material de apoio correspondente.

---

### User Story 5 - Login, perfil e personalização do contexto (Priority: P2)

Como usuário do sistema, quero me autenticar com SSO, preencher meu perfil e receber apenas os objetivos relevantes ao meu papel para manter a interface limpa e útil.

**Why this priority**: A personalização reduz ruído e melhora a clareza para cada integrante do time.

**Independent Test**: Pode ser validado ao autenticar um usuário e confirmar que o app exibe apenas papéis e objetivos relevantes para seu perfil.

**Acceptance Scenarios**:

1. **Given** que o usuário entra no app, **When** faz login com Gmail ou Apple, **Then** o sistema cria a sessão e identifica o papel principal do perfil.
2. **Given** que o usuário possui mais de um papel, **When** ele entra no sistema, **Then** o app mostra os checklists associados aos papéis relevantes sem poluir a experiência.

---

### User Story 6 - Acesso rápido a documentos e materiais de apoio (Priority: P3)

Como membro da equipe, quero anexar links e documentos de referência ao objetivo para que a pesquisa, materiais visuais e artefatos de produção fiquem próximos do contexto do trabalho.

**Why this priority**: O valor do app aumenta quando o material de apoio fica junto da tarefa e não separado em múltiplos locais.

**Independent Test**: Pode ser validado ao adicionar um link ou documento ao objetivo e confirmar que ele está visível para a equipe envolvida.

**Acceptance Scenarios**:

1. **Given** que um colaborador precisa registrar uma referência de pesquisa, **When** ele adiciona um link ao objetivo, **Then** o material fica disponível dentro do contexto da tarefa.
2. **Given** que um objetivo requer materiais visuais ou planilhas, **When** esses recursos forem vinculados, **Then** a equipe consegue acessá-los sem sair do fluxo de trabalho do app.

---

### Edge Cases

- O que acontece quando um usuário tem mais de um papel e os objetivos dos papéis se sobrepõem?
- Como o sistema trata um objetivo compartilhado por duas áreas que atualizam o mesmo item ao mesmo tempo?
- O que acontece quando um membro tenta acessar um documento que ainda não foi liberado pela área responsável?
- Como o sistema lida com links quebrados, arquivos ausentes ou contexto incompleto em um objetivo?
- O que acontece quando uma tarefa está em andamento por mais de uma pessoa simultaneamente?
- Como a equipe registra uma decisão que altera um objetivo já concluído?

## Requirements

### Functional Requirements

- **FR-001**: O sistema MUST centralizar a visão da produção em um painel principal com objetivos, etapas, áreas, responsáveis e estado de progresso.
- **FR-002**: O sistema MUST permitir organização por área, cena, etapa e cronograma para que a produção tenha contexto completo por unidade de trabalho.
- **FR-003**: O sistema MUST oferecer checklists por área com status de pendente, em andamento e concluído.
- **FR-004**: O sistema MUST permitir que cada objetivo registre resumo, visão do diretor, links, documentos, comentários e responsáveis.
- **FR-005**: O sistema MUST indicar quem está trabalhando em um item em andamento e mostrar esse contexto ao restante da equipe.
- **FR-006**: O sistema MUST atualizar a visibilidade de progresso da área quando uma tarefa é marcada como concluída.
- **FR-007**: O sistema MUST permitir colaboração entre áreas em objetivos compartilhados sem perder o contexto original do item.
- **FR-008**: O sistema MUST diferenciar os papéis de diretor, assistente de direção e demais áreas, adaptando a experiência conforme responsabilidades e permissões.
- **FR-009**: O sistema MUST fornecer visão de supervisão para diretor e assistente de direção com progresso geral por área.
- **FR-010**: O sistema MUST restringir a visualização de documentos somente ao conjunto de acessos permitido por papel e pelo status de conclusão do item.
- **FR-011**: O sistema MUST suportar login via SSO com Google no web e Google ou Apple no mobile.
- **FR-012**: O sistema MUST permitir que o usuário cadastre nome, papel e áreas de atuação em seu perfil.
- **FR-013**: O sistema MUST permitir o auto-save contínuo e sincronização em tempo real de alterações em um mesmo objetivo.
- **FR-014**: O sistema MUST possibilitar anexar links e materiais de apoio diretamente ao contexto da tarefa.
- **FR-015**: O sistema MUST manter o histórico de comentários e alterações relevantes para manter a transparência da decisão e evitar retrabalho.
- **FR-016**: O sistema MUST usar uma interface limpa, visualmente organizada, com paleta clara e tons pastel para melhorar legibilidade e experiência do usuário.
- **FR-017**: O sistema MUST funcionar de forma consistente em web e mobile, preservando a lógica de navegação e a organização de conteúdos.

### Non-Functional Requirements

- **NFR-001**: O sistema MUST adotar os padrões de interface do Design System GOV.BR (DSGOV), conforme a documentação oficial em https://www.gov.br/ds/home, incluindo padrões de design, fundamentos visuais, utilitários CSS e fluxo de desenvolvimento.
- **NFR-002**: O sistema MUST priorizar componentes e tokens oficiais do DSGOV para manter consistência visual, acessibilidade, previsibilidade de interação e aderência ao Padrão Digital de Governo nas experiências web e mobile.

### Key Entities

- **Usuário**: Representa qualquer pessoa que acessa o sistema, com nome, papel, áreas associadas e autenticação.
- **Papel**: Define o nível de acesso e a visão relevante para o usuário, como diretor, assistente de direção, fotografia, arte, produção e outros.
- **Área**: Representa um departamento ou especialidade dentro da produção, como cinematografia, arte, produção, sonorização e direção.
- **Objetivo**: Representa uma tarefa, etapa ou entrega de uma área ou de múltiplas áreas, com status, contexto, documentação e responsável.
- **Checklist**: Estrutura central de acompanhamento da área, composta por objetivos e indicadores de progresso.
- **Documento**: Recurso de apoio vinculado ao objetivo, podendo ser link, arquivo, moodboard, planilha, mapa ou pesquisa.
- **Comentário**: Registro de conversa, sugestão ou decisão dentro do contexto de um objetivo.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Usuários conseguem localizar o status de uma tarefa e o próximo passo em menos de 30 segundos em sessões comuns de uso.
- **SC-002**: Um membro de área consegue atualizar um objetivo para em andamento ou concluído sem sair do fluxo principal do app.
- **SC-003**: O diretor ou assistente de direção consegue visualizar o progresso geral de todas as áreas a partir de um único painel.
- **SC-004**: O sistema reduz a necessidade de buscas em documentos paralelos ao manter contexto, links e decisões dentro da tarefa.
- **SC-005**: A equipe consegue colaborar em objetivos compartilhados com comentários, responsáveis e materiais de apoio sem perda de contexto.

## Assumptions

- Os usuários têm acesso estável à internet e utilizam device com suporte mínimo para web e mobile.
- A produção audiovisual pode ter múltiplos papéis e áreas simultâneas, mas todas devem respeitar o mesmo modelo de checklist e contexto.
- O fluxo de produção pode variar por projeto, porém a operação central do app permanece consistente e compartilhada.
- O sistema será construído como uma solução moderna de web e mobile com base em React e React Native, conforme a arquitetura definida pela constituição.
- A autenticação por SSO será a base de acesso, com políticas de permissão apropriadas para cada papel.
