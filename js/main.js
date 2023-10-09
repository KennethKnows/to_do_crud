
//input
let taskInput = document.querySelector("#taskInput");
let dateInput = document.querySelector("#dateInput");

//buttons

let addBtn = document.querySelector("#addBtn");

//display
let taskContainer = document.querySelector("#taskContainer");

let taskEntries = JSON.parse(localStorage.getItem("taskEntries"));

let displayEntries = () => {
    if ( taskEntries == null || taskEntries == 0 ) { //taskEntries []
        taskContainer.innerHTML = `<tr>
                                        <td colspan="3">No task Added.</td>
                                   </tr>`
    } else {
        let display = "";
        taskEntries.forEach((item) => {
            display += `<tr id="task${item.id}">
                            <td>
                           <input type="text" value="${item.task}" class="rem-border" readonly>
                            </td>
                            <td>
                            <input type="date" value="${item.date}" class="rem-border" readonly>
                            </td>
                            <td id="actions${item.id}">
                                <button onclick="deleteTask(${item.id})">Delete</button>
                                <button onclick="updateTask(${item.id})">Update</button>
                        </tr>`;
        taskContainer.innerHTML = display;
        })
    }
}
displayEntries();

let addTask = (event) => {
    event.preventDefault(); //avoid the behavior of sumbit idk?

    //id
    let n = localStorage.getItem("idValue"); //


    let taskItem =  {
        task: taskInput.value,
        date: dateInput.value,
        id: ++n //increment
    }  
    if (taskEntries == null) {
        taskEntries = [];
    }

    //ipush na nmos task item para makuha nmo iyahang unod
    taskEntries.push(taskItem);

    //save in localStorage
    localStorage.setItem("taskEntries", JSON.stringify(taskEntries));
    localStorage.setItem("idValue", n);
    displayEntries();

}
let deleteTask = (id) => {
   taskEntries = taskEntries.filter((item) => item.id != id);
   localStorage.setItem("taskEntries", JSON.stringify(taskEntries));

   displayEntries();
}

let updateTask = (id) => {
    let actionsCell = document.querySelector(`#actions${id}`);
    let itemTask = document.querySelector(`#task${id} input[type="text"]`);
    let itemDate = document.querySelector(`#task${id} input[type="date"]`);

    actionsCell.innerHTML = `<button onclick="saveUpdate(${id})">Save</button>`;
    itemTask.readOnly = false;
    itemDate.readOnly = false;

    itemTask.classList.remove("rem-border");
    itemDate.classList.remove("rem-border");

}
let saveUpdate = (id) => {
    let itemSelected = taskEntries.find((item) => item.id == id);
    let itemTask = document.querySelector(`#task${id} input[type="text"]`);
    let itemDate = document.querySelector(`#task${id} input[type="date"]`);

    itemSelected.task = itemTask.value;
    itemSelected.date = itemDate.value;

    localStorage.setItem("taskEntries", JSON.stringify(taskEntries));
    displayEntries();

}

addBtn.addEventListener("click", addTask);