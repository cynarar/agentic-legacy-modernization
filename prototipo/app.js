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
  { id: 'direcao', label: 'Direção' },
  { id: 'cinematografia', label: 'Cinematografia' },
  { id: 'arte', label: 'Arte' },
  { id: 'produção', label: 'Produção' }
];

const statusLabels = {
  pending: 'pendente',
  'in-progress': 'em andamento',
  complete: 'concluído'
};

const statusIcons = {
  pending: 'fas fa-clock',
  'in-progress': 'fas fa-spinner',
  complete: 'fas fa-check'
};

const statusActions = [
  { status: 'pending', label: 'Pendente', icon: 'fas fa-clock' },
  { status: 'in-progress', label: 'Em andamento', icon: 'fas fa-spinner' },
  { status: 'complete', label: 'Concluir', icon: 'fas fa-check', primary: true }
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

const tabs = [
  { id: 'objetivos', label: 'Objetivos', icon: 'fas fa-list-check' },
  { id: 'resumo', label: 'Resumo', icon: 'fas fa-chart-pie' }
];

const emptyObjective = {
  title: '',
  area: 'direcao',
  responsible: '',
  dueDate: '',
  summary: '',
  directorVision: '',
  sharedWith: []
};

function App() {
  const [currentUser, setCurrentUser] = React.useState(users[0]);
  const [tasks, setTasks] = React.useState(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [newObjective, setNewObjective] = React.useState(emptyObjective);
  const [liveMessage, setLiveMessage] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('objetivos');
  const triggerRef = React.useRef(null);
  const modalTitleRef = React.useRef(null);
  const createTitleRef = React.useRef(null);

  const isSupervisor = currentUser.roles.includes('director') || currentUser.roles.includes('assistantDirector');

  const canSeeTask = (task) => {
    if (isSupervisor) {
      return true;
    }

    return currentUser.areas.includes(task.area) || task.sharedWith.some((areaId) => currentUser.areas.includes(areaId));
  };

  const columns = areas.map((area) => {
    const areaTasks = tasks.filter((task) => task.area === area.id);
    const total = areaTasks.length || 1;
    const progress = Math.round(areaTasks.reduce((sum, task) => sum + task.progress, 0) / total);
    return { ...area, progress, tasks: areaTasks.filter(canSeeTask) };
  });

  const areaProgress = columns.map(({ id, label, progress }) => ({ id, label, progress }));

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) || null;

  const isSharedForUser = (task) => !isSupervisor && !currentUser.areas.includes(task.area);

  const totalProgress = Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length);
  const taskCount = tasks.length;
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
  const completed = tasks.filter((task) => task.status === 'complete').length;

  const updateStatus = (taskId, nextStatus) => {
    const targetTask = tasks.find((task) => task.id === taskId);

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

    if (targetTask) {
      setLiveMessage(`${targetTask.title} marcado como ${statusLabels[nextStatus]}.`);
    }
  };

  const openTask = (taskId, event) => {
    const targetTask = tasks.find((task) => task.id === taskId);
    triggerRef.current = event?.currentTarget || null;
    setSelectedTaskId(taskId);

    if (targetTask) {
      setLiveMessage(`Objetivo selecionado: ${targetTask.title}.`);
    }
  };

  const closeTask = () => {
    setSelectedTaskId(null);
    triggerRef.current?.focus();
  };

  const openCreateModal = (event) => {
    triggerRef.current = event.currentTarget;
    setNewObjective({ ...emptyObjective, responsible: currentUser.name });
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    triggerRef.current?.focus();
  };

  const updateNewObjective = (field, value) => {
    setNewObjective((current) => ({ ...current, [field]: value }));
  };

  const updateObjectiveArea = (areaId) => {
    setNewObjective((current) => ({
      ...current,
      area: areaId,
      sharedWith: current.sharedWith.filter((id) => id !== areaId)
    }));
  };

  const toggleSharedArea = (areaId) => {
    setNewObjective((current) => ({
      ...current,
      sharedWith: current.sharedWith.includes(areaId)
        ? current.sharedWith.filter((id) => id !== areaId)
        : [...current.sharedWith, areaId]
    }));
  };

  const createObjective = (event) => {
    event.preventDefault();

    if (!isSupervisor) {
      return;
    }

    const objective = {
      id: `t${Date.now()}`,
      ...newObjective,
      title: newObjective.title.trim(),
      responsible: newObjective.responsible.trim(),
      summary: newObjective.summary.trim(),
      directorVision: newObjective.directorVision.trim(),
      status: 'pending',
      progress: 0,
      links: [],
      comments: []
    };

    setTasks((currentTasks) => [...currentTasks, objective]);
    setLiveMessage(`Objetivo criado: ${objective.title}.`);
    closeCreateModal();
  };

  const handleCardKeyDown = (event, taskId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openTask(taskId, event);
    }
  };

  const handleTabKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextTab = tabs[(index + delta + tabs.length) % tabs.length];
    setActiveTab(nextTab.id);
    document.getElementById(`tab-${nextTab.id}`)?.focus();
  };

  React.useEffect(() => {
    if (!selectedTask) {
      return undefined;
    }

    modalTitleRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeTask();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selectedTask]);

  React.useEffect(() => {
    if (!createModalOpen) {
      return undefined;
    }

    createTitleRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeCreateModal();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [createModalOpen]);

  const StatusTag = ({ status }) => (
    <span className={`br-tag status-tag status-${status}`}>
      <i className={statusIcons[status]} aria-hidden="true"></i>
      <span>{statusLabels[status]}</span>
    </span>
  );

  const ProgressBar = ({ value, label }) => (
    <div
      className="progress-bar"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div className="app-shell">
      <div className="sr-only" aria-live="polite" aria-atomic="true">{liveMessage}</div>

      <header className="br-header app-header" role="banner">
        <div className="container-lg header-content">
          <div className="header-logo">
            <span className="brand-mark" aria-hidden="true">PF</span>
            <div>
              <h1>Production Flow</h1>
              <p>Quadro de produção audiovisual</p>
            </div>
          </div>

          <div className="user-identity" aria-label="Perfil ativo">
            <div className="avatar" aria-hidden="true">{currentUser.initials}</div>
            <div className="user-meta">
              <strong>{currentUser.name}</strong>
              <span>{currentUser.role}</span>
            </div>
            <label className="role-field">
              <span className="sr-only">Selecionar usuário</span>
              <select
                className="role-select"
                value={currentUser.id}
                onChange={(event) => {
                  const nextUser = users.find((user) => user.id === event.target.value);
                  setCurrentUser(nextUser);
                }}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      <main className="main-panel">
        <div className="topbar">
          <div className="title-block">
            <h2>Quadro de produção</h2>
            <p>Cada coluna é uma área; os cards trazem status, responsável e progresso do objetivo.</p>
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="Seções do quadro de produção">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              className={`br-button tab-button ${activeTab === tab.id ? 'primary active' : 'secondary'}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <i className={tab.icon} aria-hidden="true"></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'resumo' && (
          <div id="panel-resumo" role="tabpanel" aria-labelledby="tab-resumo" tabIndex={0} className="tab-panel">
            <div className="stats-row">
              <div className="br-card stat-card">
                <div className="stat-label">Objetivos</div>
                <div className="stat-value">{taskCount}</div>
                <div className="stat-meta">Total da produção</div>
              </div>

              <div className="br-card stat-card">
                <div className="stat-label">Em andamento</div>
                <div className="stat-value">{inProgress}</div>
                <div className="stat-meta">Itens ativos</div>
              </div>

              <div className="br-card stat-card">
                <div className="stat-label">Concluídos</div>
                <div className="stat-value">{completed}</div>
                <div className="stat-meta">Entregues</div>
              </div>

              <div className="br-card stat-card">
                <div className="stat-label">Progresso</div>
                <div className="stat-value">{totalProgress}%</div>
                <div className="stat-meta">Média da produção</div>
              </div>
            </div>

            <div className="br-card summary-card">
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

            <div className="br-card supervisor-panel">
              <h4>Visão de supervisão</h4>
              <div className="progress-list">
                {areaProgress.map((area) => (
                  <div key={area.id} className="progress-item">
                    <div className="progress-item-header">
                      <span>{area.label}</span>
                      <strong>{area.progress}%</strong>
                    </div>
                    <ProgressBar value={area.progress} label={`Progresso da área ${area.label}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'objetivos' && (
          <div id="panel-objetivos" role="tabpanel" aria-labelledby="tab-objetivos" tabIndex={0} className="tab-panel">
            {isSupervisor && (
              <div className="kanban-toolbar">
                <span className="br-tag supervisor-badge">
                  <i className="fas fa-chart-line" aria-hidden="true"></i>
                  <span>Modo de supervisão: você vê e pode atualizar todas as áreas</span>
                </span>
                <button className="br-button primary create-objective-button" type="button" onClick={openCreateModal}>
                  <i className="fas fa-plus" aria-hidden="true"></i>
                  <span>Novo objetivo</span>
                </button>
              </div>
            )}

            <div className="kanban-board" role="list" aria-label="Quadro de produção por área">
              {columns.map((column) => (
                <section key={column.id} className="br-card kanban-column" role="listitem" aria-label={`Área ${column.label}`}>
                  <div className="kanban-column-header">
                    <h3>{column.label}</h3>
                    <span className="area-count">{column.tasks.length}</span>
                  </div>
                  <ProgressBar value={column.progress} label={`Progresso da área ${column.label}`} />

                  <div className="kanban-cards">
                    {column.tasks.length === 0 ? (
                      <p className="kanban-empty">Nenhum objetivo visível nesta área.</p>
                    ) : (
                      column.tasks.map((task) => (
                        <article key={task.id} className={`br-card kanban-card status-border-${task.status}`}>
                          <button
                            className="kanban-card-button"
                            type="button"
                            onClick={(event) => openTask(task.id, event)}
                            onKeyDown={(event) => handleCardKeyDown(event, task.id)}
                            aria-haspopup="dialog"
                            aria-label={`Abrir objetivo ${task.title}. Responsável: ${task.responsible}. Prazo: ${task.dueDate}. Status: ${statusLabels[task.status]}. Progresso: ${task.progress}%`}
                          >
                            <h4>{task.title}</h4>
                            <p className="task-sub">{task.responsible} · {task.dueDate}</p>

                            <div className="task-progress">
                              <ProgressBar value={task.progress} label={`Progresso do objetivo ${task.title}`} />
                              <strong>{task.progress}%</strong>
                            </div>

                            <div className="kanban-card-tags">
                              <StatusTag status={task.status} />
                              {isSharedForUser(task) && (
                                <span className="br-tag shared-tag">
                                  <i className="fas fa-people-arrows" aria-hidden="true"></i>
                                  <span>Compartilhado com sua área</span>
                                </span>
                              )}
                            </div>
                          </button>

                          <div className="task-action-row">
                            {statusActions.map((action) => (
                              <button
                                key={action.status}
                                className={`br-button ${action.primary ? 'primary' : 'secondary'} small icon-button round status-action-button`}
                                type="button"
                                title={action.label}
                                aria-label={`Marcar ${task.title} como ${statusLabels[action.status]}`}
                                onClick={(event) => { event.stopPropagation(); updateStatus(task.id, action.status); }}
                              >
                                <i className={action.icon} aria-hidden="true"></i>
                                <span className="sr-only">{action.label}</span>
                              </button>
                            ))}
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedTask && (
        <div className="modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeTask(); }}>
          <div className="br-card modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-header">
              <h3 id="modal-title" tabIndex={-1} ref={modalTitleRef}>{selectedTask.title}</h3>
              <StatusTag status={selectedTask.status} />
              {isSharedForUser(selectedTask) && (
                <span className="br-tag shared-tag">
                  <i className="fas fa-people-arrows" aria-hidden="true"></i>
                  <span>Compartilhado com sua área</span>
                </span>
              )}
              <button
                className="br-button secondary small icon-button round modal-close"
                type="button"
                onClick={closeTask}
                aria-label="Fechar detalhes do objetivo"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
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
                    {link.url === '#' ? (
                      <span className="document-placeholder" aria-disabled="true">
                        <i className="fas fa-file-alt" aria-hidden="true"></i>
                        {link.label}
                        <small>documento ainda não vinculado</small>
                      </span>
                    ) : (
                      <a href={link.url}><i className="fas fa-link" aria-hidden="true"></i>{link.label}</a>
                    )}
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

            <div className="modal-actions">
              {statusActions.map((action) => (
                <button
                  key={action.status}
                  className={`br-button ${action.primary ? 'primary' : 'secondary'} small`}
                  type="button"
                  onClick={() => updateStatus(selectedTask.id, action.status)}
                >
                  <i className={action.icon} aria-hidden="true"></i>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {createModalOpen && isSupervisor && (
        <div className="modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeCreateModal(); }}>
          <div className="br-card modal-card" role="dialog" aria-modal="true" aria-labelledby="create-modal-title">
            <div className="modal-header">
              <h3 id="create-modal-title" tabIndex={-1} ref={createTitleRef}>Novo objetivo</h3>
              <button
                className="br-button secondary small icon-button round modal-close"
                type="button"
                onClick={closeCreateModal}
                aria-label="Fechar criação de objetivo"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>

            <form className="objective-form" onSubmit={createObjective}>
              <label className="form-field">
                <span>Título</span>
                <input
                  value={newObjective.title}
                  onChange={(event) => updateNewObjective('title', event.target.value)}
                  required
                />
              </label>

              <div className="form-grid">
                <label className="form-field">
                  <span>Área</span>
                  <select value={newObjective.area} onChange={(event) => updateObjectiveArea(event.target.value)}>
                    {areas.map((area) => <option key={area.id} value={area.id}>{area.label}</option>)}
                  </select>
                </label>

                <label className="form-field">
                  <span>Prazo</span>
                  <input
                    type="date"
                    value={newObjective.dueDate}
                    onChange={(event) => updateNewObjective('dueDate', event.target.value)}
                    required
                  />
                </label>
              </div>

              <label className="form-field">
                <span>Responsável</span>
                <input
                  value={newObjective.responsible}
                  onChange={(event) => updateNewObjective('responsible', event.target.value)}
                  required
                />
              </label>

              <label className="form-field">
                <span>Resumo</span>
                <textarea
                  rows="3"
                  value={newObjective.summary}
                  onChange={(event) => updateNewObjective('summary', event.target.value)}
                  required
                ></textarea>
              </label>

              <label className="form-field">
                <span>Visão do diretor</span>
                <textarea
                  rows="3"
                  value={newObjective.directorVision}
                  onChange={(event) => updateNewObjective('directorVision', event.target.value)}
                  required
                ></textarea>
              </label>

              <fieldset className="sharing-fieldset">
                <legend>Compartilhar com áreas</legend>
                <div className="sharing-options">
                  {areas.filter((area) => area.id !== newObjective.area).map((area) => (
                    <label key={area.id}>
                      <input
                        type="checkbox"
                        checked={newObjective.sharedWith.includes(area.id)}
                        onChange={() => toggleSharedArea(area.id)}
                      />
                      <span>{area.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="modal-actions">
                <button className="br-button secondary" type="button" onClick={closeCreateModal}>Cancelar</button>
                <button className="br-button primary" type="submit">
                  <i className="fas fa-plus" aria-hidden="true"></i>
                  <span>Criar objetivo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
