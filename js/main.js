let taskINP = document.getElementById("taskInput");
let addBtn = document.getElementById("addTaskBtn");
let updateBtn = document.getElementById("updateTaskBtn");
let SearchINP = document.getElementById("search-need");
let tasks = JSON.parse(localStorage.getItem("task")) || [];
let indexINP;

document.addEventListener("DOMContentLoaded", () => {
  displaytasks(tasks);
});

// !===========> Functions <=============

// !=====> function ADD
function addtask() {
  if (taskINP.value.trim() === "") return;

  if (tasks.includes(taskINP.value.trim())) {
    showToast("This task already exists!", "info");
    return;
  }

  tasks.push(taskINP.value.trim());
  localStorage.setItem("task", JSON.stringify(tasks));
  displaytasks(tasks);
  clearINP();
  showToast("Task added successfully!", "success");
}

// !=====> function DisplayData

function displaytasks(arr) {
  if (arr.length === 0) {
    document.getElementById("taskList").innerHTML = `
      <div id="emptyState" class="text-center text-gray-500 italic mt-10">
        No tasks yet — add one above
      </div>`;
    return;
  }
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `

            <li
              tabindex="0"
              class="flex justify-between items-center bg-green-50 border border-green-200 px-4 py-3 rounded-lg shadow-lg hover:ring-1 hover:ring-green-500 hover:border-green-500 transition-all duration-300 ease-in-out animate-fadeIn"
            >
              <span class="text-gray-800 font-medium">${arr[i]}</span>
              <div class="flex items-center gap-5">
                <button
                  class="cursor-pointer text-xl text-amber-600 hover:text-amber-400 transition"
                >
                  <i class="fa-solid fa-pen-to-square" onclick="setInputForUpdate(${i})" ></i>
                </button>
                <button
                  class="cursor-pointer text-xl text-red-600 hover:text-red-700 transition"
                >
                  <i class="fas fa-trash" onclick="deleteTask(${i})"></i>
                </button>
              </div>
            </li>

`;
  }
  document.getElementById("taskList").innerHTML = cartona;
}

// !=====> function Clear-Input

function clearINP() {
  taskINP.value = "";
}

// !=========> Delete task

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("task", JSON.stringify(tasks));
  displaytasks(tasks);
  showToast("Task deleted successfully!", "delete");
}

// !========> Update Task

function setInputForUpdate(index) {
  updateBtn.classList.remove("hidden");
  addBtn.classList.add("hidden");

  indexINP = index;

  taskINP.value = tasks[index];
}

function updateTask() {
  tasks[indexINP] = taskINP.value;
  displaytasks(tasks);
  clearINP();
  localStorage.setItem("task", JSON.stringify(tasks));
  addBtn.classList.remove("hidden");
  updateBtn.classList.add("hidden");
  showToast("Task updated successfully!");
}

// !========> Search

function searchTask() {
  let term = SearchINP.value;
  let termArr = [];

  if (term === "") {
    displaytasks(tasks);
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].toLowerCase().includes(term.toLowerCase())) {
      termArr.push(tasks[i]);
    } else {
      document.getElementById("taskList").innerHTML = `
        <div class="text-center text-gray-500 italic mt-10">
          No matching tasks found
        </div>`;
    }
  }
  displaytasks(termArr);
}

// !========> tostar
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");

  const colors = {
    success: "bg-green-100 border-green-400 text-green-800",
    delete: "bg-red-100 border-red-400 text-red-800",
    update: "bg-blue-100 border-blue-400 text-blue-800",
  };

  toast.className = `border-l-4 px-4 py-3 rounded shadow-md animate-slideIn ${colors[type]}`;
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <i class="fa-solid ${
        type === "success"
          ? "fa-check-circle"
          : type === "delete"
          ? "fa-circle-xmark"
          : "fa-circle-info"
      }"></i>
      <span>${message}</span>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add(
      "opacity-0",
      "translate-x-10",
      "transition-all",
      "duration-500"
    );
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}
