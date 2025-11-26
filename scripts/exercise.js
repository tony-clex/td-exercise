let tasks = [];
let currentFilter = "all";

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

function render() {
  taskList.innerHTML = ""; 

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
  });

  for (const task of filteredTasks) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const btnContainer = document.createElement("div");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "yes";
    completeBtn.addEventListener("click", () => toggleComplete(task.text));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => removeTask(task.text));

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);

    taskList.appendChild(li);
  }

  updateStats();
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = "";
  render();
});

function toggleComplete(taskText) {
  tasks = tasks.map(task =>
    task.text === taskText ? { ...task, completed: !task.completed } : task
  );
  render();
}

function removeTask(taskText) {
  tasks = tasks.filter(task => task.text !== taskText);
  render();
}

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

function updateStats() {
  total.textContent = tasks.length;
  completed.textContent = tasks.filter(t => t.completed).length;
  pending.textContent = tasks.filter(t => !t.completed).length;
}

render();
