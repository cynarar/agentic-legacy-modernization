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

## Mão na massa

### Usando o spec kit


#### Roteiro: Instalação e Configuração do Spec Kit (Windows 11 + VS Code)

Ferramenta: [github/spec-kit](https://github.com/github/spec-kit) — toolkit para Spec-Driven Development (SDD), integrado ao GitHub Copilot.

---

##### Etapa 1 — Instalar os pré-requisitos

**O que:** Git, Python 3.11+ e a extensão GitHub Copilot Chat no VS Code.

**Por quê:** o Spec Kit é distribuído como um pacote Python (`specify-cli`) e usa Git para versionar o projeto. Sem os dois, o instalador não funciona.

```powershell
git --version
python --version
```

> ⚠️ **Pegadinha comum no Windows:** o Git pode estar instalado (ex: via GitHub Desktop) mas não estar no `PATH` do PowerShell, mesmo funcionando dentro do VS Code. Se `git --version` falhar, reinstale pelo [instalador oficial](https://git-scm.com/download/win) mantendo marcada a opção "Git from the command line and also from 3rd-party software", ou adicione manualmente a pasta do Git (ex: `C:\Program Files\Git\cmd`) em Variáveis de Ambiente > Path.
>
> O mesmo vale para o Python: na instalação, marque **"Add python.exe to PATH"**. Depois de instalar qualquer um dos dois, feche todos os terminais (inclusive o do VS Code) e abra um novo antes de testar.

---

##### Etapa 2 — Instalar o `uv`

**O que:** gerenciador de pacotes Python usado pelo Spec Kit para rodar o `specify-cli` sem sujar o ambiente Python global.

**Por quê:** o Spec Kit recomenda `uv` em vez de `pip` porque instala a CLI isolada, evita conflitos de dependência com outros projetos Python da máquina, e permite atualizar/trocar versão facilmente depois.

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Feche e abra um novo terminal, depois confirme:

```powershell
uv --version
```

---

##### Etapa 3 — Instalar o Specify CLI

**O que:** o comando `specify`, que gera a estrutura de pastas e comandos do Spec Kit dentro do projeto.

**Por quê:** é essa CLI que cria os arquivos `.specify/` e os comandos `/speckit.*` que o Copilot vai reconhecer no chat.

```powershell
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

(Para travar numa versão específica, adicione `@vX.Y.Z` ao final da URL, usando uma tag de [github.com/github/spec-kit/releases](https://github.com/github/spec-kit/releases).)

---

##### Etapa 4 — Inicializar o Spec Kit no projeto

**O que:** aponta o projeto atual (o `--here` usa a pasta em que você já está, em vez de criar uma nova) para usar o Spec Kit com o GitHub Copilot como agente.

**Por quê:** essa etapa cria a pasta `.specify/` (templates e memória do projeto) e os prompts/comandos (`.github/prompts/` ou skills) que ativam o fluxo de Spec-Driven Development dentro do Copilot Chat.

```powershell
specify init --here --integration copilot --integration-options="--commands"
```

> Se o terminal travar num menu que as setas do teclado não conseguem navegar, use `specify init --here --integration copilot --non-interactive`.

---

##### Etapa 5 — Abrir o projeto no VS Code e ativar o modo Agent

**O que:** garantir que a extensão GitHub Copilot Chat está ativa e o chat está em **modo Agent** (é o modo que reconhece os comandos `/speckit.*`).

**Por quê:** os comandos do Spec Kit são interpretados como prompts/skills que só funcionam quando o Copilot está operando de forma agentiva (lendo e escrevendo arquivos do projeto), não no modo de chat simples.

```powershell
code .
```

---

##### Etapa 6 — Definir a constitution do projeto

**O que:** o comando `/speckit.constitution` cria (ou atualiza) o documento de princípios que vai guiar todas as etapas seguintes (specify, plan, tasks, implement).

**Por quê:** é o único passo "único por projeto" do fluxo — a constitution funciona como uma referência que o Copilot consulta para manter consistência de linguagem, padrões e prioridades ao longo de todo o desenvolvimento. Por isso faz sentido gerá-la a partir do `requisitos.txt`, e já fixar o idioma de interação em PT-BR aqui, no início.

**Prompt a ser executado no Copilot Chat:**

```
/speckit.constitution Crie a constitution deste projeto com base no conteúdo do arquivo requisitos.txt.

A partir de agora, todas as nossas interações neste projeto devem ser em português do Brasil (PT-BR) — incluindo as respostas, os documentos gerados (spec, plan, tasks) e os comentários de código, quando fizer sentido.

Para cada etapa que você realizar neste e nos próximos comandos do fluxo Spec-Driven Development, explique antes de executar: o que você vai fazer e por que está fazendo dessa forma, com base nos requisitos e na constitution.
```

---

##### Referência rápida — próximas etapas do fluxo

Depois da constitution definida, o fluxo segue nesta ordem:

| Ordem | Comando | O que faz |
|---|---|---|
| 1 | `/speckit.constitution` | Define os princípios do projeto (feito acima) |
| 2 | `/speckit.specify` | Descreve o que construir (requisitos, o "quê" e "porquê") |
| 3 | `/speckit.plan` | Define a stack técnica e arquitetura (o "como") |
| 4 | `/speckit.tasks` | Quebra o plano em tarefas executáveis |
| 5 | `/speckit.implement` | Executa as tarefas e gera o código |
| 6 | `/speckit.converge` | Reavalia o código contra spec/plan/tasks e aponta o que falta (repetir até "Converged") |

---



## Material complementar

### Apresentações
- [Hierarquia de configuração: como arquivos de config moldam seus agentes](https://agenticdevopsplatform.ai/decks/ConfigurationHierarchy_Deck_v6_0_0_2026-06-11_multi.html)
- [Desenvolvimento Orientado a Especificação e Orientado a Testes, com GitHub Spec-Kit e Specky](https://agenticdevopsplatform.ai/decks/SpecDrivenTestDrivenDevelopmentSpecky_Deck_v1_0_0_2026-06-10_multi.html)
- [Quatro camadas de engenharia para IA agêntica em escala empresarial](https://agenticdevopsplatform.ai/decks/Context_Platform_Stack_Deck_v2_0_0_2026-04-27_multi.html)

### Ferramentas
- [Speckit](https://github.com/github/spec-kit)
- [Specky](https://getspecky.ai/)