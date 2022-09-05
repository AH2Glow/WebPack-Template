import { v4 as uuidV4 } from "uuid";

const list = document.querySelector<HTMLUListElement>("#task-list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-input");

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};

const loadTasks = (): Task[] => {
  const tasksJSON = localStorage.getItem("TASKS");
  return tasksJSON ? JSON.parse(tasksJSON) : [];
};

const addListItem = (task: Task) => {
  const { title, completed } = task;

  const item = document.createElement("li");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.checked = completed;

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  label.append(checkbox, title);
  item.append(label);
  list?.append(item);

  saveTasks();
};

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input) return;

  const { value: title } = input;

  const isValid = title !== "" && title !== null;

  if (!isValid) return;

  const newTask: Task = {
    id: uuidV4(),
    title,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  addListItem(newTask);
  input.value = "";
});
