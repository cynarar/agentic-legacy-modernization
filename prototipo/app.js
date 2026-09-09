const users = [
  {
    id: 'sofia',
    name: 'Sofia Almeida',
    role: 'Assistente de Direção',
    roles: ['assistantDirector', 'producer'],
    initials: 'SA',
    areas: ['direcao', 'produção']
  },
  {
    id: 'marina',
    name: 'Marina Costa',
    role: 'Diretora de Fotografia',
    roles: ['cinematography'],
    initials: 'MC',
    areas: ['cinematografia']
  },
  {
    id: 'lucas',
    name: 'Lucas Reis',
    role: 'Diretor',
    roles: ['director'],
    initials: 'LR',
    areas: ['direcao', 'cinematografia', 'arte', 'produção']
  }
];

const areas = [
  { id: 'direcao', label: 'Direção', accent: '#dfe9ff' },
  { id: 'cinematografia', label: 'Cinematografia', accent: '#f7e7ff' },
  { id: 'arte', label: 'Arte', accent: '#ddf6e9' },
  { id: 'produção', label: 'Produção', accent: '#fff0d8' }
];

const initialTasks = [
  {
    id: 't1',
    title: 'Mapa de luz da locação principal',
    area: 'cinematografia',
    status: 'in-progress',
    progress: 65,
    dueDate: '12 set',
    responsible: 'Marina Costa',
    summary: 'Definir a direção da iluminação e o posicionamento de luz para a cena inicial.',
    directorVision: 'A cena deve transmitir clima íntimo e tensão silenciosa, com pouca luz direta e mais contraste lateral.',
    links: [
      { label: 'Moodboard da locação', url: '#' },
      { label: 'Referência visual da cena', url: '#' }
    ],
    comments: [
      { user: 'Lucas Reis', text: 'A luz lateral precisa conservar o horizonte do espaço e a silhueta da personagem.' },
      { user: 'Marina Costa', text: 'Vou validar o mapa de luz com a arte para manter a leitura da arquitetura.' }
    ],
    sharedWith: ['arte']
  },
  {
    id: 't2',
    title: 'Moodboard de figurino e cenário',
    area: 'arte',
    status: 'pending',
    progress: 20,
    dueDate: '15 set',
    responsible: 'Equipe de arte',
    summary: 'Definir referências visuais e direção estética do ambiente para a sequência central.',
    directorVision: 'A paleta deve ser térmica, orgânica e íntima, sem exagero no luxo visual da produção.',
    links: [{ label: 'Referências de paleta', url: '#' }],
    comments: [{ user: 'Sofia Almeida', text: 'Precisamos alinhar com a abordagem de luz para não contradizer a intenção da cena.' }],
    sharedWith: ['cinematografia']
  },
  {
    id: 't3',
    title: 'Checklist de confirmação de locações',
    area: 'produção',
    status: 'complete',
    progress: 100,
    dueDate: '07 set',
    responsible: 'Sofia Almeida',
    summary: 'Validar o cronograma, autorização e documentação das locações previstas.',
    directorVision: 'As locações precisam estar claramente validadas antes do início da pré-produção mais intensa.',
    links: [{ label: 'Planilha de locações', url: '#' }],
    comments: [{ user: 'Lucas Reis', text: 'Tudo validado. Podemos seguir com a confirmação do cronograma semanal.' }],
    sharedWith: ['direcao']
  },
  {
    id: 't4',
    title: 'Roteiro de tomada e referência da cena 04',
    area: 'direcao',
    status: 'in-progress',
    progress: 58,
    dueDate: '14 set',
    responsible: 'Lucas Reis',
    summary: 'Organizar a intenção dramática, divisão de planos e referências de execução para a cena 04.',
    directorVision: 'A cena deve ser emocional e direta, com longo silêncio e toma focada no olhar da personagem.',
    links: [{ label: 'Roteiro da cena', url: '#' }],
    comments: [{ user: 'Sofia Almeida', text: 'Vou alinhar a logística da cena com a fotografia e arte antes da reunião do dia.' }],
    sharedWith: ['cinematografia', 'arte']
  }
];

function App() {
  const [currentUser, setCurrentUser] = React.useState(users[0]);
  const [selectedArea, setSelectedArea] = React.useState('direcao');
  const [tasks, setTasks] = React.useState(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = React.useState(initialTasks[0].id);
  const [supervisorMode, setSupervisorMode] = React.useState(false);

  const visibleTasks = tasks.filter((task) => {
    if (supervisorMode) {
      return true;
    }

    if (currentUser.roles.includes('director')) {
      return task.area === selectedArea || task.sharedWith.includes(selectedArea) || currentUser.areas.includes(task.area);
    }

    return currentUser.areas.includes(task.area) || task.sharedWith.some((areaId) => currentUser.areas.includes(areaId));
  });

  const selectedTask = visibleTasks.find((task) => task.id === selectedTaskId) || visibleTasks[0] || tasks[0];

  React.useEffect(() => {
    if (!selectedTask && visibleTasks[0]) {
      setSelectedTaskId(visibleTasks[0].id);
    }
  }, [visibleTasks, selectedTask]);

  const areaProgress = areas.map((area) => {
    const areaTasks = tasks.filter((task) => task.area === area.id);
    const total = areaTasks.length || 1;
    const progress = Math.round(areaTasks.reduce((sum, task) => sum + task.progress, 0) / total);
    return { ...area, progress };
  });

  const totalProgress = Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length);
  const taskCount = tasks.length;
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
  const completed = tasks.filter((task) => task.status === 'complete').length;

  const updateStatus = (taskId, nextStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) return task;

        const progressMap = {
          pending: 20,
          'in-progress': 65,
          complete: 100
        };

        return { ...task, status: nextStatus, progress: progressMap[nextStatus] };
      })
    );
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">PF</div>
          <h1>Production Flow</h1>
        </div>

        <div className="nav-header">Departamentos</div>
        <div className="area-list">
          {areas.map((area) => (
            <button
              key={area.id}
              className={`area-button ${selectedArea === area.id ? 'active' : ''}`}
              onClick={() => setSelectedArea(area.id)}
              type="button"
            >
              <span className="area-label">{area.label}</span>
              <span className="area-count">{tasks.filter((task) => task.area === area.id).length}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="main-panel">
        <div className="topbar">
          <div className="title-block">
            <h2>Dashboard de produção</h2>
            <p>Centralização de objetivos, cronograma e colaboração entre áreas.</p>
          </div>

          <div className="user-identity">
            <div className="avatar">{currentUser.initials}</div>
            <div className="user-meta">
              <strong>{currentUser.name}</strong>
              <span>{currentUser.role}</span>
            </div>
            <select
              className="role-select"
              value={currentUser.id}
              onChange={(event) => {
                const nextUser = users.find((user) => user.id === event.target.value);
                setCurrentUser(nextUser);
                setSelectedArea(nextUser.areas[0]);
              }}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Objetivos</div>
            <div className="stat-value">{taskCount}</div>
            <div className="stat-meta">Total da produção</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Em andamento</div>
            <div className="stat-value">{inProgress}</div>
            <div className="stat-meta">Itens ativos</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Concluídos</div>
            <div className="stat-value">{completed}</div>
            <div className="stat-meta">Entregues</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Progresso</div>
            <div className="stat-value">{totalProgress}%</div>
            <div className="stat-meta">Média da produção</div>
          </div>
        </div>

        <div className="board">
          <section className="task-panel">
            <div className="task-heading">
              <h3>{areas.find((area) => area.id === selectedArea)?.label || 'Visão geral'}</h3>
              <button className="action-button primary" type="button" onClick={() => setSupervisorMode((value) => !value)}>
                {supervisorMode ? 'Sair de supervisão' : 'Modo de supervisão'}
              </button>
            </div>

            <div className="task-list">
              {visibleTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${selectedTask?.id === task.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTaskId(task.id)}
                >
                  <div className="task-row">
                    <div>
                      <h4>{task.title}</h4>
                      <p className="task-sub">{task.responsible} · {task.dueDate}</p>
                    </div>
                    <span className={`status-pill status-${task.status}`}>
                      {task.status === 'pending' ? 'pendente' : task.status === 'in-progress' ? 'em andamento' : 'concluído'}
                    </span>
                  </div>

                  <div className="task-progress">
                    <div className="progress-bar">
                      <span style={{ width: `${task.progress}%` }} />
                    </div>
                    <strong>{task.progress}%</strong>
                  </div>

                  <div className="task-action-row">
                    <button className="action-button" type="button" onClick={(event) => { event.stopPropagation(); updateStatus(task.id, 'pending'); }}>
                      Pendente
                    </button>
                    <button className="action-button" type="button" onClick={(event) => { event.stopPropagation(); updateStatus(task.id, 'in-progress'); }}>
                      Em andamento
                    </button>
                    <button className="action-button primary" type="button" onClick={(event) => { event.stopPropagation(); updateStatus(task.id, 'complete'); }}>
                      Concluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="detail-panel">
            {selectedTask ? (
              <>
                <div className="detail-header">
                  <h3>{selectedTask.title}</h3>
                  <span className={`status-pill status-${selectedTask.status}`}>
                    {selectedTask.status === 'pending' ? 'pendente' : selectedTask.status === 'in-progress' ? 'em andamento' : 'concluído'}
                  </span>
                </div>

                <div className="detail-section">
                  <h4>Resumo</h4>
                  <p className="detail-text">{selectedTask.summary}</p>
                </div>

                <div className="detail-section">
                  <h4>Visão do diretor</h4>
                  <p className="detail-text">{selectedTask.directorVision}</p>
                </div>

                <div className="detail-section">
                  <h4>Documentos e links</h4>
                  <div className="link-list">
                    {selectedTask.links.map((link) => (
                      <div key={link.label} className="link-item">
                        <a href={link.url}>{link.label}</a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Comentários</h4>
                  <div className="comment-list">
                    {selectedTask.comments.map((comment) => (
                      <div key={`${comment.user}-${comment.text}`} className="comment-item">
                        <strong>{comment.user}</strong>
                        <span>{comment.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p>Selecione um objetivo para visualizar o contexto detalhado.</p>
            )}
          </aside>
        </div>
      </main>

      <aside className="right-rail">
        <div className="summary-card">
          <h4>Resumo da área</h4>
          <div className="summary-grid">
            {areaProgress.map((area) => (
              <div key={area.id} className="summary-item">
                <span className="label">{area.label}</span>
                <strong>{area.progress}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="supervisor-panel">
          <h4>Visão de supervisão</h4>
          <div className="progress-list">
            {areaProgress.map((area) => (
              <div key={area.id} className="progress-item">
                <div className="progress-item-header">
                  <span>{area.label}</span>
                  <strong>{area.progress}%</strong>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${area.progress}%`, background: 'linear-gradient(90deg, #8ca7ff 0%, #c9f0dc 100%)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
