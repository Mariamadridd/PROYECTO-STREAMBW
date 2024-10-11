let projects = [];

// Add project form submission handler
document.getElementById('add-project-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectDeadline = document.getElementById('project-deadline').value;
    const projectTeam = document.getElementById('project-team').value;
    const projectStatus = document.getElementById('project-status').value;
    const newProject = {
        name: projectName,
        description: projectDescription,
        deadline: projectDeadline,
        team: projectTeam,
        status: projectStatus
    };
    projects.push(newProject);
    renderProjects();
    document.getElementById('add-project-form').reset();
});

// Render projects list
function renderProjects(filteredProjects = projects) {
    const projectListHTML = filteredProjects.map((project, index) => {
        return `
            <div class="proyecto ${project.status}" data-index="${index}">
                <h2>${project.name}</h2>
                <p>Descripción: ${project.description}</p>
                <p>Fecha límite: ${project.deadline}</p>
                <p>Equipo asignado: ${project.team}</p>
                <progress value="${getProgressValue(project)}" max="100">${getProgressValue(project)}%</progress>
                <span class="status">${project.status}</span>
                <button class="edit-project">Editar</button>
                <button class="delete-project">Eliminar</button>
            </div>
        `;
    }).join('');
    document.getElementById('project-list').innerHTML = projectListHTML;
}

// Get progress value based on project status
function getProgressValue(project) {
    switch (project.status) {
        case 'iniciado':
            return 30;
        case 'en-proceso':
            return 60;
        case 'finalizado':
            return 100;
        default:
            return 0;
    }
}

// Filter projects by status
document.getElementById('filter-button').addEventListener('click', () => {
    const filterStatus = document.getElementById('filter-status').value;
    let filteredProjects = projects;
    if (filterStatus !== 'all') {
        filteredProjects = projects.filter((project) => project.status === filterStatus);
    }
    renderProjects(filteredProjects);
});

// Edit project functionality
document.addEventListener('click', (e) => {
    console.log('Click event triggered!');
    if (e.target.classList.contains('edit-project')) {
      const projectIndex = e.target.parentNode.dataset.index;
      const project = projects[projectIndex];
  
      const newProjectName = prompt('Ingrese el nuevo nombre del proyecto:', project.name);
      const newProjectDescription = prompt('Ingrese la nueva descripción del proyecto:', project.description);
      const newProjectDeadline = prompt('Ingrese la nueva fecha límite del proyecto:', project.deadline);
      const newProjectTeam = prompt('Ingrese el nuevo equipo asignado del proyecto:', project.team);
      const newProjectStatus = prompt('Ingrese el nuevo estado del proyecto:', project.status);
  
      if (newProjectName !== null) project.name = newProjectName;
      if (newProjectDescription !== null) project.description = newProjectDescription;
      if (newProjectDeadline !== null) project.deadline = newProjectDeadline;
      if (newProjectTeam !== null) project.team = newProjectTeam;
      if (newProjectStatus !== null) project.status = newProjectStatus;
  
      renderProjects();
    }
  });

// Delete project functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-project')) {
        const projectIndex = e.target.parentNode.dataset.index;
        projects.splice(projectIndex, 1);
        renderProjects();
    }
});

// Initial render of projects list
renderProjects();