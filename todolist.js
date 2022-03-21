function addToDo() {
  const item = document.querySelector("#ToDoItem").value;
  if (item === "") {
    return
  }
  const ul = document.querySelector("#ToDolist");
  const li = document.createElement("li");
  const todotext = document.createTextNode(item);
  li.appendChild(todotext);
  ul.appendChild(li);
}