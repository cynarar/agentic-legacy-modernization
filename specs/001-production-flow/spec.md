# Feature Specification: Production Flow

**Feature Branch**: `001-production-flow`

**Created**: 2026-09-09

**Status**: Ready

**Input**: User description: "Aplicativo web e mobile para centralizar produção audiovisual, com papéis, checklists por área, progresso, documentos, comentários, visão de supervisão e login com SSO."

## Cenários de Usuário e Testes

### User Story 1 - Centralizar a produção em um único espaço (Priority: P1)

Como assistente de direção ou diretor, quero visualizar todos os objetivos, entregas e decisões da produção em um único lugar para não perder contexto e evitar que informações fiquem espalhadas em canais paralelos.

**Why this priority**: A centralização da produção é a base do produto e permite que o restante do sistema funcione com clareza, rastreabilidade e menos retrabalho.

**Independent Test**: Pode ser validado ao abrir a visão principal da produção e confirmar que cada objetivo, área, responsável, prazo e status aparecem num painel único, com cena e etapa quando informadas, sem depender de documentos externos.

**Acceptance Scenarios**:

1. **Given** que uma produção tem vários departamentos e documentos dispersos, **When** o usuário abre a aba Objetivos, **Then** ele vê um quadro Kanban com uma coluna para cada área, contendo apenas os objetivos que pode acessar.
2. **Given** que um objetivo possui uma cena ou etapa associada, **When** o usuário abre o item correspondente ou filtra o quadro, **Then** ele consegue localizar esse contexto e ver o resumo da decisão, responsável, links e próximos passos sem sair do app.
3. **Given** que o usuário precisa consultar indicadores, **When** ele abre a aba Resumo, **Then** ele vê cards numéricos e progresso por área limitados ao seu escopo de autorização.

---

### User Story 2 - Acompanhar o checklist por área com status claro (Priority: P1)

Como membro de uma área, quero visualizar o checklist dos meus objetivos e marcar tarefas como em andamento ou concluídas para manter o progresso da equipe visível e organizado.

**Why this priority**: A operação diária do app depende da clareza dos itens e da visibilidade do estado de cada entrega.

**Independent Test**: A funcionalidade é testável ao alterar o status de um objetivo e verificar que o progresso da área e os indicadores visuais refletem a mudança.

**Acceptance Scenarios**:

1. **Given** que um objetivo ainda não começou, **When** o usuário marca como em andamento, **Then** o item mostra o status ativo com o ícone do responsável e indica que há trabalho em progresso.
2. **Given** que um objetivo foi executado, **When** o usuário marca como concluído, **Then** o item comunica a conclusão por texto e tratamento visual e aumenta o percentual de progresso da área.

---

### User Story 3 - Colaborar entre áreas sem perder contexto (Priority: P1)

Como qualquer membro da equipe, quero abrir um objetivo compartilhado por mais de uma área para ver o contexto, adicionar comentários e colaborar sem precisar buscar informações em documentos paralelos.

**Why this priority**: O valor do produto está em reduzir o ruído operacional e permitir colaboração real entre departamentos com o mínimo de fricção.

**Independent Test**: Pode ser validado ao abrir um objetivo compartilhado, adicionar um comentário e confirmar que o histórico, o responsável e os links permanecem associados ao item.

**Acceptance Scenarios**:

1. **Given** que um objetivo de arte foi compartilhado explicitamente com cinematografia, **When** um membro de cinematografia abre o quadro, **Then** ele vê o item na coluna da área principal com indicação de que foi compartilhado com sua área.
2. **Given** que existe uma dúvida sobre a execução de um item, **When** um colega comenta ou responde, **Then** aquela informação fica registrada no contexto do objetivo para todos os envolvidos.

---

### User Story 4 - Supervisão de diretor e assistente de direção (Priority: P2)

Como diretor ou assistente de direção, quero acessar uma visão de supervisão com progresso por área para verificar se a visão do projeto está sendo seguida e onde é necessário intervir.

**Why this priority**: O acompanhamento do estado geral do projeto é central para a liderança e para a coordenação da produção.

**Independent Test**: Pode ser validado em uma visão de supervisão que apresente progresso geral, itens por área e documentos acessíveis para objetivos visíveis ao usuário.

**Acceptance Scenarios**:

1. **Given** que o usuário possui papel de Diretor ou Assistente de Direção, **When** ele acessa a aba Resumo, **Then** ele visualiza indicadores globais e o percentual de progresso de todas as áreas.
2. **Given** que um objetivo está visível para o supervisor, **When** o supervisor abre o conteúdo, **Then** ele consegue acessar o documento ou material de apoio correspondente independentemente do status do objetivo.
3. **Given** que o usuário é Diretor ou Assistente de Direção, **When** ele cria um objetivo com os campos obrigatórios, **Then** o objetivo nasce pendente e aparece imediatamente na coluna de sua área principal.

---

### User Story 5 - Login, perfil e personalização do contexto (Priority: P2)

Como usuário do sistema, quero me autenticar com SSO, preencher meu perfil e receber apenas os objetivos relevantes ao meu papel para manter a interface limpa e útil.

**Why this priority**: A personalização reduz ruído e melhora a clareza para cada integrante do time.

**Independent Test**: Pode ser validado ao autenticar um usuário e confirmar que o app exibe apenas papéis e objetivos relevantes para seu perfil.

**Acceptance Scenarios**:

1. **Given** que o usuário entra no MVP web responsivo, **When** faz login com Google SSO, **Then** o sistema cria a sessão e identifica o papel principal do perfil.
2. **Given** que o usuário possui mais de um papel, **When** ele entra no sistema, **Then** o app mostra os checklists associados aos papéis relevantes sem poluir a experiência.
3. **Given** que o usuário é membro de área, **When** ele abre a aba Resumo, **Then** indicadores, contagens e percentuais consideram somente objetivos de áreas próprias ou compartilhados com suas áreas.

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

- O que acontece quando um usuário tem mais de um papel e os objetivos dos papéis se sobrepõem? O MVP deve exibir a união dos objetivos visíveis sem duplicidade.
- Como o sistema trata um objetivo compartilhado por duas áreas que atualizam o mesmo item ao mesmo tempo? O MVP deve usar last write wins, sincronização em tempo real e histórico de alterações.
- O que acontece quando um membro tenta acessar um objetivo não pertencente à sua área e não compartilhado explicitamente com ele? O MVP deve negar o acesso.
- Como o sistema lida com links quebrados, arquivos ausentes ou contexto incompleto em um objetivo? O MVP deve exibir mensagem amigável sem perder dados já salvos.
- O que acontece quando uma tarefa está em andamento por mais de uma pessoa simultaneamente? O MVP deve exibir indicadores de usuários ativos no objetivo.
- Como a equipe registra uma decisão que altera um objetivo já concluído? O MVP deve registrar a alteração no histórico; estados de reabertura ficam fora do MVP.
- O que acontece quando uma área não possui objetivos visíveis para o usuário? A coluna deve permanecer visível com estado vazio, contagem zero e progresso 0%, sem revelar métricas não autorizadas.
- O que acontece quando a área principal também é selecionada para compartilhamento? O sistema deve remover ou rejeitar a duplicidade.
- O que acontece quando um membro comum tenta criar um objetivo ou editar seus campos estruturais? O backend deve negar a operação, mesmo que a chamada seja feita fora da interface.
- O que acontece quando o responsável informado não corresponde a um usuário válido da produção? O sistema deve rejeitar o cadastro e solicitar um responsável elegível.

## Requirements

### Functional Requirements

- **FR-001**: O sistema MUST centralizar a visão da produção em um painel principal com objetivos, áreas, responsáveis e estado de progresso.
- **FR-002**: O sistema MUST permitir que cada objetivo registre referências opcionais de cena e etapa, seja localizado por esses campos e use o prazo como referência de cronograma, mantendo a área principal como eixo do Kanban.
- **FR-003**: O sistema MUST oferecer checklists por área com objetivos em apenas três status no MVP: pendente, em andamento e concluído.
- **FR-004**: O sistema MUST permitir que cada objetivo registre resumo, visão do diretor, links, documentos, comentários e responsáveis.
- **FR-005**: O sistema MUST indicar o responsável atribuído e os usuários ativos em um objetivo em andamento, mostrando esse contexto aos usuários autorizados.
- **FR-006**: O sistema MUST calcular o progresso da área e da produção como o percentual de objetivos concluídos sobre o total de objetivos no escopo autorizado; o MVP MUST NOT manter percentual individual editável por objetivo.
- **FR-007**: O sistema MUST permitir que um objetivo seja compartilhado explicitamente com uma ou mais áreas, mantendo uma única área principal e exibindo indicação de compartilhamento aos membros autorizados.
- **FR-008**: O sistema MUST diferenciar os papéis de diretor, assistente de direção e demais áreas, adaptando a experiência conforme responsabilidades e permissões.
- **FR-009**: O sistema MUST fornecer visão de supervisão derivada exclusivamente dos papéis Diretor e Assistente de Direção, com indicadores globais e progresso geral por área.
- **FR-010**: O sistema MUST exibir documentos e links de um objetivo sempre que o objetivo estiver visível para o usuário, independentemente do status do objetivo.
- **FR-011**: O MVP MUST suportar login via Google SSO no web responsivo; Apple ID e app mobile nativo ficam fora do MVP.
- **FR-012**: O sistema MUST permitir que o usuário cadastre nome, papel e áreas de atuação em seu perfil.
- **FR-013**: O sistema MUST permitir auto-save para campos permitidos, documentos, links e comentários, usando last write wins em edições simultâneas no MVP.
- **FR-014**: O sistema MUST possibilitar anexar links e materiais de apoio diretamente ao contexto da tarefa.
- **FR-015**: O sistema MUST manter histórico de comentários, mudanças de status e alterações de documentos/links com usuário, data/hora, tipo e resumo da alteração.
- **FR-016**: O sistema MUST usar uma interface limpa, visualmente organizada e aderente ao Design System GOV.BR, priorizando componentes, fundamentos visuais, tokens oficiais, acessibilidade e consistência de interação.
- **FR-017**: O MVP MUST funcionar como web responsivo em desktop, tablet e navegador mobile, preservando a lógica de navegação e a organização de conteúdos.
- **FR-018**: O sistema MUST organizar a tela principal em abas acessíveis de Objetivos e Resumo, com Objetivos selecionada por padrão.
- **FR-019**: A aba Objetivos MUST apresentar um quadro Kanban horizontal com uma coluna persistente para cada área; áreas sem objetivos visíveis MUST exibir estado vazio sem revelar dados não autorizados.
- **FR-020**: A aba Resumo MUST exibir cards numéricos, resumo por área e visão de supervisão, usando escopo global para Diretor/AD e somente dados autorizados para membros de área.
- **FR-021**: Somente Diretor e Assistente de Direção MUST poder criar objetivos e editar título, área principal, cena, etapa, responsável, prazo, resumo, visão do diretor e áreas compartilhadas.
- **FR-022**: Um novo objetivo MUST exigir título, área principal, responsável elegível, prazo, resumo e visão do diretor, iniciar com status pendente e impedir que a área principal também seja compartilhada.
- **FR-023**: Membros de área MUST poder alterar status, comentar e manter documentos/links somente em objetivos próprios ou compartilhados com suas áreas, mas MUST NOT editar campos estruturais.
- **FR-024**: O sistema MUST validar autorização e escopo no backend; ocultar controles na interface MUST NOT ser considerado mecanismo suficiente de segurança.

### Non-Functional Requirements

- **NFR-001**: O sistema MUST adotar os padrões de interface do Design System GOV.BR (DSGOV), conforme a documentação oficial em https://www.gov.br/ds/home, incluindo padrões de design, fundamentos visuais, utilitários CSS e fluxo de desenvolvimento.
- **NFR-002**: O sistema MUST priorizar componentes e tokens oficiais do DSGOV para manter consistência visual, acessibilidade, previsibilidade de interação e aderência ao Padrão Digital de Governo nas experiências web e mobile.
- **NFR-003**: O sistema MUST atender requisitos de acessibilidade aplicáveis, incluindo operação por teclado, foco visível, nomes acessíveis em controles interativos, progresso anunciado para tecnologias assistivas, status comunicados por texto e visual, e contraste compatível com WCAG AA/eMAG quando aplicável.
- **NFR-004**: O MVP MUST exibir estado offline quando perder conectividade, avisar falhas de sincronização em tempo real e preservar dados já salvos no servidor.

### Key Entities

- **Usuário**: Representa qualquer pessoa que acessa o sistema, com nome, papel, áreas associadas e autenticação.
- **Papel**: Define o nível de acesso e a visão relevante para o usuário, como diretor, assistente de direção, fotografia, arte, produção e outros.
- **Área**: Representa um departamento ou especialidade dentro da produção, como cinematografia, arte, produção, sonorização e direção.
- **Objetivo**: Representa uma tarefa simples associada a uma área principal, com título, referências opcionais de cena e etapa, status, prazo, resumo, visão do diretor, responsável elegível, documentação, comentários e histórico; não possui percentual individual editável.
- **Compartilhamento de Objetivo**: Relação entre um objetivo e uma área secundária autorizada, distinta da área principal.
- **Checklist**: Estrutura central de acompanhamento da área, composta por objetivos e indicadores de progresso.
- **Documento**: Recurso de apoio vinculado ao objetivo, podendo ser link, arquivo, moodboard, planilha, mapa ou pesquisa.
- **Comentário**: Registro de conversa, sugestão ou decisão dentro do contexto de um objetivo.
- **Histórico**: Registro auditável de comentários adicionados, mudanças de status e alterações de documentos/links, contendo usuário, data/hora, tipo e resumo da alteração.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Usuários conseguem localizar o status de uma tarefa e o próximo passo em menos de 30 segundos em sessões comuns de uso.
- **SC-002**: Um membro de área consegue atualizar um objetivo para em andamento ou concluído sem sair do fluxo principal do app.
- **SC-003**: O diretor ou assistente de direção consegue visualizar o progresso geral de todas as áreas a partir de um único painel.
- **SC-004**: O sistema reduz a necessidade de buscas em documentos paralelos ao manter contexto, links e decisões dentro da tarefa.
- **SC-005**: A equipe consegue colaborar em objetivos compartilhados com comentários, responsáveis e materiais de apoio sem perda de contexto.
- **SC-006**: Diretor ou Assistente de Direção consegue criar um objetivo válido e vê-lo na coluna correta em menos de 60 segundos.
- **SC-007**: Um membro identifica visualmente se um objetivo pertence à sua área ou foi compartilhado, sem acessar dados agregados de áreas não autorizadas.

## Assumptions

- Os usuários têm acesso estável à internet e utilizam device com suporte mínimo para web e mobile.
- A produção audiovisual pode ter múltiplos papéis e áreas simultâneas, mas todas devem respeitar o mesmo modelo de checklist e contexto.
- O fluxo de produção pode variar por projeto, porém a operação central do app permanece consistente e compartilhada.
- O MVP será construído como web responsivo com React; app mobile nativo com React Native fica como evolução futura.
- A autenticação por Google SSO será a base de acesso do MVP, com políticas de permissão apropriadas para cada papel.
