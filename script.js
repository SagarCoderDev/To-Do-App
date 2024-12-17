const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
});

// Function to add a task to the list
function addTask(text, completed = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    updateLocalStorage();
  });

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  if (completed) {
    li.classList.add("completed");
  }

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  const tasks = getTasksFromStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach((task) => addTask(task.text, task.completed));
}

// Get tasks from localStorage
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Update localStorage after changes
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector(".checkbox").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
