localStorage.clear();
localStorage.setItem("1", "My ToDo 1|false");
localStorage.setItem("2", "My ToDo 2 (checked)|true");
localStorage.setItem("3", "My ToDo 3|false");
localStorage.setItem("4", "My ToDo 4 (checked)|true");
localStorage.setItem("5", "My ToDo 5|false");
localStorage.setItem("6", "My ToDo 6|false");

function addTaskListener() {
  const taskPlus = document.querySelector(".addTask.plusSign");
  taskPlus.addEventListener("mouseover", function () {
    setPlusColor(this.children, "darkslateblue");
  });
  taskPlus.addEventListener("mouseout", function () {
    setPlusColor(this.children, "cornflowerblue");
  });
  taskPlus.addEventListener("click", function () {
    addMainTask();
  });
}

addTaskListener();

function getLocalstorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let taskID = "task" + (i + 1);
    const localstorageArray = String(localStorage.getItem(i + 1)).split("|");
    const taskName = localstorageArray[0]
    let newToDoHTML = `<section class="gridContainer cardGrid task" id="${taskID}">
                      <div class="gridContainer checkBoxGrid" id="${taskID}checkBoxGrid">
                          <input type="CheckBox" name="taskCheckBox" id="${taskID}checkbox"></div>
                      <div class="gridContainer taskZone" id="${taskID}TaskZone"><h3>${taskName}</h3 ></div >
                      <div class="gridContainer removeTask signBuffer" id="${taskID}signBuffer">
                          <div class="gridContainer removeTask plusSign" id="${taskID}removeTask">
                              <div class="removeTask plusLine vertical" id="${taskID}plusVertical"></div>
                              <div class="removeTask plusLine horizontal" id="${taskID}plusHorizontal"></div>
                          </div>
                      </div>
                      <!--  <div class="gridContainer hamburgerMenuBuffer" id="${taskID}HamburgerMenuBuffer">
                          <div class="gridContainer hamburgerMenu" id="${taskID}HamburgerMenu">
                              <div class="hamburgerStripe hamburgerStripe1" id="${taskID}hamburgerStripe1"></div>
                              <div class="hamburgerStripe hamburgerStripe2" id="${taskID}hamburgerStripe2"></div>
                              <div class="hamburgerStripe hamburgerStripe3" id="${taskID}hamburgerStripe3"></div>
                          </div>
                      </div> -->     
                    </section>`
    document.querySelector("#bodyGrid").insertAdjacentHTML("beforeend", newToDoHTML);

    const checkbox = document.getElementsByClassName("checkBoxGrid");
    checkbox[i].outerHTML = checkbox[i].outerHTML; //strip stacked listeners
    let checkboxStatus = localstorageArray[1]
    if (checkboxStatus == "true") {
      const taggedText = document.getElementById(taskID + "TaskZone").innerHTML;
      let strippedText = String(taggedText);
      strippedText = strippedText.replace("<h3>", "<s>");
      strippedText = strippedText.replace("</h3>", "</s>");
      document.getElementById(taskID + "TaskZone").innerHTML = strippedText;
      document.getElementById(taskID).style.gridColumnStart = "3";
      document.getElementById(taskID).className = "gridContainer cardGrid clicked task";
      document.getElementById(taskID).children[0].children[0].checked = true;
    }
    removeTaskListener();
    //hamburgerListener();
    checkboxListener();
    renameTodoListener();
    // getAllopenTasks();  
  }
}

getLocalstorage();

function removeTaskListener() {
  const crosses = document.getElementsByClassName("removeTask plusSign");
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].addEventListener("mouseover", removeTaskListenerMouseover);
  }
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].addEventListener("mouseout", removeTaskListenerMouseout);
  }
  for (let i = 0; i < crosses.length; i++) {
    crosses[i].addEventListener("click", removeTaskListenerClick);
  }
}

function removeTaskListenerMouseover() {
  const hoverBackgroundColor = "green";
  this.children[0].style.backgroundColor = hoverBackgroundColor;
  this.children[1].style.backgroundColor = hoverBackgroundColor;
}

function removeTaskListenerMouseout() {
  const hoverOutBackgroundColor = "orangered";
  this.children[0].style.backgroundColor = hoverOutBackgroundColor;
  this.children[1].style.backgroundColor = hoverOutBackgroundColor;
}

function removeTaskListenerClick() {
  this.parentElement.parentElement.remove();
  const localstorageRemoveItemString = String(this.id).slice(4, -10);
  const localstorageRemoveItem = Number(localstorageRemoveItemString);
  localStorage.removeItem(localstorageRemoveItem);

  for (let index = (localstorageRemoveItem); index < localStorage.length + 1; index++) {
    const capturedStorage = localStorage.getItem(index + 1);
    localStorage.setItem(index, capturedStorage);
    localStorage.removeItem(index + 1);
  }
  reorderAllTaskID();
  getAllopenTasks();
}

// function hamburgerListener() {
//   const burgers = document.getElementsByClassName("hamburgerMenu");
//   for (let i = 0; i < hamburgerMenu.length; i++) {
//     burgers[i].addEventListener("mouseover", hamburgerListenerMouseover);
//   }
//   for (let i = 0; i < hamburgerMenu.length; i++) {
//     burgers[i].addEventListener("mouseout", hamburgerListenerMouseout);
//   }
//   for (let i = 0; i < hamburgerMenu.length; i++) {
//     burgers[i].addEventListener("click", hamburgerListenerClick);
//   }
// }

// function hamburgerListenerMouseover() {
//   const hoverBackgroundColor = "red";
//   this.children[0].style.backgroundColor = hoverBackgroundColor;
//   this.children[1].style.backgroundColor = hoverBackgroundColor;
//   this.children[2].style.backgroundColor = hoverBackgroundColor;
// }

// function hamburgerListenerMouseout() {
//   const hoverOutBackgroundColor = "blue";
//   this.children[0].style.backgroundColor = hoverOutBackgroundColor;
//   this.children[1].style.backgroundColor = hoverOutBackgroundColor;
//   this.children[2].style.backgroundColor = hoverOutBackgroundColor;
// }

// function hamburgerListenerClick() {
//   console.log("HamburgerMenu " + this.id + " clicked");;
// }

function checkboxListener() {
  const checkbox = document.getElementsByClassName("checkBoxGrid");
  for (let i = 0; i < checkbox.length; i++) { 
    checkbox[i].outerHTML = checkbox[i].outerHTML; //strip stacked listeners
    // let taskID = "task" + (i + 1);
    // const localstorageArray = String(localStorage.getItem(i + 1)).split("|");
    // let checkboxStatus = localstorageArray[1]
    // if (checkboxStatus == "true") {
    //   const taggedText = document.getElementById(taskID + "TaskZone").innerHTML;
    //   let strippedText = String(taggedText);
    //   strippedText = strippedText.replace("<h3>", "<s>");
    //   strippedText = strippedText.replace("</h3>", "</s>");
    //   document.getElementById(taskID + "TaskZone").innerHTML = strippedText;
    //   document.getElementById(taskID).style.gridColumnStart = "3";
    //   document.getElementById(taskID).className = "gridContainer cardGrid clicked task";
    //   document.getElementById(taskID).children[0].children[0].checked = true;
    // }
    checkbox[i].addEventListener("change", function () {
      if (this.children[0].checked) {
        this.parentElement.style.gridColumnStart = "3";
        const taggedText = this.parentElement.children[1].innerHTML;
        let strippedText = String(taggedText);
        strippedText = strippedText.replace("<h3>", "<s>");
        strippedText = strippedText.replace("</h3>", "</s>");
        this.parentElement.children[1].innerHTML = strippedText;
        this.parentElement.className = "gridContainer cardGrid clicked task";
        const localstorageArray = String(localStorage.getItem(i + 1)).split("|");
        const taskName = localstorageArray[0]
        let checkboxStatus = localstorageArray[1]
        const checkboxID = "task" + (i + 1) + "checkbox";
        const checkStatus = localstorageArray[1];
        checkboxStatus = true;
        localStorage.setItem(i + 1, taskName + '|' + checkboxStatus);
      } else {
        const taggedText = this.parentElement.children[1].innerHTML;
        let strippedText = String(taggedText);
        strippedText = strippedText.replace("<s>", "<h3>");
        strippedText = strippedText.replace("</s>", "</h3>");
        this.parentElement.style.gridColumnStart = "2";
        this.parentElement.children[1].innerHTML = strippedText;
        this.parentElement.className = "gridContainer cardGrid task";
        const localstorageArray = String(localStorage.getItem(i + 1)).split("|");
        const taskName = localstorageArray[0]
        let checkboxStatus = localstorageArray[1]
        const checkboxID = "task" + (i + 1) + "checkbox";
        const checkStatus = localstorageArray[1];
        checkboxStatus = false;
        localStorage.setItem(i + 1, taskName + '|' + checkboxStatus);
      }
    });
  }
}

function checkboxListeners() {
  const checkbox = document.getElementsByClassName("checkBoxGrid");
  for (let i = 0; i < checkbox.length; i++) {
    const localstorageArray = String(localStorage.getItem(i + 1)).split("|");
    const taskName = localstorageArray[0]
    let checkboxStatus = localstorageArray[1]
    checkbox[i].outerHTML = checkbox[i].outerHTML; //strip stacked listeners
    const checkboxID = "task" + (i + 1) + "checkbox";
    const checkStatus = localstorageArray[1];
    document.getElementById(checkboxID)
    checkbox[i].addEventListener("change", function () {
      if (this.children[0].checked = true) {
        this.parentElement.style.gridColumnStart = "3";
        const taggedText = this.parentElement.children[1].innerHTML;
        let strippedText = String(taggedText);
        strippedText = strippedText.replace("<h3>", "<s>");
        strippedText = strippedText.replace("</h3>", "</s>");
        const newText = this.parentElement.children[1].innerHTML = strippedText;
        this.parentElement.className = "gridContainer cardGrid clicked task";
        localStorage.setItem((i + 1), [document.getElementById(`task${i + 1}TaskZone`).textContent + "|" + true]);
      } else {
        const taggedText = this.parentElement.children[1].innerHTML;
        let strippedText = String(taggedText);
        strippedText = strippedText.replace("<s>", "<h3>");
        strippedText = strippedText.replace("</s>", "</h3>");
        this.parentElement.style.gridColumnStart = "2";
        const restoredText = this.parentElement.children[1].innerHTML = strippedText;
        this.parentElement.className = "gridContainer cardGrid task";
        localStorage.setItem((i + 1), [document.getElementById(`task${i + 1}TaskZone`).textContent + "|" + false]);
      }
    })
  }
}

function renameTodoListener() {
  const todoText = document.getElementsByClassName("taskZone");
  for (let i = 0; i < todoText.length; i++) {
    todoText[i].addEventListener("dblclick", renameTodoListenerDblclick);
  }
};

function renameTodoListenerDblclick() {
  // newTaskName = prompt("Please enter your new ToDo text", this.children[0].innerHTML);
  const localstorageRenameItemString = String(this.id).slice(4, -8);
  const localstorageRenameItem = Number(localstorageRenameItemString);
  const localstorageArray = String(localStorage.getItem(localstorageRenameItem)).split("|");
  const taskName = localstorageArray[0]
  let checkboxStatus = localstorageArray[1]
  const newTaskName = prompt("Please enter your new ToDo text", taskName);
  localStorage.setItem(localstorageRenameItem, `${newTaskName}|${checkboxStatus}`)
  this.innerHTML = "<h3>" + newTaskName;
  if (checkboxStatus == "true") {
    this
  }
}

function addMainTask(taskName = prompt("Please enter your ToDo", "My ToDo")) {
  let taskCounter = document.querySelectorAll(".task").length + 1;
  let taskID = "task" + taskCounter;
  let newToDoHTML = `<section class="gridContainer cardGrid task" id="${taskID}">
                      <div class="gridContainer checkBoxGrid" id="${taskID}checkBoxGrid">
                          <input type="CheckBox" name="taskCheckBox" id="${taskID}checkbox"></div>
                      <div class="gridContainer taskZone" id="${taskID}TaskZone"><h3>${taskName}</h3 ></div >
                      <div class="gridContainer removeTask signBuffer" id="${taskID}signBuffer">
                          <div class="gridContainer removeTask plusSign" id="${taskID}removeTask">
                              <div class="removeTask plusLine vertical" id="${taskID}plusVertical"></div>
                              <div class="removeTask plusLine horizontal" id="${taskID}plusHorizontal"></div>
                          </div>
                      </div>
                      <!--  <div class="gridContainer hamburgerMenuBuffer" id="${taskID}HamburgerMenuBuffer">
                          <div class="gridContainer hamburgerMenu" id="${taskID}HamburgerMenu">
                              <div class="hamburgerStripe hamburgerStripe1" id="${taskID}hamburgerStripe1"></div>
                              <div class="hamburgerStripe hamburgerStripe2" id="${taskID}hamburgerStripe2"></div>
                              <div class="hamburgerStripe hamburgerStripe3" id="${taskID}hamburgerStripe3"></div>
                          </div>
                      </div> -->     
                    </section>`

  document.querySelector("#bodyGrid").insertAdjacentHTML("beforeend", newToDoHTML);

  localStorage.setItem(taskCounter, [taskName + "|" + false]);

  removeTaskListener();
  //hamburgerListener();
  checkboxListener();
  renameTodoListener();
  getAllopenTasks();
}

function setPlusColor(plusID, color) {
  document.getElementById(plusID[0].id).style.backgroundColor = color;
  document.getElementById(plusID[1].id).style.backgroundColor = color;
}

function reorderAllTaskID() {
  const taskIDReorder = document.getElementsByClassName("cardGrid task");
  for (let i = 0; i < taskIDReorder.length; i++) {
    taskIDReorder[i].id = "task" + (i + 1);
  }

  const checkBoxGridIDReOrder = document.getElementsByClassName("checkBoxGrid");
  for (let i = 0; i < checkBoxGridIDReOrder.length; i++) {
    checkBoxGridIDReOrder[i].id = "task" + (i + 1) + "checkBoxGrid";
  }

  const checkBoxIDReOrder = document.getElementsByName("taskCheckBox");
  for (let i = 0; i < checkBoxGridIDReOrder.length; i++) {
    checkBoxIDReOrder[i].id = "task" + (i + 1) + "checkbox";
  }

  const taskZoneReOrder = document.getElementsByClassName("taskZone");
  for (let i = 0; i < taskZoneReOrder.length; i++) {
    taskZoneReOrder[i].id = "task" + (i + 1) + "taskZone";
  }

  const signBufferReOrder = document.getElementsByClassName("signBuffer");
  for (let i = 0; i < signBufferReOrder.length; i++) {
    signBufferReOrder[i].id = "task" + (i + 1) + "signBuffer";
  }

  const removeTaskReOrder = document.getElementsByClassName("removeTask plusSign");
  for (let i = 0; i < removeTaskReOrder.length; i++) {
    removeTaskReOrder[i].id = "task" + (i + 1) + "removeTask";
  }

  const plusVerticalReOrder = document.getElementsByClassName("plusLine vertical");
  for (let i = 0; i < plusVerticalReOrder.length; i++) {
    plusVerticalReOrder[i].id = "task" + (i) + "plusVertical";
  }

  const plusHorizontalReOrder = document.getElementsByClassName("plusLine horizontal");
  for (let i = 0; i < plusHorizontalReOrder.length; i++) {
    plusHorizontalReOrder[i].id = "task" + (i) + "plusHorizontal";
  }

  const hamburgerMenuBufferReOrder = document.getElementsByClassName("hamburgerMenuBuffer");
  for (let i = 0; i < hamburgerMenuBufferReOrder.length; i++) {
    hamburgerMenuBufferReOrder[i].id = "task" + (i + 1) + "HamburgerMenuBuffer";
  }

  const hamburgerMenuReOrder = document.getElementsByClassName("hamburgerMenu");
  for (let i = 0; i < hamburgerMenuReOrder.length; i++) {
    hamburgerMenuReOrder[i].id = "task" + (i + 1) + "HamburgerMenu";
  }

  const hamburgerStripe1ReOrder = document.getElementsByClassName("hamburgerStripe1");
  for (let i = 0; i < hamburgerStripe1ReOrder.length; i++) {
    hamburgerStripe1ReOrder[i].id = "task" + (i + 1) + "hamburgerStripe1";
  }

  const hamburgerStripe2ReOrder = document.getElementsByClassName("hamburgerStripe2");
  for (let i = 0; i < hamburgerStripe2ReOrder.length; i++) {
    hamburgerStripe2ReOrder[i].id = "task" + (i + 1) + "hamburgerStripe2";
  }

  const hamburgerStripe3ReOrder = document.getElementsByClassName("hamburgerStripe3");
  for (let i = 0; i < hamburgerStripe3ReOrder.length; i++) {
    hamburgerStripe3ReOrder[i].id = "task" + (i + 1) + "hamburgerStripe3";
  }

  removeTaskListener();
  //hamburgerListener();
  checkboxListener();
  renameTodoListener();
  getAllopenTasks();
}

//###### Start: Display clock on footer left side#######
window.addEventListener('load', display_ct());
function display_c() {
  var refresh = 1000; // Refresh rate in milli seconds
  mytime = setTimeout('display_ct()', refresh)
}

function display_ct() {
  var x = new Date()
  var ampm = x.getHours() >= 12 ? ' PM' : ' AM';

  var x1 = x.getMonth() + 1 + "/" + x.getDate() + "/" + x.getFullYear();
  document.getElementById("clock").innerHTML = x1;

  var x2 = x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds();
  document.getElementById("clock2").innerHTML = x2;
  display_c();
}
//###### End: Display clock on footer left side#######


//###### Start: Display open tasks on footer midle #######
window.addEventListener('load', getAllopenTasks());
function getAllopenTasks() {
  let allTasks = document.getElementsByClassName("gridContainer cardGrid task");
  if (allTasks.length == 0) {
    document.getElementById("ot").innerHTML = '';
  } else {
    document.getElementById("ot").innerHTML = allTasks.length;
  }
}
//###### Ende: Display open tasks on footer midle #######

function resizeLogo() {
  if (window.innerWidth >= 530) {
    document.querySelector("#LogoContainer").style.zoom = 0.5;
  } else {
    document.querySelector("#LogoContainer").style.zoom = (window.innerWidth / 1060); //scaling starts at zoom factor 0.5 
  }
}
