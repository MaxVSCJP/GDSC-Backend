class TODO{
    constructor(id, item, status){
        this.id = id;
        this.item = item;
        this.status = status;
    }

    finishTask() {
        this.status = true;
    }

    unfinishTask(){
        this.status = false;
    }
}

function makeTODO(item){
    let id;
    if(toDoList.length === 0){
        id = 0;
    }
    else{
        id = toDoList.reduce((max, cur) => {
            return cur.id > max ? cur.id : max;
        }) + 1;
    }
    
    return new TODO(id, item, false);
}

const toDoList = [];

function addTODO(toDoItem){
    toDoList.push(toDoItem);
}

function deleteTODO(toDoItem){
    toDoList.splice(toDoList.indexOf(toDoItem), 1);
}

/* function findTODO(textItem){
    return toDoList.filter((todo) => {
        return todo.item = textItem;
    });
} */


function addToPage(toDoItem){
    const inputText = document.getElementById("list");

    let toDoItemHTML = document.createElement("li");
    toDoItemHTML.innerHTML = toDoItem.item;

    toDoItemHTML.setAttribute("id", toDoItem.id);
    inputText.appendChild(toDoItemHTML);

    let toDoCompletion = document.createElement("input");
    
    toDoCompletion.setAttribute("type", "checkbox");
    toDoItemHTML.insertAdjacentElement("afterbegin", toDoCompletion);
    toDoCompletion.addEventListener("click", () => {
        toDoItem.status = !toDoItem.status;
        });


    let toDoDelete = document.createElement("img");
    toDoDelete.setAttribute("src", "Delete icon.png");
    toDoDelete.setAttribute("alt", "Delete");
    toDoDelete.setAttribute("class", "delete");
    toDoDelete.style.position = "absolute";
    toDoDelete.style.right = "200px";
    toDoItemHTML.insertAdjacentElement("beforeend", toDoDelete);
    toDoDelete.addEventListener("click", () => {
        inputText.removeChild(toDoItemHTML);
        deleteTODO(toDoItem);
        });
    toDoDelete.addEventListener("mouseover", ()=>{
        toDoDelete.style.cursor = "pointer";
        console.log("Deleted");
    });
}




const inputText = document.getElementById("whatToDo");

inputText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const toDoItem = makeTODO(inputText.value);
        addTODO(toDoItem);
        addToPage(toDoItem);
        inputText.value = "";
        console.log(toDoItem.item);
    }
});





