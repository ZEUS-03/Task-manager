import {
    isValidated,
    showTaskPopup,
    hideTaskPopup,
    createTask,
    handleTaskClick,
} from "./helper.js";

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

// checking/creating local storage

if (localStorage.getItem("task-manager") === null) {
    localStorage.setItem(
        "task-manager",
        JSON.stringify({ todo: [], doing: [], done: [], currentIndex: 0 })
    );
}

// onclick popup

// get new task popup

const taskSidebar = document.getElementById("task-sidebar");
taskSidebar.addEventListener("click", () => {
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
    } else {
        let items = JSON.parse(localStorage.getItem("task-manager"));
        items.currentIndex++;
        let taskObj = {
            taskval: taskInputVal,
            assigneeVal: assigneeInputVal,
            deadlineVal: deadlineInputVal,
            statusVal: statusInputVal,
            taskIndex: items.currentIndex,
        };
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

// getting local storage values
const items = JSON.parse(localStorage.getItem("task-manager"));
const todoContainer = document.getElementById("todo-container");
const doingContainer = document.getElementById("doing-container");
const doneContainer = document.getElementById("done-container");

if (items.todo !== []) {
    createTask(
        todoContainer,
        items.todo,
        document.getElementById("todo-input"),
        items.currentIndex
    );
}

if (items.doing !== []) {
    createTask(
        doingContainer,
        items.doing,
        document.getElementById("doing-input"),
        items.currentIndex
    );
}

if (items.done !== []) {
    createTask(
        doneContainer,
        items.done,
        document.getElementById("done-input"),
        items.currentIndex
    );
}

if (items.todo !== []) {
    todoContainer.addEventListener("click", (event) => {
        handleTaskClick(event, "todo");
    });
}
if (items.doing !== []) {
    doingContainer.addEventListener("click", (event) => {
        handleTaskClick(event, "doing");
    });
}
if (items.done !== []) {
    doneContainer.addEventListener("click", (event) => {
        handleTaskClick(event, "done");
    });
}
