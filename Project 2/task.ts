interface Task {
    id: number;
    text: string;
}

const inputs = document.querySelector('input') as HTMLInputElement;
const btn = document.querySelector('button') as HTMLButtonElement;
const taskList = document.getElementById('task-list') as HTMLElement;
let task: Task[] = [];

// Check if there is any task data in localStorage
const localstoragedata = localStorage.getItem("task array");

if (localstoragedata !== null) {
    const ogdata: Task[] = JSON.parse(localstoragedata);
    task = ogdata;
    maketodo();
}

btn.addEventListener("click", function () {
    const query = inputs.value;
    inputs.value = "";

    if (query.trim() === "") {
        alert("no value entered");
        throw new Error("empty input field error");
    }

    // Create a task object
    const taskObj: Task = {
        id: Date.now(),
        text: query
    };

    // Add the new task to the array
    task.push(taskObj);
    localStorage.setItem("task array", JSON.stringify(task));
    maketodo();
});

function maketodo(): void {
    taskList.innerHTML = "";

    // Iterate over each task and create the UI elements
    for (let i = 0; i < task.length; i++) {
        const { id, text } = task[i];
        const element = document.createElement('div');
        element.innerHTML = `
            <span class="task">${text}</span>
            <span class="delete">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M17 6H22V8H20V21C20 21.5523 
                    19.5523 22 19 22H5C4.44772 22 4 21.5523
                     4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 
                     2H16C16.5523 2 17 2.44772 17 3V6ZM18 
                     8H6V20H18V8ZM13.4142 13.9997L15.182 
                     15.7675L13.7678 17.1817L12 15.4139L10.2322
                      17.1817L8.81802 15.7675L10.5858 13.9997L8.81802
                       12.232L10.2322 10.8178L12 12.5855L13.7678
                        10.8178L15.182 12.232L13.4142 13.9997ZM9
                         4V6H15V4H9Z"></path>
                </svg>
            </span>
        `;
        
        // Handle the delete button click event
        const delbtn = element.querySelector('.delete')!;
        delbtn.addEventListener("click", function () {
            // Remove the task from the array based on its ID
            const filteredarray = task.filter((taskobj: Task) => taskobj.id !== id);
            task = filteredarray;
            localStorage.setItem("task array", JSON.stringify(task));
            taskList.removeChild(element);
        });

        element.classList.add('todo');
        taskList.appendChild(element);
    }
}