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
  let i = 0;
  for (const item of ToDoList) {
    console.log(item);
    const li = document.createElement("li");
    const todotext = document.createTextNode(item);
    li.appendChild(todotext);
    li.dataset.id = i;
    li.onclick = todo_delete;
    clone.appendChild(li);
    i = i + 1;
  }
  ul.parentNode.replaceChild(clone, ul);
}

async function todo_delete(event) {
  const del_index = event.target.dataset.id;
  const ToDoList = await window.dataapi.getlist();
  ToDoList.splice(del_index, 1);
  await window.dataapi.setlist(ToDoList);
  listview();
}

window.dataapi.on_todo_all_del(() => {
  listview();
});

listview();