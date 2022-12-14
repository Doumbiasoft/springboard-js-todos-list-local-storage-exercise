document.addEventListener("DOMContentLoaded", () => {
  const btClear = document.querySelector("#BtClear");
  const formSubmit = document.querySelector("#formTodo");
  const tblListe = document.querySelector("#TodoList tbody");
  const dataTodoList = JSON.parse(localStorage.getItem("todosList") || "[]");

  btClear.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });

  loadLocalStorage();

  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.querySelector("#taskname").value;
    const taskDescription = document.querySelector("#taskdescription").value;

    const mytask = {
      task: taskName,
      descrpition: taskDescription,
      isCompleted: false,
    };

    var save = saveInLocalStorage(mytask);
    if (save) {
      CreateListElement(mytask.task, mytask.descrpition, mytask.isCompleted);
    }

    formSubmit.reset();
  });

  tblListe.addEventListener("click", (e) => {
    const tagName = e.target.tagName;

    if (tagName === "TD") {
      const taskName = e.target.parentNode.firstElementChild.innerText;
      
      var foundIndex = dataTodoList.findIndex((x) => x.task == taskName);
      dataTodoList[foundIndex].isCompleted =!dataTodoList[foundIndex].isCompleted;
      localStorage.setItem("todosList", JSON.stringify(dataTodoList));

      if (dataTodoList[foundIndex].isCompleted) {
        e.target.parentNode.style.textDecoration = "line-through";
      } else {
        e.target.parentNode.style.textDecoration = "none";
      }

    } else if (tagName === "BUTTON") {
      const taskName =e.target.parentNode.parentNode.firstElementChild.innerText;
      
      var remove = removeFromLocalStorage(taskName);
      if (remove) {
        e.target.parentNode.parentNode.remove();
      }
    }
  });

  function CreateListElement(task, descrpition, isCompleted) {
    const tbodyTR = document.createElement("tr");

    const tdtaskName = document.createElement("td");
    tdtaskName.innerText = task;

    const tdtaskDescription = document.createElement("td");
    tdtaskDescription.innerText = descrpition;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("removeButton");

    const tdActions = document.createElement("td");
    tdActions.appendChild(deleteButton);

    tbodyTR.appendChild(tdtaskName);
    tbodyTR.appendChild(tdtaskDescription);
    tbodyTR.appendChild(tdActions);

    if (isCompleted) {
      tbodyTR.style.textDecoration = "line-through";
    } 
    
    tblListe.appendChild(tbodyTR);
  }
  function loadLocalStorage() {
    for (let todo of dataTodoList) {
      CreateListElement(todo.task, todo.descrpition, todo.isCompleted);
    }
  }
  function saveInLocalStorage(newtask) {
    var i = dataTodoList.findIndex((todo) => todo.task === newtask.task);
    if (i === -1) {
      dataTodoList.push(newtask);
      localStorage.setItem("todosList", JSON.stringify(dataTodoList));
      return true;
    }
    return false;
  }

  function removeFromLocalStorage(taskname) {
    var i = dataTodoList.findIndex((todo) => todo.task === taskname);
    if (i !== -1) {
      dataTodoList.splice(i, 1);
      localStorage.setItem("todosList", JSON.stringify(dataTodoList));
      return true;
    }
    return false;
  }
});
