let projects = [];

// Cargar nombre de usuario al inicio
function loadUserName() {
    fetch('http://localhost:5500/user-info')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('user-name').textContent = data.username;
            }
        })
        .catch(error => {
            console.error('Error al cargar información del usuario:', error);
        });
}

// Cargar proyectos desde la base de datos al inicio
function loadProjects() {
    fetch('http://localhost:5500/projects')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                projects = data.projects;
                displayProjects(projects);
                updateProjectStats();
            } else {
                alert('Error al cargar proyectos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Actualizar estadísticas de proyectos
function updateProjectStats() {
    const totalProjects = projects.length;
    const iniciadoProjects = projects.filter(p => p.estado === 'iniciado').length;
    const enProcesoProjects = projects.filter(p => p.estado === 'en-proceso').length;
    const finalizadoProjects = projects.filter(p => p.estado === 'finalizado').length;

    document.getElementById('total-projects').textContent = totalProjects;
    document.getElementById('iniciado-projects').textContent = iniciadoProjects;
    document.getElementById('en-proceso-projects').textContent = enProcesoProjects;
    document.getElementById('finalizado-projects').textContent = finalizadoProjects;
}

// Mostrar proyectos en la interfaz
function displayProjects(projectList = projects) {
    const projectContainer = document.getElementById('project-list');
    projectContainer.innerHTML = '';

    projectList.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';

        const header = document.createElement('div');
        header.className = 'project-header';
        header.innerHTML = `
            <h3>${project.nombre}</h3>
            <span class="status ${project.estado}">${project.estado}</span>
        `;

        const content = document.createElement('div');
        content.className = 'project-content';
        content.innerHTML = `
            <p><strong>Descripción:</strong> ${project.descripcion}</p>
            <p><strong>Fecha Límite:</strong> ${project.fecha_limite}</p>
            <p><strong>Equipo Asignado:</strong> ${project.equipo_asignado}</p>
            <div class="project-actions">
                <button onclick="editProject(${project.id})" class="edit-button">Editar Proyecto</button>
                <button onclick="deleteProject(${project.id})" class="delete-button">Eliminar Proyecto</button>
            </div>
        `;

        header.addEventListener('click', () => {
            content.classList.toggle('active');
        });

        projectDiv.appendChild(header);
        projectDiv.appendChild(content);
        projectContainer.appendChild(projectDiv);
    });
}

// Filtrar proyectos
document.getElementById('filter-button').addEventListener('click', () => {
    const filterValue = document.getElementById('filter-status').value;
    const filteredProjects = filterValue === 'all' ? projects : projects.filter(project => project.estado === filterValue);
    displayProjects(filteredProjects);
    updateProjectStats();
});

function deleteProject(projectId) {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
        fetch(`http://localhost:5500/delete-project/${projectId}`, { method: 'DELETE' })
            .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
            .then(data => {
                if (data.success) {
                    projects = projects.filter(project => project.id !== projectId);
                    displayProjects(projects);
                    updateProjectStats();
                } else {
                    alert('Error al eliminar el proyecto');
                }
            })
            .catch(error => console.error('Error al eliminar el proyecto:', error));
    }
}

function editProject(projectId) {
    window.location.href = `edit_project.html?id=${projectId}`;
}

function logout() {
    localStorage.removeItem('userSession');
    sessionStorage.removeItem('userSession');
    window.location.href = 'http://localhost:5501/login.html';
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadUserName();
    loadProjects();
});
