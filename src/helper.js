// show popup

export const showTaskPopup = (form, blurDiv) => {
    form.style.visibility = "visible";
    blurDiv.style.visibility = "visible";
};

export const hideTaskPopup = (form, blurDiv) => {
    form.style.visibility = "hidden";
    blurDiv.style.visibility = "hidden";
};

// form validation

export function isValidated(
    taskInputVal,
    assigneeInputVal,
    deadlineInputVal,
    statusInputVal,
    taskInputError,
    assigneeInputError,
    deadlineInputError,
    statusInputError
) {
    let flag = true;

    if (taskInputVal === "") {
        flag = false;
        taskInputError.innerText = "Task title can't be empty!";
    } else {
        taskInputError.innerText = "";
    }
    if (assigneeInputVal === "") {
        flag = false;
        assigneeInputError.innerText = "Assignee name can't be empty!";
    } else {
        assigneeInputError.innerText = "";
    }
    if (deadlineInputVal === "") {
        flag = false;
        deadlineInputError.innerText = "Please set a deadline!";
    } else {
        deadlineInputError.innerText = "";
    }
    if (statusInputVal === "") {
        flag = false;
        statusInputError.innerText = "Status can't be empty!";
    } else {
        statusInputError.innerText = "";
    }

    return flag;
}

// function handling creation of new task in UI

export const createTask = (container, items) => {
    items.forEach((item) => {
        const newTask = document.createElement("div");
        newTask.classList.add("tasks");
        const iconContainer = document.createElement("div");
        const newTitle = document.createElement("p");
        newTitle.innerText = item.taskval;
        const editIcon = document.createElement("i");
        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("id", item.taskIndex);
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen");
        trashIcon.classList.add("fa-solid");
        trashIcon.classList.add("fa-trash");
        iconContainer.appendChild(editIcon);
        iconContainer.appendChild(trashIcon);
        newTask.appendChild(newTitle);
        newTask.appendChild(iconContainer);
        container.appendChild(newTask);
    });
};

export const handleTaskClick = (event, taskContainerName) => {
    const clickedElement = event.target;
    const getItem = JSON.parse(localStorage.getItem("task-manager"));
    const id = event.target.id;

    if (clickedElement.classList.contains("fa-trash")) {
        for (
            let itemIndex = 0;
            itemIndex < getItem[taskContainerName].length;
            itemIndex++
        ) {
            if (id == getItem[taskContainerName][itemIndex]["taskIndex"]) {
                if (itemIndex === 0) {
                    getItem[taskContainerName].shift();
                } else {
                    getItem[taskContainerName].splice(itemIndex, itemIndex);
                }
                document
                    .getElementById(id)
                    .parentElement.parentElement.remove();
                break;
            }
        }
    }
    localStorage.setItem("task-manager", JSON.stringify(getItem));
};
