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
