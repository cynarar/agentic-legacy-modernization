<!--
Sync Impact Report
- Version change: 0.0.0 → 1.0.0
- Modified principles: none → I. Centralização da produção, II. Colaboração orientada por papéis, III. Checklist e rastreio de progresso, IV. Transparência de status e contexto, V. Experiência de uso e design sustentado
- Added sections: Requisitos de Produto e UX, Arquitetura e Stack, Fluxo de Desenvolvimento e Qualidade
- Removed sections: none
- Deferred items: none
-->

# Constituição do Projeto: Production Flow

## Core Principles

### I. Centralização da produção como fonte de verdade
Todo projeto de produção audiovisual deve ter um único espaço de referência para objetivos, decisões, arquivos, cronogramas, estágios e responsáveis. Informações dispersas em Google Drive, WhatsApp e documentos paralelos NÃO podem ser consideradas a fonte oficial do status do projeto.

A operação do produto deve priorizar a organização por área, por cena, por etapa e por cronograma, para que qualquer membro da equipe consiga responder rapidamente: o que foi decidido, quem está responsável, o que falta e qual é o próximo passo.

### II. Colaboração orientada por papéis e permissões
O sistema deve reconhecer papéis como diretor, assistente de direção, direção de fotografia, arte, produção e demais áreas, e adaptar a visão do usuário conforme suas responsabilidades e nível de supervisão. Cada papel recebe objetivos relevantes para sua área e, quando houver sobreposição, o app deve expor a colaboração sem poluir a interface.

Diretor e assistente de direção têm visão de supervisão e podem acompanhar progresso geral, enquanto áreas específicas priorizam o checklist do seu domínio. Permissões devem ser explícitas, com acessos controlados a documentos concluídos e espaços colaborativos compartilhados.

### III. Checklist de objetivos e rastreio de progresso são obrigatórios
Cada área deve operar com um checklist central de objetivos, etapas e entregas, com status de em andamento, concluído e pendente. Cada item deve conter contexto suficiente para a execução: visão do diretor, resumo da discussão, links, arquivos e observações relevantes.

O estado do item deve ser observável por todos os envolvidos, com indicadores de progresso, responsáveis e histórico de atualização. O sistema deve estimular a entrega incremental e a visibilidade do avanço da produção sem perda de contexto.

### IV. Transparência de responsabilidade, contexto e apoio em tempo real
Quando uma tarefa estiver em andamento, o sistema deve sinalizar quem está trabalhando nela e permitir que outros membros saibam com quem conversar para obter contexto ou apoio. Quando a tarefa for concluída, a área deve sinalizar o avanço e a informação deve refletir no progresso total da equipe.

Comentários, sugestões e revisões dentro de cada objetivo devem facilitar a colaboração sem dispersar a discussão em canais externos. O contexto do que já foi definido deve estar sempre próximo do item em execução para evitar retrabalho e buscas em múltiplos documentos.

### V. Experiência de uso clara, acessível e visualmente organizada
A interface deve ser simples, clean, legível e funcional, com foco em clareza e redução de ruído visual. A paleta deve usar tons pastéis claros, fundo branco e contrastes adequados para garantir boa legibilidade e UX-friendly.

A experiência deve priorizar rapidez de compreensão, navegação por áreas e itens, acesso a documentos e status de andamento sem exigir múltiplas buscas. O app deve funcionar de forma consistente em web e mobile, com auto-save e sincronização de alterações em tempo real.

## Requisitos de Produto e UX

O produto é um app web com adaptação mobile para servir como “bíblia de produção online interativa”, centralizando toda a informação de pré-produção e acompanhamento de áreas por departamento. O usuário faz login com SSO do Google e, no mobile, também deve existir opção de login com Apple ID, conforme o contexto de uso.

Ao criar ou completar o perfil, o usuário informa nome e papel. O sistema adapta a experiência conforme o papel e as áreas associadas, destacando objetivos relevantes e, quando necessário, múltiplos checklists. Caso o usuário tenha mais de um papel, o app pode exibir todos os contextos relevantes sem redundância funcional.

Cada objetivo deve expor: resumo do que normalmente é feito para esse tipo de documento; visão do diretor para aquele item; links para pesquisa, moodboards, gráficos, mapas, planilhas ou documentos; espaço para comentários e sugestões; e estado do progresso. O sistema deve permitir que a tarefa seja marcada como em andamento ou concluída e que seu status seja visível ao restante da equipe.

O app deve suportar a organização por área e por colaboração cruzada entre áreas, permitindo que duas ou mais áreas compartilhem o mesmo objetivo. O conteúdo central deve incluir documentos e recursos anexados por link, sem depender exclusivamente de arquivos locais ou canais paralelos.

## Arquitetura e Stack

A arquitetura do produto deve seguir o modelo moderno de aplicação web e mobile com uma base compartilhada de regras de negócio, dados e fluxo de trabalho. O frontend web deve ser implementado em React e a versão mobile em React Native, mantendo consistência funcional e visual.

O sistema deve contar com autenticação baseada em SSO, banco de dados robusto para persistência de dados, sincronização em tempo real entre os participantes e mecanismo de auto-save contínuo. A solução deve ser concebida para suportar colaboração simultânea em um mesmo objetivo, com indicadores de responsável, status e contexto acessível em tempo real.

A modelagem de dados deve favorecer: usuários, papéis, áreas, cenas, objetivos, etapas, documentos e comentários; além de relacionamento claro entre itens e dependências. Qualquer desenho técnico deve preservar a necessidade de organização por espaço de trabalho, colaboração entre áreas e rastreio de produção.

## Fluxo de Desenvolvimento e Qualidade

O desenvolvimento deve seguir a lógica de priorizar o valor de negócio sobre complexidade artificial. Nenhuma funcionalidade pode ser entregue sem considerar: clareza de papéis, visibilidade de progresso, capacidade de colaboração e reduzido atrito na operação diária de produção.

Todo item de desenvolvimento deve ser validado em relação a estes critérios:
- a informação de status está centralizada;
- os papéis e permissões refletem o contexto real da produção;
- a interface não exige busca dispersa em múltiplos canais;
- a colaboração é visível sem aumentar ruído operacional;
- o progresso da área e do projeto consegue ser entendido rapidamente.

A qualidade deve ser medida pela clareza da operação, pela confiabilidade da sincronização e pela capacidade da equipe de tomar decisões com base em um único sistema de registro. A estética e a usabilidade devem ser tratadas como parte do produto, não como camada superficial.

## Governance

Esta Constituição define as regras de governança do projeto e deve prevalecer sobre práticas ad hoc, documentos paralelos e decisões informais. Qualquer alteração no escopo, na arquitetura, na UX, no modelo de permissões ou no fluxo de trabalho deve ser registrada e revisada antes de entrar em execução.

A revisão da constituição deve seguir estas regras:
- todas as mudanças relevantes devem ser documentadas e justificadas;
- decisões de arquitetura, permissões e produto devem ser avaliadas em relação aos princípios desta constituição;
- mudanças de grande impacto exigem validação antes da implementação;
- qualquer divergência de escopo ou comportamento deve ser corrigida antes do fechamento da tarefa.

A versão do projeto será gerenciada usando semver, com incrementos por mudança maior, menor ou patch conforme impacto nas regras de governança e na definição do produto. O projeto também deve manter a linguagem de comunicação em português do Brasil nas interações de planejamento, especificação e documentação, preservando clareza e consistência para a equipe.

**Version**: 1.0.0 | **Ratified**: 2026-09-09 | **Last Amended**: 2026-09-09
