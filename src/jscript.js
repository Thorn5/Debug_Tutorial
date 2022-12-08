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

function removeTaskListener() {
  document.querySelectorAll('.removeTask.plusSign').forEach(element => {
    element.addEventListener('mouseover', () => {
      const hoverBackgroundColor = "green";
      element.children[0].style.backgroundColor = hoverBackgroundColor;
      element.children[1].style.backgroundColor = hoverBackgroundColor;
    })
  })
  document.querySelectorAll('.removeTask.plusSign').forEach(element => {
    element.addEventListener('mouseout', () => {
      const hoverBackgroundColor = "orangered";
      element.children[0].style.backgroundColor = hoverBackgroundColor;
      element.children[1].style.backgroundColor = hoverBackgroundColor;
    })
  })
  document.querySelectorAll('.removeTask.plusSign').forEach(element => {
    element.addEventListener('click', () => {
      element.parentElement.parentElement.remove();
      reorderAllTaskID();
    })
  })
}

function hamburgerListener() {
  document.querySelectorAll('.hamburgerMenu').forEach(element => {
    element.addEventListener('mouseover', () => {
      const hoverBackgroundColor = "red";
      element.children[1].style.backgroundColor = hoverBackgroundColor;
      element.children[0].style.backgroundColor = hoverBackgroundColor;
      element.children[2].style.backgroundColor = hoverBackgroundColor;
    })
  })
  document.querySelectorAll('.hamburgerMenu').forEach(element => {
    const hoverOutBackgroundColor = "blue";
    element.addEventListener('mouseout', () => {
      element.children[0].style.backgroundColor = hoverOutBackgroundColor;
      element.children[1].style.backgroundColor = hoverOutBackgroundColor;
      element.children[2].style.backgroundColor = hoverOutBackgroundColor;
    })
  })
  document.querySelectorAll('.hamburgerMenu').forEach(element => {
    element.addEventListener('click', () => {
      hamBurgerClick(element);
    })
  })
}

function checkboxListener() {
  const checkbox = document.getElementsByClassName("checkBoxGrid");
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("change", function () {
      if (this.children[0].checked) {
        this.parentElement.style.gridColumnStart = "3";
        const taggedText = this.parentElement.children[1].innerHTML;
        let strippedText = String(taggedText);
        strippedText = strippedText.replace("<h3>", "<s>");
        strippedText = strippedText.replace("</h3>", "</s>");
        const newText = this.parentElement.children[1].innerHTML = strippedText;
      } else {
        const taggedText = this.parentElement.children[1].innerHTML;
        let strippedText = String(taggedText);
        strippedText = strippedText.replace("<s>", "<h3>");
        strippedText = strippedText.replace("</s>", "</h3>");
        this.parentElement.style.gridColumnStart = "2";
        const restoredText = this.parentElement.children[1].innerHTML = strippedText;
      }
    });
  }
}

function renameTodoListener() {
  document.querySelectorAll('.taskZone').forEach(element => {
    element.addEventListener('dblclick', () => {   
      newTaskName = prompt("Please enter your new ToDo text", element.children[0].innerHTML);
      element.innerHTML = "<h3>" + newTaskName;

    })
  })
}

addTaskListener(); //trigger event listeners
removeTaskListener();
hamburgerListener();
checkboxListener();
renameTodoListener();

function addMainTask(taskName = prompt("Please enter your ToDo", "My ToDo")) {
  let taskCounter = document.querySelectorAll(".task.cardGrid").length + 1;
  let taskID = "task" + taskCounter;
  const newTaskNode = document.createElement("section");
  newTaskNode.className = "gridContainer cardGrid task";
  newTaskNode.id = taskID;
  document.getElementById("bodyGrid").appendChild(newTaskNode);

  const newCheckBoxGrid = document.createElement("div");
  newCheckBoxGrid.className = "gridContainer checkBoxGrid";
  newCheckBoxGrid.id = taskID + "checkBoxGrid";
  document.getElementById(taskID).appendChild(newCheckBoxGrid);

  const newCheckBox = document.createElement("INPUT");
  newCheckBox.setAttribute("type", "CheckBox");
  newCheckBox.setAttribute("name", "taskCheckBox");
  newCheckBox.id = taskID + "checkbox";
  document.getElementById(taskID + "checkBoxGrid").appendChild(newCheckBox);

  const newTaskZone = document.createElement("div");
  newTaskZone.className = "gridContainer taskZone";
  newTaskZone.id = taskID + "TaskZone";
  newTaskZone.innerHTML = "<h3>" + taskName;
  document.getElementById(taskID).appendChild(newTaskZone);

  const newsignBuffer = document.createElement("div");
  newsignBuffer.className = "gridContainer signBuffer";
  newsignBuffer.id = taskID + "signBuffer";
  document.getElementById(taskID).appendChild(newsignBuffer);

  const newPlusSign = document.createElement("div");
  newPlusSign.className = "gridContainer removeTask plusSign";
  newPlusSign.id = taskID + "removeTask";
  document.getElementById(taskID + "signBuffer").appendChild(newPlusSign);

  const newVertical = document.createElement("div");
  newVertical.className = "removeTask plusLine vertical";
  newVertical.id = taskID + "plusVertical";
  document.getElementById(taskID + "removeTask").appendChild(newVertical);

  const newHorizontal = document.createElement("div");
  newHorizontal.className = "removeTask plusLine horizontal";
  newHorizontal.id = taskID + "plusHorizontal";
  document.getElementById(taskID + "removeTask").appendChild(newHorizontal);

  const newHamburgerMenuBuffer = document.createElement("div");
  newHamburgerMenuBuffer.className = "gridContainer hamburgerMenuBuffer";
  newHamburgerMenuBuffer.id = taskID + "HamburgerMenuBuffer";
  document.getElementById(taskID).appendChild(newHamburgerMenuBuffer);

  const newHamburgerMenu = document.createElement("div");
  newHamburgerMenu.className = "gridContainer hamburgerMenu";
  newHamburgerMenu.id = taskID + "HamburgerMenu";
  document
    .getElementById(taskID + "HamburgerMenuBuffer")
    .appendChild(newHamburgerMenu);

  const newHamStripe1 = document.createElement("div");
  newHamStripe1.className = "hamburgerStripe hamburgerStripe1";
  newHamStripe1.id = taskID + "hamburgerStripe1";
  document.getElementById(taskID + "HamburgerMenu").appendChild(newHamStripe1);

  const newHamStripe2 = document.createElement("div");
  newHamStripe2.className = "hamburgerStripe hamburgerStripe2";
  newHamStripe2.id = taskID + "hamburgerStripe2";
  document.getElementById(taskID + "HamburgerMenu").appendChild(newHamStripe2);

  const newHamStripe3 = document.createElement("div");
  newHamStripe3.className = "hamburgerStripe hamburgerStripe3";
  newHamStripe3.id = taskID + "hamburgerStripe3";
  document.getElementById(taskID + "HamburgerMenu").appendChild(newHamStripe3);

  removeTaskListener();
  hamburgerListener();
  checkboxListener();
  renameTodoListener();
}

function setPlusColor(plusID, color) {
  document.getElementById(plusID[0].id).style.backgroundColor = color;
  document.getElementById(plusID[1].id).style.backgroundColor = color;
  // document.getElementById(plusID + "Vertical").style.backgroundColor = color;
  // document.getElementById(plusID + "Horizontal").style.backgroundColor = color;
}

function hamBurgerClick(element) {
  console.log("HamburgerMenu " + element.id + " clicked");
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
    signBufferReOrder[i].id = "task" + (i) + "signBuffer";
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
  hamburgerListener();
  checkboxListener();
  renameTodoListener();
}

function resizeLogo() {
  if (window.innerWidth >= 530) {
    document.querySelector("#LogoContainer").style.zoom = 0.5;
  } else {
    document.querySelector("#LogoContainer").style.zoom = (window.innerWidth / 1060); //scaling starts at zoom factor 0.5 
  }  
}
