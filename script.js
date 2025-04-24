document.getElementById('miFormulario').addEventListener("submit", (e) => {
  e.preventDefault();
  const tareaInput = document.getElementById("tarea");
  const texto = tareaInput.value.trim();
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  const id = Date.now().toString();
  tareas.push({ id, textoTarea: texto });
  localStorage.setItem("tareas", JSON.stringify(tareas));
  tareaInput.value = "";
  cargarTareas();
});

const eliminarTarea = (id) => {

  const tareas = JSON.parse(localStorage.getItem("tareas"));
  const indexTarea = tareas.findIndex((tarea) => tarea.id === id);
  if (indexTarea !== -1) {
    tareas.splice(indexTarea, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  const tareaEliminar = document.getElementById(id);

  if (tareaEliminar) {
    cargarTareas();
  }
};

const cargarTareas = () => {
  if (!localStorage.getItem("tareas")) {
    localStorage.setItem("tareas", JSON.stringify([]));
  }

  const tareas = JSON.parse(localStorage.getItem("tareas"));
  const contenedorTareas = document.getElementById("contenedorTarea");

  contenedorTareas.innerHTML = "";

  tareas.forEach((tarea, index) => {
    const contenedorTarea = document.createElement("div");
    contenedorTarea.id = tarea.id;
    contenedorTarea.classList.add("tarea");

    if (index % 2 === 0) {
      contenedorTarea.style.backgroundColor = "#725AC1";
    } else {
      contenedorTarea.style.backgroundColor = "#8D86C9";
    }

    const textTarea = document.createElement("p");
    textTarea.textContent = tarea.textoTarea;

    const action = document.createElement("input");
    action.type = "button";
    action.value = "Eliminar";
    action.onclick = () => eliminarTarea(tarea.id);

    contenedorTarea.addEventListener("click", () => {
      contenedorTarea.classList.toggle("clicked");
    });

    contenedorTarea.appendChild(textTarea);
    contenedorTarea.appendChild(action);
    contenedorTareas.appendChild(contenedorTarea);
  });
};



window.onload = cargarTareas