class ToDoList {
    constructor() {
        //if localStorage empty
        if(!localStorage["TASKS"]){
            this.tasks = [
                { task: 'Go to Dentist', isComplete: false },
                { task: 'Do Gardening', isComplete: true },
                { task: 'Renew Library Account', isComplete: false },
            ];
        }
        else    
            this.tasks = JSON.parse(localStorage["TASKS"]);
        this.loadTasks();
        document.getElementById("addBtn").onclick = this.addTaskClick.bind(this);
    }

    loadTasks() {
        //whatever tasks are currently on the screen need to be saved in local storage
        localStorage["TASKS"] = JSON.stringify(this.tasks);
        let tasksHtml = this.tasks.reduce(
            (html, task, index) => html += this.generateTaskHtml(task, index),
            '');
            document.getElementById("taskList").innerHTML = tasksHtml;
    }

    generateTaskHtml(task, index) {
        return `
                  <li class="list-group-item">
                    <div class="item">
                      <div class="item-child">
                            <input type="checkbox" value="" class="" ${(task.isComplete) ? "checked" : ""} onchange="toDo.toggleTaskStatus(${index})">
                      </div>
                      <div class="item-child task-text pl-4 ${(task.isComplete) ? "complete" : ""}">
                        ${task.task}
                      </div>
                      <div class="item-child delete-icon-area">
                        <a class="" href="/" onclick="toDo.deleteTask(event, ${index})">
                            <i class="delete-icon fas fa-trash"></i>
                        </a>
                      </div>
                    </div>
                  </li>
                `;
    }

    toggleTaskStatus(index){
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();

    }

    deleteTask(event, index){
        event.preventDefault();
        this.tasks.splice(index, 1);
        this.loadTasks();
    }

    addTaskClick(){
        let task = document.getElementById("addTask").value;
        if(task == "")
            document.getElementById("addTask").parentElement.classList.add("has-error");
        else{
            document.getElementById("addTask").parentElement.classList.remove("has-error");
            let newTask = {
                task: task,
                isComplete: false
            };
            this.tasks.push(newTask);
            this.loadTasks();
            document.getElementById("addTask").value = "";
        }
    }

}
/*  Create a class called ToDoList
    PART 1 - Show the tasks
    -   Add a constructor
        -   Create an instance variable called tasks.
        -   Set it equal to the following object literal
        -   [
                {task: 'Go to Dentist', isComplete: false},
                {task: 'Do Gardening', isComplete: true},
                {task: 'Renew Library Account', isComplete: false},
            ]
        -   call the method loadTasks
    -   Add the generateTaskHtml method (copy from below)
        -   This method generates the html for ONE task in the array
            It gets called in loadTasks
        -   Replace TASK GOES HERE with with a template string that
            will write the task property of the task parameter
        -   Replace the other 2 ALL caps phrases with template strings
            that use the isComplete property of the task
    -   Add the loadTasks method
        -   Create a variable tasksHtml and set it equal to the
            the return value for each of the individual tasks combined
            You can do this by calling the reduce method on the array
            It manipulares each element of an array to produce ONE result
                let tasksHtml = this.tasks.reduce(
                    (html, task, index) => html += this.generateTaskHtml(task, index), 
                    '')
        -   Set contents of the taskList element on the page to the tasksHtml variable
        );
    END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE 3 TASKS ON PAGE
    PART 2 - Toggle task status
    -   Add the toggleTaskStatus method.  It has ONE parameter, the index of the task
        -   Change the isCompete property for the current task to its opposite
        -   Call loadTasks again to reload the list of tasks
    -   Add an onchange handler to the checkbox in the generateTaskHtml method.  
        The handler should call toDo.toggleTaskStatus with the index (template string)
    END OF PART 2 - TEST AND DEBUG YOUR CODE
    PART 3 - Delete task
    -   Add the deleteTask method.  It has 2 parameters, event and index
        -   prevent the default action of the anchor tag using the event parameter
        -   delete the task from the list
        -   call loadTasks
    -   Add an onclick handler to the anchor tag surrounding the delete icon
        The handler should call the toDo.deleteTask method with event 
        and index (template string) as its parameters
    END OF PART 3 - TEST AND DEBUG YOUR CODE
    PART 4 - Add task
    -   Add the function addTaskClick.  It has no parameters
        -   get the text from the textbox with an id of add task
        -   if the text is blank 
                add a style has-errors to the parent div of the textbox
            otherwise
                remove the style has-errors from the parent div
                create a new task object (use an object literal)
                    the newTask should have the task that the user entered
                    and an isComplete property of false
                add the new task to the task list
                call loadTasks
                clear the text box
            end if
    -   Add an onclick handler to the add button on the page
        in the constructor.  It should call addTaskClick
    -   The text adds an event handler so that a user can hit the enter key
        rather than press the button.  Add this functionality if you like.
    END OF PART 4 - TEST AND DEBUG YOUR CODE
    PART 5 - Local Storage
    -   Load the task list from the 'TASKS' element from local storage
        at the top of the constructor.  
            You'll have to parse the json in order to put it in the task list
            You will also need to add an if statement to only load the default
            list of tasks when there's nothing in local storage
    -   Save the task list to the TASKS element in local storage in loadTasks
            You'll have to convert the json to a string to put it in local storage
            JSON.stringify is the opposite of JSON.parse
    END OF PART 5 - TEST AND DEBUG YOUR CODE - You're done writing code
*/

/*  THIS IS NECESSARY FOR TESTING ANY OF YOUR CODE
    declare a variable toDo
    Add a window on load event handler that instantiates a ToDo object.  
    Use and arrow or anonymous function
*/
let toDo;
window.onload = () => { toDo = new ToDoList(); }

