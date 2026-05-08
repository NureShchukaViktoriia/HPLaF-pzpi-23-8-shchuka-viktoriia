const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Приготувати обід",
    description: "Заздалгідь дістати м'ясо з морозилки",
    completed: false
  },
  {
    id: 2,
    title: "Виконати лабораторну",
    description: "Виконати лабораторну з МОтТІ",
    completed: true
  }
];

// Отримати всі задачі
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Отримати одну задачу за id
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Задачу не знайдено" });
  }

  res.json(task);
});

// Додати задачу
app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Назва задачі обов'язкова" });
  }

  const newTask = {
    id: Date.now(),
    title,
    description: description || "",
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Редагувати задачу
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Задачу не знайдено" });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.completed = completed ?? task.completed;

  res.json(task);
});

// Видалити задачу
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "Задачу видалено" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});