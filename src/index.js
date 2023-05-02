const todoInputBtn = document.getElementById("todo-input");
const doingInputBtn = document.getElementById("doing-input");
const doneInputBtn = document.getElementById("done-input");

// const taskPopup = document.getElementById("task-popup");
const blurDiv = document.getElementById("blur-div");

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    flag = true;
    const taskInputVal = document.getElementById("task-input").value();
    const assigneeInputVal = document.getElementById("assignee-input").value();
    const deadlineInputVal = document.getElementById("deadline-input").value();
    const statusInputVal = document.getElementById("status-input").value();

    if (taskInputVal === "") {
        flag = false;
    } else if (assigneeInputVal === "") {
        flag = false;
    } else if (deadlineInputVal === "") {
        flag = false;
    } else if (statusInputVal === "") {
        flag = false;
    }

    if (flag === false) {
        e.preventDefault();
    }
});

if (localStorage.getItem("todo-list") === null) {
    localStorage.setItem("todo-list", JSON.stringify([{}, {}, {}]));
}

todoInputBtn.addEventListener("click", () => {
    form.style.visibility = "visible";
    blurDiv.style.visibility = "visible";
});

doingInputBtn.addEventListener("click", () => {
    form.style.visibility = "visible";
    blurDiv.style.visibility = "visible";
});

doneInputBtn.addEventListener("click", () => {
    form.style.visibility = "visible";
    blurDiv.style.visibility = "visible";
});

blurDiv.addEventListener("click", () => {
    form.style.visibility = "hidden";
    blurDiv.style.visibility = "hidden";
});
