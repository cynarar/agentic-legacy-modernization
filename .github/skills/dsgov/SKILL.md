---
name: "dsgov"
description: "Aplicar os padrões do Design System GOV.BR (DSGOV), incluindo padrões de interface, fundamentos visuais, utilitários CSS e fluxo de desenvolvimento."
compatibility: "Projetos web e mobile que precisam aderir ao Padrão Digital de Governo"
metadata:
  author: "local"
  source: "https://www.gov.br/ds/home"
---

# DSGOV

Use esta skill quando precisar especificar, revisar ou implementar interfaces alinhadas ao Design System GOV.BR, também chamado de Padrão Digital de Governo.

## Fontes Oficiais

- Página inicial: https://www.gov.br/ds/home
- Padrões: https://www.gov.br/ds/padroes/visao-geral
- Fundamentos visuais: https://www.gov.br/ds/fundamentos-visuais/visao-geral
- Utilitários: https://www.gov.br/ds/utilitarios/visao-geral
- Fluxo de desenvolvimento: https://www.gov.br/ds/como-comecar/fluxo-dev

Sempre trate a documentação oficial como fonte de verdade. Quando houver dúvida sobre um componente, padrão, token, dependência ou comportamento, consulte a página específica antes de implementar.

## Princípios de Aplicação

- Use o DSGOV para garantir consistência visual, acessibilidade, previsibilidade de interação e aderência ao Padrão Digital de Governo.
- Prefira componentes, templates, tokens e utilitários oficiais antes de criar componentes customizados.
- Preserve a semântica HTML, os estados interativos, a hierarquia visual e os comportamentos descritos pela documentação.
- Em mobile, aplique as orientações do DSGOV respeitando as diretrizes nativas de Android e iOS quando apropriado.
- Não recrie visualmente um componente oficial se existir componente DSGOV equivalente adequado ao caso de uso.

## Padrões de Interface

Ao desenhar ou revisar fluxos, considere os padrões documentados para:

- ajuda e comunicação;
- densidade e content overflow;
- dropdown, collapse e navegação;
- formulários;
- gráficos;
- onboarding;
- empty states;
- UX writing, princípios de escrita e microcopy;
- padrões mobile para Android e iOS.

Checklist rápido:

- A navegação permite completar tarefas sem perda de contexto?
- Formulários agrupam entradas relacionadas e usam validação e feedback claros?
- Estados vazios informam a situação e oferecem uma próxima ação útil?
- Textos de interface são objetivos, consistentes e orientados à tarefa?
- A densidade da tela favorece leitura e operação no contexto de uso?

## Fundamentos Visuais

Use os fundamentos visuais oficiais como base para qualquer decisão visual:

- cores: aplique a paleta e suas funções de superfície, leitura, borda e estados;
- tipografia: use Rawline como fonte oficial; quando indisponível, use Raleway como alternativa indicada;
- iconografia: use ícones para representar ações, estados e informações com significado claro;
- espaçamento e grid: organize layouts por escalas e breakpoints do design system;
- superfície, borda, arredondamento e elevação: use hierarquia visual sem ornamentação arbitrária;
- estados: diferencie foco, hover, ativo, desabilitado, erro, sucesso e demais feedbacks de forma consistente;
- movimento: use duração e easing do DSGOV para animações funcionais, não decorativas.

## Utilitários CSS e JavaScript

Os utilitários CSS do DSGOV fornecem classes para layout, disposição e estilo, incluindo:

- cores;
- espaçamento;
- grid;
- elevação;
- bordas e arredondamento;
- overflow;
- display e flexbox;
- movimento;
- tipografia e textos.

Use utilitários quando eles expressarem diretamente a intenção visual. Evite CSS customizado que duplique tokens ou classes oficiais sem necessidade.

Os utilitários JavaScript documentados cobrem comportamentos como accordion, checkgroup, collapse, dropdown, scrim e tooltip. Inicialize comportamentos conforme a documentação do componente e limpe instâncias nos ciclos de desmontagem quando usar frameworks.

## Fluxo de Desenvolvimento

Abordagem recomendada:

1. Prefira a biblioteca de Web Components do DSGOV para projetos modernos.
2. Instale também `@govbr-ds/core` quando precisar de utilitários CSS como grid, cores e espaçamentos fora dos componentes.
3. Em integrações com React, Vue, Angular ou outros frameworks, respeite o ciclo de vida: inicialize componentes na montagem, use refs adequadas para DOM e limpe instâncias na desmontagem.
4. Para implementação HTML/CSS/JavaScript com biblioteca de componentes, use os arquivos distribuídos pelo pacote npm `@govbr-ds/core`.
5. Carregue dependências externas antes dos arquivos do DSGOV, incluindo fontes e ícones necessários.
6. Evite depender de CDN próprio antigo do DSGOV; priorize npm ou arquivos baixados e versionados localmente conforme a orientação oficial.

CSS disponível no pacote `@govbr-ds/core`:

- `core.min.css`: versão completa com componentes e utilitários CSS completos.
- `core-lite.css`: versão otimizada com conjunto reduzido de utilitários; tokens de design continuam disponíveis para CSS customizado.

## Critérios de Revisão

Antes de concluir uma entrega de interface DSGOV, verifique:

- componentes oficiais foram usados sempre que havia equivalência;
- cores, tipografia, grid, espaçamento, estados e movimento seguem fundamentos oficiais;
- utilitários CSS substituem estilos customizados redundantes;
- dependências e arquivos do DSGOV são carregados na ordem correta;
- componentes interativos são inicializados e descartados corretamente;
- fluxos, formulários, navegação, empty states e microcopies seguem os padrões documentados;
- a solução mantém acessibilidade e previsibilidade em web e mobile.