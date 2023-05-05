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
        newTitle.innerText = item.taskVal;
        const editIcon = document.createElement("i");
        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("id", item.taskIndex);
        editIcon.classList.add("fa-solid");
        editIcon.classList.add("fa-pen");
        editIcon.setAttribute("id", "edit" + item.taskIndex);
        trashIcon.classList.add("fa-solid");
        trashIcon.classList.add("fa-trash");
        iconContainer.appendChild(editIcon);
        iconContainer.appendChild(trashIcon);
        newTask.appendChild(newTitle);
        newTask.appendChild(iconContainer);
        container.appendChild(newTask);
    });
};

const shiftItems = (updatedStatus, itemIndex, getItem, taskContainerName) => {
    if (itemIndex === 0) {
        getItem[updatedStatus].push(getItem[taskContainerName][itemIndex]);
        getItem[taskContainerName].shift();
    } else {
        getItem[updatedStatus].push(getItem[taskContainerName][itemIndex]);
        getItem[taskContainerName].splice(itemIndex, itemIndex);
    }
};

export const handleTaskClick = (
    event,
    taskContainerName,
    form,
    blurDiv,
    taskHeading,
    taskButton,
    taskInputError,
    assigneeInputError,
    deadlineInputError,
    statusInputError
) => {
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
    } else if (clickedElement.classList.contains("fa-pen")) {
        for (
            let itemIndex = 0;
            itemIndex < getItem[taskContainerName].length;
            itemIndex++
        ) {
            let taskMemory = getItem[taskContainerName][itemIndex]["statusVal"];
            if (
                id ==
                "edit" + getItem[taskContainerName][itemIndex]["taskIndex"]
            ) {
                document.getElementById("task-input").value =
                    getItem[taskContainerName][itemIndex]["taskVal"];
                document.getElementById("assignee-input").value =
                    getItem[taskContainerName][itemIndex]["assigneeVal"];
                document.getElementById("deadline-input").value =
                    getItem[taskContainerName][itemIndex]["deadlineVal"];
                document.getElementById("status-input").value =
                    getItem[taskContainerName][itemIndex]["statusVal"];
                taskButton.innerText = "Edit task";
                taskHeading.innerText = "Edit task";
                showTaskPopup(form, blurDiv);

                form.addEventListener("submit", (e) => {
                    const taskInputVal =
                        document.getElementById("task-input").value;
                    const assigneeInputVal =
                        document.getElementById("assignee-input").value;
                    const deadlineInputVal =
                        document.getElementById("deadline-input").value;
                    const statusInputVal =
                        document.getElementById("status-input").value;

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
                        if (taskButton.innerText === "Edit task") {
                            getItem[taskContainerName][itemIndex]["taskVal"] =
                                taskInputVal;

                            getItem[taskContainerName][itemIndex][
                                "assigneeVal"
                            ] = assigneeInputVal;
                            getItem[taskContainerName][itemIndex][
                                "deadlineVal"
                            ] = deadlineInputVal;
                            getItem[taskContainerName][itemIndex]["statusVal"] =
                                statusInputVal;

                            if (statusInputVal !== taskMemory) {
                                if (statusInputVal === "todo") {
                                    shiftItems(
                                        "todo",
                                        itemIndex,
                                        getItem,
                                        taskContainerName
                                    );
                                }
                                if (statusInputVal === "doing") {
                                    shiftItems(
                                        "doing",
                                        itemIndex,
                                        getItem,
                                        taskContainerName
                                    );
                                }
                                if (statusInputVal === "done") {
                                    shiftItems(
                                        "done",
                                        itemIndex,
                                        getItem,
                                        taskContainerName
                                    );
                                }
                            }
                            localStorage.setItem(
                                "task-manager",
                                JSON.stringify(getItem)
                            );
                        }
                    }
                });
            }
        }
    }
    localStorage.setItem("task-manager", JSON.stringify(getItem));
};
