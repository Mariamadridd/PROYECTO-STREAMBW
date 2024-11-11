// Función para obtener el ID del proyecto desde la URL
function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Cargar datos del proyecto para edición
function loadProjectData() {
  const projectId = getProjectIdFromUrl();
  if (projectId) {
      fetch(`http://localhost:5500/projects/${projectId}`)
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  // Rellenar los campos del formulario con los datos del proyecto
                  document.getElementById('edit-project-id').value = projectId;
                  document.getElementById('edit-name').value = data.project.nombre;
                  document.getElementById('edit-status').value = data.project.estado;
                  document.getElementById('edit-description').value = data.project.descripcion;
                  document.getElementById('edit-team').value = data.project.equipo_asignado;
                  document.getElementById('edit-deadline').value = data.project.fecha_limite;
              } else {
                  alert('Proyecto no encontrado');
              }
          })
          .catch(error => {
              console.error('Error al cargar el proyecto:', error);
          });
  } else {
      alert('No se proporcionó un ID de proyecto válido');
  }
}

// Manejar la actualización del proyecto al enviar el formulario
document.getElementById('edit-project-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const projectId = document.getElementById('edit-project-id').value;
  
  const updatedProject = {
      nombre: document.getElementById('edit-name').value,
      estado: document.getElementById('edit-status').value,
      descripcion: document.getElementById('edit-description').value,
      equipo_asignado: document.getElementById('edit-team').value,
      fecha_limite: document.getElementById('edit-deadline').value
  };

  fetch(`http://localhost:5500/projects/${projectId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProject)
  })
  .then(response => {
      if (response.ok) {
          alert('Proyecto actualizado exitosamente');
          window.location.href = 'ppo.html';
      } else {
          throw new Error('Error al actualizar el proyecto');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error al actualizar el proyecto');
  });
});

// Inicializar carga de datos del proyecto al cargar la página
document.addEventListener('DOMContentLoaded', loadProjectData);
