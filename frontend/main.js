let titleInput = document.getElementById('title');
let descInput = document.getElementById('desc');
let dayInput = document.getElementById('dayOfWeek');
let todoId = document.getElementById('todo-id');
let titleEditInput = document.getElementById('title-edit');
let descEditInput = document.getElementById('desc-edit');
let dayEditInput = document.getElementById('dayOfWeek-edit');
let todos = document.getElementById('todos');
let data = [];
let selectedTodo = {};
const api = 'http://127.0.0.1:8000';

function tryAdd() {
  let msg = document.getElementById('msg');
  msg.innerHTML = '';
}

document.getElementById('form-add').addEventListener('submit', (e) => {
  e.preventDefault();

  if (!titleInput.value) {
    document.getElementById('msg').innerHTML = 'Todo cannot be blank';
  } else {
    addTodo(titleInput.value, descInput.value, dayInput.value);

    // close modal
    let add = document.getElementById('add');
    add.setAttribute('data-bs-dismiss', 'modal');
    add.click();
    (() => {
      add.setAttribute('data-bs-dismiss', '');
    })();
  }
});

let addTodo = (title, description, dayOfWeek) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
      const newTodo = JSON.parse(xhr.responseText);
      data.push(newTodo);
      refreshTodos();
    }
  };
  xhr.open('POST', `${api}/todos`, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({ title, description, dayOfWeek}));
};

let refreshTodos = () => {
  todos.innerHTML = '';

  const dayOrder = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  data
    .sort((a, b) => {
      // Get the index of each dayOfWeek in the custom order
      const indexA = dayOrder.indexOf(a.dayOfWeek);
      const indexB = dayOrder.indexOf(b.dayOfWeek);
      
      // Compare the indexes to determine the order
      return indexA - indexB;
    })  
    .map((x) => {
      return (todos.innerHTML += `
        <div id="todo-${x.id}" class="todo-item ${x.dayOfWeek}">
          <span class="fw-bold fs-4">${x.title}</span>
          <span class="badge bg-secondary day-${x.dayOfWeek}">${x.dayOfWeek}</span>
          <pre class="text-secondary ps-3">${x.description}</pre>
          <span class="options">
            <i onClick="tryEditTodo(${x.id})" data-bs-toggle="modal" data-bs-target="#modal-edit" class="fas fa-edit"></i>
            <i onClick="deleteTodo(${x.id})" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
    });

  resetForm();
};

let tryEditTodo = (id) => {
  const todo = data.find((x) => x.id === id);
  selectedTodo = todo;
  todoId.innerText = todo.id;
  titleEditInput.value = todo.title;
  descEditInput.value = todo.description;
  dayEditInput.value = todo.dayOfWeek;
  document.getElementById('msg').innerHTML = '';
};

document.getElementById('form-edit').addEventListener('submit', (e) => {
  e.preventDefault();

  if (!titleEditInput.value) {
    msg.innerHTML = 'Todo cannot be blank';
  } else {
    editTodo(titleEditInput.value, descEditInput.value, dayEditInput.value);

    // close modal
    let edit = document.getElementById('edit');
    edit.setAttribute('data-bs-dismiss', 'modal');
    edit.click();
    (() => {
      edit.setAttribute('data-bs-dismiss', '');
    })();
  }
});

let editTodo = (title, description, dayOfWeek) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      selectedTodo.title = title;
      selectedTodo.description = description;
      selectedTodo.dayOfWeek = dayOfWeek;
      refreshTodos();
    }
  };
  xhr.open('PUT', `${api}/todos/${selectedTodo.id}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({ title, description, dayOfWeek: selectedTodo.dayOfWeek}));
};

let deleteTodo = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = data.filter((x) => x.id !== id);
      refreshTodos();
    }
  };
  xhr.open('DELETE', `${api}/todos/${id}`, true);
  xhr.send();
};

let resetForm = () => {
  titleInput.value = '';
  descInput.value = '';
  dayInput.value = '';
};

let getTodos = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = JSON.parse(xhr.responseText) || [];
      refreshTodos();
    }
  };
  xhr.open('GET', `${api}/todos`, true);
  xhr.send();
};

(() => {
  getTodos();
})();

