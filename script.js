document.getElementById('miFormulario').addEventListener("submit", (e) => {
  e.preventDefault();
  const tareaInput = document.getElementById("tarea");
  const texto = tareaInput.value.trim();
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  const id = Date.now().toString();
  tareas.push({ id, textoTarea: texto, finalizada:false });
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

const eliminarTareas = () => {
  if (localStorage.getItem("tareas")) {
    localStorage.removeItem("tareas")
    cargarTareas()
  }
}

const cargarTareas = () => {
  if (!localStorage.getItem("tareas")) {
    localStorage.setItem("tareas", JSON.stringify([]));
  }

  const tareas = JSON.parse(localStorage.getItem("tareas"));
  const contenedorTareas = document.getElementById("contenedorTarea");
  const botonEliminar = document.getElementById("deleteAll")

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
    action.addEventListener("click", (e) => {
      e.stopPropagation();
      eliminarTarea(tarea.id);
    });

    contenedorTarea.addEventListener("click", () => {
      tarea.finalizada = !tarea.finalizada
      contenedorTarea.classList.toggle("clicked");
      localStorage.setItem("tareas", JSON.stringify(tareas));
    });
    tarea.finalizada && contenedorTarea.classList.add("clicked") 


    contenedorTarea.appendChild(textTarea);
    contenedorTarea.appendChild(action);
    contenedorTareas.appendChild(contenedorTarea);
  });
  if(tareas.length === 0) {
    botonEliminar.disabled = true
  } else {
    botonEliminar.disabled = false
  }
};



window.onload = cargarTareas