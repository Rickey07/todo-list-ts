import { v4 as uuidV4 } from 'uuid';

type typeOfTask = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

const listContainer = document.querySelector<HTMLUListElement>(
  '#todo-list-container',
);
const form = document.querySelector<HTMLFormElement>('#main-form');
const input = document.querySelector<HTMLInputElement>('#inputEl');

const tasks: typeOfTask[] = loadTasks();

tasks.forEach((task) => {
  addTaskItem(task)
})

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value === '' || input === null) return;

  const task: typeOfTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date().toDateString(),
  };
  tasks.push(task);
  addTaskItem(task);
});

function addTaskItem(task: typeOfTask) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    if (checkbox.checked) {
      item.style.color = 'red';
    } else {
      item.style.color = 'black';
    }
  });
  task.completed = checkbox.checked;
  label.append(checkbox, task.title);
  item.append(label);
  listContainer?.append(item);
  saveTasks()
}

function saveTasks():void {
  localStorage.setItem("Tasks",JSON.stringify(tasks))
}

function loadTasks():typeOfTask[] {
  const tasks = localStorage.getItem("Tasks")
  if(tasks === null) {
    return []
  }
  return JSON.parse(tasks)
}
