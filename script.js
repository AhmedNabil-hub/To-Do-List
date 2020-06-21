let theInput = document.querySelector(".add-task input");
let addButton = document.querySelector(".plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let allTasks = [];

addButton.onclick = function() {
    if (theInput.value === '') {
        //swal("Note Empty!", "please type some text!", "error");
        Swal.fire(
            'Empty Note',
            'please type some text!',
            'error'
        );
    } else {
        if (allTasks.includes(theInput.value)) {
            Swal.fire(
                'A Note with this name exists',
                'please type another name',
                'warning'
            );
        } else {
            let noTaskMsg = document.querySelector(".no-tasks-message");
            if (document.body.contains(document.querySelector(".no-tasks-message"))) {
                noTaskMsg.remove();
            }
            let mainSpan = document.createElement("span");
            let deleteButton = document.createElement("span");
            let text = document.createTextNode(theInput.value);
            let deleteText = document.createTextNode("Delete");

            mainSpan.appendChild(text);
            mainSpan.className = 'task-box';
            deleteButton.appendChild(deleteText);
            deleteButton.className = 'delete';
            mainSpan.appendChild(deleteButton);
            tasksContainer.appendChild(mainSpan);
            allTasks.push(theInput.value);
            theInput.value = '';
            theInput.focus();
            calcTasks();
        }
    }
};

function createNoTasks() {
    let msgSpan = document.createElement('span');
    let msgText = document.createTextNode("No Tasks To Show");
    msgSpan.appendChild(msgText);
    msgSpan.className = 'no-tasks-message';
    tasksContainer.appendChild(msgSpan);
}

document.addEventListener('click', function(e) {
    if (e.target.className == 'delete') {
        allTasks.splice(allTasks.indexOf((e.target.parentNode.textContent).replace('Deleted', '')), 1);
        e.target.parentNode.remove();
        if (tasksContainer.childElementCount == 0) {
            createNoTasks();
        }
    }

    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle('finished');
    }
    calcTasks();

});

function calcTasks() {
    tasksCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length;
    tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finished").length;
}