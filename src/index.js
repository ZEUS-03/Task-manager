import {
    isValidated,
    showTaskPopup,
    hideTaskPopup,
    createTask,
    handleTaskClick,
} from "./helper.js";

// Error

const taskInputError = document.getElementById("task-error");
const assigneeInputError = document.getElementById("assignee-error");
const deadlineInputError = document.getElementById("deadline-error");
const statusInputError = document.getElementById("status-error");

// form Buttons and Headings

const taskButton = document.getElementById("task-button");
const taskHeading = document.getElementById("task-heading");

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
    taskButton.innerText = "Add task";
    taskHeading.innerText = "Create new task";
    showTaskPopup(form, blurDiv);
});

blurDiv.addEventListener("click", () => {
    hideTaskPopup(form, blurDiv);
});

document.getElementById("deadline-input").valueAsDate = new Date();

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
        if (taskButton.innerText === "Add task") {
            let items = JSON.parse(localStorage.getItem("task-manager"));
            items.currentIndex++;
            let taskObj = {
                taskVal: taskInputVal,
                assigneeVal: assigneeInputVal,
                deadlineVal: deadlineInputVal,
                statusVal: statusInputVal,
                taskIndex: items.currentIndex,
            };
            if (statusInputVal === "todo") {
                items.todo.push(taskObj);
            } else if (statusInputVal === "doing") {
                items.doing.push(taskObj);
            } else if (statusInputVal === "done") {
                items.done.push(taskObj);
            }
            localStorage.setItem("task-manager", JSON.stringify(items));
        }
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
        handleTaskClick(
            event,
            "todo",
            form,
            blurDiv,
            taskButton,
            taskHeading,
            taskInputError,
            assigneeInputError,
            deadlineInputError,
            statusInputError
        );
    });
}
if (items.doing !== []) {
    doingContainer.addEventListener("click", (event) => {
        handleTaskClick(
            event,
            "doing",
            form,
            blurDiv,
            taskButton,
            taskHeading,
            taskInputError,
            assigneeInputError,
            deadlineInputError,
            statusInputError
        );
    });
}
if (items.done !== []) {
    doneContainer.addEventListener("click", (event) => {
        handleTaskClick(
            event,
            "done",
            form,
            blurDiv,
            taskButton,
            taskHeading,
            taskInputError,
            assigneeInputError,
            deadlineInputError,
            statusInputError
        );
    });
}
