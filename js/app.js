var toDoEntryBox = document.getElementById('todo-entry-box');
toDoEntryBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addToDoItem();
  }
});


let addButton = document.getElementById('add-button');
addButton.addEventListener('click', function () {
  addToDoItem();
});

let clearButton = document.getElementById('clear-completed-button');
clearButton.addEventListener('click', function () {
  clearCompletedToDoItems();
});

let emptyButton = document.getElementById('empty-button');
emptyButton.addEventListener('click', emptyList);

let saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', saveList);

// variabile del selettore HTML che ho come id todo-entry-box
var toDoEntryBox = document.getElementById('todo-entry-box');

// variabile del selettore HTML che ha come id todo-list
var toDoList = document.getElementById('todo-list');
/* liste */
var spesaList = document.getElementById('spesa-list');
var compitiList = document.getElementById('compiti-list');
var coseDaFareList = document.getElementById('cose_da_fare-list');

function newToDoItem(itemText, completed) {
  let toDoItem = document.createElement('li');
  let toDoText = document.createTextNode(itemText);

  toDoItem.appendChild(toDoText);

  if (completed) {
    toDoItem.classList.add('completed');
  }

  toDoList.appendChild(toDoItem);
  toDoItem.addEventListener('dblclick', toggleToDoItemState);
}


//salvataggio automatico e aggiunta array nel localStorage
/* funzione timer */
function timer() {
  if (toDoEntryBox.value !== "") {
    addToDoItem()
    saveList()
  }
}
timer();
setInterval(timer, 1000);

/* funzione timer */

function addToDoItem() {
  let itemText = toDoEntryBox.value;
  newToDoItem(itemText, false);
}

function toggleToDoItemState() {
  if (this.classList.contains('completed')) {
    this.classList.remove('completed');
  }
  else {
    this.classList.add('completed');
  }
}

function clearCompletedToDoItems() {
  let completedItems = toDoList.getElementsByClassName('completed');

  while (completedItems.length > 0) {
    completedItems.item(0).remove();
  }
}

function emptyList() {
  let toDoItems = toDoList.children;

  while (toDoItems.length > 0) {
    toDoItems.item(0).remove();
  }

}

let intervallo = setInterval(addToDoItem, 1000)
if (toDoEntryBox.value === "") {
  clearInterval(intervallo)
} else {
  intervallo
}

let select = document.getElementById("my-lists");


function saveList() {
  select.addEventListener("change", function (event) {
    console.log(event.target.value);
    switch (event.target.value) {
      case "to-do":
        let toDos = [];
        for (let i = 0; i < toDoList.children.length; i++) {
          let toDo = toDoList.children.item(i);
          var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains('completed')
          };
          toDos.push(toDoInfo);
        }
        console.log(toDos);
        localStorage.setItem('toDos', JSON.stringify(toDos));

        break;

      case "spesa": let spesa = [];
        for (let i = 0; i < toDoList.children.length; i++) {
          let toDo = toDoList.children.item(i);
          var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains('completed')
          };
          spesa.push(toDoInfo);
        }
        console.log(spesa);
        localStorage.setItem('spesa', JSON.stringify(spesa));
        break;


      case "compiti": let compiti = [];
        for (let i = 0; i < toDoList.children.length; i++) {
          let toDo = toDoList.children.item(i);
          var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains('completed')
          };
          compiti.push(toDoInfo);
        }
        console.log(compiti);
        localStorage.setItem('compiti', JSON.stringify(compiti));
        break;



      case "cose-da-fare": let coseDaFare = [];
        for (let i = 0; i < toDoList.children.length; i++) {
          let toDo = toDoList.children.item(i);
          var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains('completed')
          };
          coseDaFare.push(toDoInfo);
        }
        console.log(coseDaFare);
        localStorage.setItem('coseDaFare', JSON.stringify(coseDaFare));
        break;
    }

  });
}


function loadList() {
  if (localStorage.getItem('toDos') != null) {
    let toDos = JSON.parse(localStorage.getItem('toDos'));  

    for (let i = 0; i < toDos.length; i++) {
      let toDo = toDos[i];
      newToDoItem(toDo.task, toDo.completed);
    }
  }
}
loadList();

