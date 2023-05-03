import { isValidated, showTaskPopup, hideTaskPopup } from "./helper.js";

// Buttons

const todoInputBtn = document.getElementById("todo-input");
const doingInputBtn = document.getElementById("doing-input");
const doneInputBtn = document.getElementById("done-input");

// Error

const taskInputError = document.getElementById("task-error");
const assigneeInputError = document.getElementById("assignee-error");
const deadlineInputError = document.getElementById("deadline-error");
const statusInputError = document.getElementById("status-error");

// Popup div/form

const blurDiv = document.getElementById("blur-div");
const form = document.getElementById("form");

// getting local storage values
const items = JSON.parse(localStorage.getItem("task-manager"));

// checking/creating local storage

if (localStorage.getItem("task-manager") === null) {
    localStorage.setItem(
        "task-manager",
        JSON.stringify({ todo: [], doing: [], done: [], currentIndex: 0 })
    );
}

// onclick popup

todoInputBtn.addEventListener("click", () => {
    showTaskPopup(form, blurDiv);
});

doingInputBtn.addEventListener("click", () => {
    showTaskPopup(form, blurDiv);
});

doneInputBtn.addEventListener("click", () => {
    showTaskPopup(form, blurDiv);
});

blurDiv.addEventListener("click", () => {
    hideTaskPopup(form, blurDiv);
});

// On form submition

form.addEventListener("submit", (e) => {
    // Inputs
    const taskInputVal = document.getElementById("task-input").value;
    const assigneeInputVal = document.getElementById("assignee-input").value;
    const deadlineInputVal = document.getElementById("deadline-input").value;
    const statusInputVal = document.getElementById("status-input").value;

    const validated = isValidated(
        taskInputVal,
        assigneeInputVal,
        deadlineInputVal,
        statusInputVal,
        taskInputError,
        assigneeInputError,
        deadlineInputError,
        statusInputError
    );
    if (!validated) {
        e.preventDefault();
        console.log(statusInputVal);
    } else {
        let items = JSON.parse(localStorage.getItem("task-manager"));
        items.currentIndex += 1;
        let taskObj = {
            taskval: taskInputVal,
            assigneeVal: assigneeInputVal,
            deadlineVal: deadlineInputVal,
            statusVal: statusInputVal,
            taskIndex: items.currentIndex,
        };
        console.log(taskObj);
        if (statusInputVal === "To do") {
            items.todo.push(taskObj);
        } else if (statusInputVal === "Doing") {
            items.doing.push(taskObj);
        } else if (statusInputVal === "Done") {
            items.done.push(taskObj);
        }
        localStorage.setItem("task-manager", JSON.stringify(items));
    }
});

const createTask = () => {};

const todoContainer = document.getElementById("todo-container");
const doingContainer = document.getElementById("doing-container");
const doneContainer = document.getElementById("done-container");

if (items.todo !== []) {
    items.todo.forEach((element) => {
        const newTask = document.createElement("div");
        newTask.classList.add("tasks");
        const newTitle = document.createElement("p");
        newTitle.innerText = element.taskval;
        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen");
        newTask.appendChild(newTitle);
        newTask.appendChild(editIcon);
        todoContainer.insertBefore(
            newTask,
            document.getElementById("todo-input")
        );
    });
}

if (items.doing !== []) {
    items.doing.forEach((element) => {
        const newTask = document.createElement("div");
        newTask.classList.add("tasks");
        const newTitle = document.createElement("p");
        newTitle.innerText = element.taskval;
        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen");
        newTask.appendChild(newTitle);
        newTask.appendChild(editIcon);
        doingContainer.insertBefore(
            newTask,
            document.getElementById("doing-input")
        );
    });
}

if (items.done !== []) {
    items.done.forEach((element) => {
        const newTask = document.createElement("div");
        newTask.classList.add("tasks");
        const newTitle = document.createElement("p");
        newTitle.innerText = element.taskval;
        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen");
        newTask.appendChild(newTitle);
        newTask.appendChild(editIcon);
        doneContainer.insertBefore(
            newTask,
            document.getElementById("done-input")
        );
    });
}
