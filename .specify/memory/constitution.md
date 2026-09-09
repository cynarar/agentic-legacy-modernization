<!--
Sync Impact Report
- Version change: 1.0.0 -> 2.0.0
- Modified principles:
	- I. Centralização da produção como fonte de verdade -> I. Fonte única de verdade e contexto operacional
	- II. Colaboração orientada por papéis e permissões -> II. Autorização por papel e escopo no servidor
	- III. Checklist de objetivos e rastreio de progresso são obrigatórios -> III. Objetivos simples e progresso agregado
	- IV. Transparência de responsabilidade, contexto e apoio em tempo real -> IV. Colaboração contextual e rastreável
	- V. Experiência de uso clara, acessível e visualmente organizada -> V. Experiência operacional acessível
- Added sections: Restrições de Produto e Arquitetura; Fluxo de Desenvolvimento e Qualidade
- Removed sections: Requisitos de Produto e UX; Arquitetura e Stack; Fluxo de Desenvolvimento e Qualidade anterior
- Deferred items: none
-->

# Constituição do Production Flow

## Core Principles

### I. Fonte única de verdade e contexto operacional
O Production Flow MUST ser a fonte oficial para objetivos, decisões, responsáveis, prazos,
cenas, etapas, documentos, comentários e progresso da produção audiovisual. Cada objetivo
MUST manter próximos o resumo, a visão do diretor, os materiais e o próximo passo necessários
à execução. Integrações e links externos MAY armazenar artefatos, mas o contexto e o estado
oficial MUST permanecer rastreáveis no sistema.

Toda funcionalidade MUST reduzir a necessidade de procurar decisões em canais paralelos. Uma
entrega que replique informação sem definir sua origem oficial ou que fragmente o contexto do
objetivo viola este princípio.

### II. Autorização por papel e escopo no servidor
Toda leitura, mutação e agregação MUST ser autorizada no backend pelo usuário, produção, papel
e áreas associadas. Ocultar controles na interface MUST NOT ser tratado como autorização.
Diretor e Assistente de Direção MUST possuir supervisão global da produção; membros MUST acessar
somente objetivos de suas áreas ou compartilhados explicitamente com uma delas.

Somente Diretor e Assistente de Direção MUST criar objetivos ou alterar campos estruturais.
Membros autorizados MAY alterar status, comentar e manter documentos e links. Consultas,
resumos, contagens, progresso e eventos em tempo real MUST aplicar o mesmo escopo para impedir
vazamento por dados agregados ou canais secundários.

### III. Objetivos simples e progresso agregado
O objetivo MUST representar uma tarefa simples com uma área principal e exatamente um dos
status `pending`, `in_progress` ou `complete`. Cena e etapa MUST ser referências opcionais de
contexto; o prazo MUST representar a referência de cronograma no MVP. A área principal MUST
continuar sendo o eixo do Kanban mesmo quando filtros de cena ou etapa forem aplicados.

O sistema MUST NOT persistir ou permitir edição de percentual individual por objetivo. O
progresso de área ou produção MUST ser calculado por objetivos concluídos divididos pelo total
de objetivos no escopo autorizado, retornando 0% para conjuntos vazios. Essa regra mantém o
estado verificável e evita métricas subjetivas.

### IV. Colaboração contextual e rastreável
Objetivos compartilhados MUST manter uma única área principal e MAY autorizar uma ou mais áreas
secundárias, sem duplicar a área principal. Usuários autorizados MUST identificar o responsável,
os participantes ativos e o contexto de compartilhamento sem criar cópias do objetivo.

Comentários MUST ser append-only no MVP. Mudanças de status, comentários e alterações de
documentos ou links MUST gerar histórico com usuário, data/hora, tipo e resumo na mesma
transação da mutação relevante. Sincronização em tempo real e auto-save MUST preservar os dados
confirmados no servidor e MUST comunicar falhas; presença efêmera MUST NOT substituir o
responsável designado.

### V. Experiência operacional acessível
A interface MUST ser uma ferramenta operacional responsiva, organizada para leitura rápida,
comparação e ação repetida. O Kanban MUST manter uma coluna por área, inclusive em estado vazio,
sem revelar dados não autorizados. Objetivos e Resumo MUST ser abas acessíveis, com Objetivos
selecionada inicialmente.

Componentes, tokens, semântica, foco, contraste e padrões de interação MUST seguir o Design
System GOV.BR, WCAG AA e eMAG quando aplicáveis. A composição visual MUST preservar a natureza
de ferramenta de produção, sem simular um portal institucional ou exigir wordmark gov.br.
Status MUST ser comunicado por texto e tratamento visual, nunca apenas por cor. Fluxos MUST
funcionar por teclado e em navegadores desktop, tablet e mobile.

## Restrições de Produto e Arquitetura

- O MVP MUST ser uma aplicação web responsiva em React 19 e TypeScript, com API Fastify,
	PostgreSQL, Prisma e contratos validados por Zod.
- Estado remoto MUST ser gerenciado como dado do servidor; Zustand MAY armazenar apenas estado
	efêmero de interface e presença.
- Autenticação web MUST usar Google OAuth 2.0/OIDC com sessão em cookie `HttpOnly`, `Secure` e
	`SameSite=Lax`.
- Apple ID, React Native, publicação em lojas, notificações push, escrita offline, exclusão ou
	reabertura de objetivos e resolução manual avançada de conflitos MUST permanecer fora do MVP,
	salvo emenda constitucional ou alteração de escopo formalmente aprovada.
- Documentos e links MUST estar disponíveis sempre que o objetivo estiver autorizado,
	independentemente do status.
- Alterações concorrentes MAY usar last write wins no MVP, mas MUST preservar histórico e
	comunicar conflitos ou falhas de sincronização.
- O protótipo em `prototipo/` MAY orientar hierarquia e interação, mas dados em memória, usuários
	simulados, CDN, IDs no cliente e permissões apenas visuais MUST NOT ser levados à produção.
- Comunicação, especificações, planos, tarefas e documentação do projeto MUST usar português do
	Brasil. Identificadores de código MAY permanecer em inglês para acompanhar convenções técnicas.

## Fluxo de Desenvolvimento e Qualidade

Cada mudança MUST partir de requisito ou tarefa rastreável e MUST preservar a separação entre
protótipo e arquitetura de produção. Antes da implementação, o plano MUST verificar aderência a
esta constituição. Exceções MUST ser documentadas na seção de complexidade do plano, com motivo,
alternativas rejeitadas e estratégia de remoção quando temporárias.

Mudanças MUST incluir validação proporcional ao risco:

- políticas e endpoints MUST ter testes de integração positivos e negativos, incluindo `401`,
	`403`, escopo multiárea e prevenção de vazamento por agregados;
- regras de progresso, status e compartilhamento MUST ter testes determinísticos;
- fluxos críticos MUST ter testes de componente ou E2E por papel;
- interface MUST ser validada para teclado, foco, nomes acessíveis, contraste, responsividade e
	ausência de sobreposição;
- realtime, auto-save e falhas de rede MUST demonstrar preservação de dados confirmados;
- lint, typecheck e testes afetados MUST passar antes de uma tarefa ser considerada concluída.

Revisões MUST rejeitar complexidade sem requisito, duplicação de estado persistente no cliente,
autorização apenas visual, percentual individual de objetivo e alterações que ampliem o MVP sem
decisão explícita. O Definition of Done MUST incluir rastreabilidade, validação executável e
documentação atualizada quando contratos ou comportamentos mudarem.

## Governance

Esta constituição prevalece sobre práticas ad hoc e documentos conflitantes. Especificações,
planos, tarefas, implementação e revisões MUST demonstrar conformidade. Quando houver conflito,
o artefato dependente MUST ser corrigido; a constituição não pode ser reinterpretada
silenciosamente para acomodar uma implementação existente.

Emendas MUST registrar motivação, impacto nos artefatos dependentes, plano de migração quando
necessário e aprovação explícita do responsável pelo projeto. Após uma emenda, especificações,
planos e tarefas afetados MUST ser revisados antes de continuar a implementação.

O versionamento MUST seguir SemVer para governança: MAJOR para remoções ou redefinições
incompatíveis de princípios; MINOR para novos princípios, seções ou expansão material de regras;
PATCH para esclarecimentos sem mudança normativa. A data de ratificação MUST permanecer a data
da adoção original; a data de última emenda MUST refletir a alteração normativa mais recente.

Toda revisão de feature ou release MUST conferir autorização no backend, escopo de dados,
rastreabilidade, acessibilidade, testes e limites do MVP. Violações MUST bloquear a conclusão até
serem corrigidas ou aprovadas por emenda constitucional.

**Version**: 2.0.0 | **Ratified**: 2026-09-09 | **Last Amended**: 2026-09-09
