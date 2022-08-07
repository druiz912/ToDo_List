import React, { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState("");
  const [taskOfList, setTaskOfList] = useState([]);

  // PETICIÓN GET 
  useEffect(() => {
    const getTasks = async () => {
      try {
        await fetch("https://assets.breatheco.de/apis/fake/todos/user/druiz")
          .then((response) => response.json())
          .then((data) => setTaskOfList(data));
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);
  //

  const putTasks = async (taskOfList) => {
    try {
      await fetch("https://assets.breatheco.de/apis/fake/todos/user/druiz", {
        method: "PUT",
        body: JSON.stringify(taskOfList),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Llama a la función PUT solo cuando taskOflist no esté vacía
  useEffect(() => {
    if (taskOfList.length > 0) {
      putTasks(taskOfList);
    }
  }, [taskOfList]);

  const deleteAllTask = async () => {
    setTaskOfList([]);
    try {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/druiz", {
        method: "PUT",
        body: JSON.stringify([{ label: "No hay tareas", done: false }]),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        if (data.result === "ok") {
          setTaskOfList([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Guardar tareas 
  const eventoTask = (e) => {
    if (e.keyCode === 13) { 
      if (tasks !== "") {
        setTaskOfList([...taskOfList, { label: tasks, done: false }]);
        setTasks("");
      } else {
        alert("Introduce tu tarea");
      }
    }
  };

  //Eliminar tarea individual (pulsando el ícono)
  const deleteTask = (indexToDelete) => {
    setTaskOfList(
      taskOfList.filter((task, taskIndex) => taskIndex !== indexToDelete)
    );
  };

  return (
    <>
      <div className="row flex-wrap justify-content-center">
        <div className="input col-4 col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Añade tu tarea"
            onChange={(e) => setTasks(e.target.value)}
            value={tasks}
            onKeyDown={eventoTask}
          />
        </div>
        <hr />
        <ul className="listTask">
          {taskOfList.length === 0 && ( //lista vacia
            <p className="d-flex justify-content-center">No hay tareas</p>
          )}
          {taskOfList.map((item, i) => {
            return (
              <li
                key={i}
                className="d-flex justify-content-center  text-dark item fw-bold"
              >
                {i + 1}. {item.label} 
                <i className="bi bi-x" onClick={() => deleteTask(i)}></i>
              </li>
            );
          })}
        </ul>
        <div className="d-flex justify-content-center">
          <button
            id="delete"
            className="btn btn-danger"
            onClick={deleteAllTask}
          >
            Borrar todo
          </button>
        </div>
      </div>
    </>
  );
};

export default Tasks;
