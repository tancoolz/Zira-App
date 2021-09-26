let TC = document.querySelector(".ticket-container");
let allFilters = document.querySelectorAll(".filter");
let modalVisible = false;
let selectedPriority = "pink";
let deleteButton = document.querySelector(".delete");
let task = "";
for(let i = 0 ; i < allFilters.length ; i++){
    allFilters[i].addEventListener("click",filterHandler);
}

function filterHandler(e){
    // let filter = e.currentTarget.children[0].classList[0];
    // TC.style.backgroundColor = filter.split("-")[0];
}

let addButton = document.querySelector(".add");
addButton.addEventListener("click",showModal);

function showModal(e){
    if(!modalVisible){
        let modal = document.createElement("div");
        modal.classList.add("modal");

    modal.innerHTML = `<div class = "task-to-be-added" data-type="false" contenteditable="true" spellCheck="false">
    <span class = "placeholder">Enter your text here</span>
    </div>
    <div class = "priority-list">
        <div class = "pink-modal-filter modal-filter active"></div>
        <div class = "blue-modal-filter modal-filter "></div>
        <div class = "green-modal-filter modal-filter "></div>
        <div class = "yellow-modal-filter modal-filter "></div>
</div>`
TC.appendChild(modal);
// selectPriority = "pink";
let taskTyper = document.querySelector(".task-to-be-added");
taskTyper.addEventListener("click",function(e){
    if(e.currentTarget.getAttribute("data-type") == "false"){
        e.currentTarget.innerHTML = "";
        e.currentTarget.setAttribute("data-type","true");
    }
   
})
taskTyper.addEventListener("keypress",addTicket.bind(this,taskTyper));
modalVisible = true;

let modalFilters = document.querySelectorAll(".modal-filter");

for(let i = 0 ; i < modalFilters.length ; i++){
    modalFilters[i].addEventListener("click",selectPriority);
}
    }

}


function selectPriority(e){
   let activeFilter = document.querySelector(".modal-filter.active");
   activeFilter.classList.remove("active");
   selectPriority = e.currentTarget.classList[0].split("-")[0];
   e.currentTarget.classList.add("active");
}

function addTicket(taskTyper,e){
   if(e.key=="Enter"&& e.shiftKey==false&& taskTyper.innerText.trim()!=""){
       let ticket = document.createElement("div");
       let id = uid();
       let task = taskTyper.innerText;
       ticket.classList.add("ticket");
         ticket.innerHTML = `<div class = "ticket-color-${selectPriority}">
           <div class = "ticket-id">${id}</div>
           <div class = "task">
            ${task}
           </div>`
      
         document.querySelector(".modal").remove();
         modalVisible = false;
         ticket.addEventListener("click",function(e){
            if(e.currentTarget.classList.contains("active")){
                e.currentTarget.classList.remove("active");
            }else{
                e.currentTarget.classList.add("active");
            }
         });

         TC.appendChild(ticket);
         let allTaskData = localStorage.getItem("alltasks");
         if(allTaskData==null){
             data = [{"taskId" : id , "task" : task , "selectedPriority" : selectedPriority }];
             localStorage.setItem("allTasks",JSON.stringify(data));
         }else{
             let data = JSON.parse("allTask",data);
             data.push({"taskId" : id , "task" : task , "selectedPriority" : selectedPriority });
             localStorage.setItem("allTasks",JSON.stringify(data));
         }
   }else if(e.key=="Enter"&&e.shiftKey==false){
       e.preventDefault();
       alert("You have not typed anything!!")
   }
}

deleteButton.addEventListener("click",function(e){
        let selectedTicket = document.querySelectorAll(".ticket.active");
        for(let i = 0 ; i < selectedTicket.length ; i++){
            selectedTicket[i].remove();
        }
})