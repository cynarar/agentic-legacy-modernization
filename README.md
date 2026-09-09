# Curso de Agentic Legacy Modernization - Microsoft

## Definições

### Agentes (Estrutura)

- Missão
- Ativação e escopo
- Princípios de funcionamento
- Fluxo de trabalho
- Definir o que faz 
    - Exemplos
    - Melhores práticas
    - Padrões
    - Antipadrões que o agente ajeita
- Definir o que não faz
- Formato de saída
- Conceito de pronto
- Integrações com outros agentes

Referência: [awesome-harness-primitive](https://github.com/paulasilvatech/awesome-harness-primitives/) (Catálogo no github)

### Copilot instructions
- Ideal é limitar a 100 linhas para não gastar muitos tokens. 
- Organização das pastas
- copilot-instructions-blueprint-generator (Skill para criar copilot-instructions no repositorio awesome-copilot)

### Prompts
- É um arquivo de execução de uma única vez
- Serve para executar manualmente

### Skills
- Habilidades gerais
- Tem as melhores práticas
- Pode ser reutilizadas por todos

### Copilot harness
- Permite que você mude essa infraestrutura de execução
- Usar quando precisar que o seu agente de IA realize raciocínio complexo, execute tarefas em múltiplas etapas e tome decisões autônomas

### Hooks
- Servem para executar scripts ou comandos automaticamente em momentos específicos do ciclo de vida da IA, permitindo automatizar tarefas, injetar contexto ou aplicar regras de segurança de forma determinística
- Os hooks possuem execução garantida por código
- Ele sobrescreve o que for digitado no chat
#### Exemplos
- Você pode criar um hook que intercepta comandos que o Copilot tenta rodar no seu terminal. Se o Copilot tentar executar algo destrutivo por engano (como rm -rf / ou um script SQL com DROP TABLE), o hook analisa o comando e bloqueia a execução imediatamente
- Automação de Qualidade de Código (Linting e Formatação):Configurar o Copilot para rodar o Prettier
- Fazer com que scripts rodem logo no início do chat para buscar variáveis de ambiente, ler logs recentes de erro ou verificar o estado do repositório Git, alimentando o Copilot com essas informações cruciais antes de você enviar a primeira mensagem
- Registrar todas as interações, ferramentas usadas e alterações feitas pela IA em um arquivo de log local ou servidor da empresa para fins de conformidade ou depuração

## Tabela comparativa de primitivos

Aqui está a tabela:

| Primitivo | Para que serve | Exemplo prático |
|---|---|---|
| **Agents / Chat modes** | Define uma persona/papel específico para o Copilot, com um conjunto de ferramentas e instructions associadas, selecionável no dropdown do chat. Arquivo: `*.chatmode.md`. | Um chat mode "Code Reviewer" que só tem acesso a ferramentas de leitura/análise (nunca edita arquivos) e segue um checklist de revisão de PR. |
| **Skills** | Empacotam conhecimento reutilizável e específico de domínio (boas práticas, passo a passo, contexto de negócio) que o agente consulta quando a tarefa é relevante. Ficam em `.github/skills`. | Uma skill "geração-de-relatorio-financeiro" com instruções de formatação, fórmulas padrão e template que o agente carrega só quando o pedido envolve relatórios financeiros. |
| **Hooks** | Executam comandos de shell customizados em pontos-chave da execução do agente (início/fim de sessão, antes/depois de usar uma ferramenta), permitindo aprovar/bloquear ações, logging e validações. Arquivo: `.github/hooks/*.json`. | Um hook `preToolUse` que bloqueia automaticamente qualquer comando `bash` contendo `rm -rf` antes que o agente o execute. |
| **Instructions** | Diretrizes contínuas que o Copilot segue em todas as interações (padrões de código, convenções de projeto, estilo). Arquivo: `.github/copilot-instructions.md` ou `*.instructions.md`. | Uma instruction dizendo "sempre use TypeScript strict mode e nomeie componentes React em PascalCase" aplicada a todo o repositório. |
| **Harness** | Não é um arquivo, e sim o ambiente/runtime que hospeda o agente — orquestra o loop de raciocínio, chamadas de ferramentas, gestão de contexto e memória. Cada plataforma (Copilot Chat no VS Code, Claude Code, etc.) tem seu próprio harness. | O próprio VS Code + extensão Copilot Chat atuando como harness: decide quando chamar uma tool, injeta as instructions no contexto, gerencia o histórico da conversa. |
| **Prompts** | Prompts reutilizáveis e invocáveis sob demanda para tarefas pontuais e específicas (não ficam ativos o tempo todo como as instructions). Arquivo: `*.prompt.md`, chamado via `/nome-do-prompt`. | Um prompt file `/explain-code` que recebe um trecho de código e o público-alvo, e retorna uma explicação didática. |


## Dicas: 
- É melhor que os primitivos estejam em inglês, para gastar menos tokens (Entre 20 e 25% a menos)
- Exemplos de tipos primitivos: *.instructions.md, prompts, agentes customizados, skills, hooks...
- Tokens de cache custam 10% a mais