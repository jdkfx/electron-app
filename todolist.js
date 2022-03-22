async function addToDo() {
  const item = document.querySelector("#ToDoItem").value;
  if (item === "") {
    return
  }
  const ToDoList = await window.dataapi.getlist();
  ToDoList.push(item);
  await window.dataapi.setlist(ToDoList);
  listview();
}

async function listview() {
  const ul = document.querySelector("#ToDolist");
  const clone = ul.cloneNode(false);
  const ToDoList = await window.dataapi.getlist();
  for (const item of ToDoList) {
    console.log(item);
    const li = document.createElement("li");
    const todotext = document.createTextNode(item);
    li.appendChild(todotext);
    clone.appendChild(li);
  }
  ul.parentNode.replaceChild(clone, ul);
}

listview();