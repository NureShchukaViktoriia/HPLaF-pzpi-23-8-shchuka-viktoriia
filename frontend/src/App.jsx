import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description })
    });

    const newTask = await response.json();

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    setTasks(tasks.filter(task => task.id !== id));

    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  const toggleTask = async (task) => {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    });

    const updatedTask = await response.json();

    setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const saveEdit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/${editingTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description
      })
    });

    const updatedTask = await response.json();

    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));

    setEditingTask(null);
    setTitle("");
    setDescription("");
  };

  const showDetails = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    setSelectedTask(data);
  };

  return (
    <div className="app">
      <h1>Система управління задачами</h1>

      <form onSubmit={editingTask ? saveEdit : addTask} className="task-form">
        <input
          type="text"
          placeholder="Назва задачі"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Опис задачі"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          {editingTask ? "Зберегти" : "Додати"}
        </button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div>
              <strong>
                {task.title}
              </strong>
            </div>

            <div className="buttons">

              <button onClick={() => toggleTask(task)}>
                {task.completed ? "Повернути" : "Завершити"}
              </button>

              <button onClick={() => showDetails(task.id)}>
                Деталі
              </button>

              <button onClick={() => startEdit(task)}>
                Редагувати
              </button>

              <button onClick={() => deleteTask(task.id)}>
                Видалити
              </button>

            </div>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <div className="details">
          <h2>Деталі задачі</h2>
          <p><b>Назва:</b> {selectedTask.title}</p>
          <p><b>Опис:</b> {selectedTask.description || "Опис відсутній"}</p>
          <p>
            <b>Статус:</b>{" "}
            {selectedTask.completed ? "Виконано" : "Не виконано"}
          </p>

          <button onClick={() => setSelectedTask(null)}>
            Закрити
          </button>
        </div>
      )}
    </div>
  );
}

export default App;