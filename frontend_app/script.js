// getting all required elements
const inputBox = document.querySelector("#text");
const inputBoxTime = document.querySelector("#time");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
// const SERVER_URL = 'http://localhost:5000';
const SERVER_URL = 'http://34.72.59.142:5000';
let listArray = [];

// onkeyup event
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) { //if the user value isn't only spaces
        addBtn.classList.add("active"); //active the add button
    } else {
        addBtn.classList.remove("active"); //unactive the add button
    }
}

// showTasks(); //calling showTask function

addBtn.onclick = () => { //when user click on plus icon button
    let userEnteredValue = inputBox.value; //getting input field value
    let timeEnteredValue = inputBoxTime.value; //getting input field value

    const details = {
        "task": userEnteredValue,
        "time_hr": timeEnteredValue
    } //pushing or adding new value in array

    postData(details);
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button once the task added
}

function showTasks() {
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    let newLiTag = "";
    pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element.task} | ${element.time_hr}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
    // API not written
    listArray.splice(index, 1); //delete or remove the li
    showTasks(); //call the showTasks function
}

window.onload = (event) => {
    console.log('page is fully loaded');
    getData();
}
function getData(callback) {
    // GET
    fetch(`${SERVER_URL}/get_tasks`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            listArray = data;
            showTasks();
        })
}
function postData(details) {
    // POST
    fetch(`${SERVER_URL}/add_task`, {
        method: 'POST', // or 'PUT'
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ data: details }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // listArray.push(data);
            getData();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}