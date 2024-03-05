## Screenshots 
### My main idea was to allow a way for college students to save money by keeping track of local restaurant and food deals in the area. Things can change a week to week basis and I wouldve liked to add a year component and history tab as well but didn't complete those tasks.

### Here is my base project with a few filler example todos.
![Base](https://github.com/nak625/assignmnet1/assets/123668402/a54f6c24-b88e-4720-afe3-2cf33ce0a4ab)
### Day of week is done by html option drop down menu
![Mid_term](https://github.com/nak625/assignmnet1/assets/123668402/f39cf2cb-a697-47c7-8c1a-b67809bb5a91)
### Restaurant Deals are sorted on a Sunday-Saturday basis and the days are color coded.

![Sorted](https://github.com/nak625/assignmnet1/assets/123668402/8fc8186e-481e-4064-84c9-d4891065d966)

## Changes I made to TODO app
## 1. Added Day of week

Had to add an option in index.html for them to choose a day of the week.
This value then had to be added to model.py and main.py so that it could be accesses and stored for all CRUD operations.

## 2.Javascript now sorts by todos by day of week

Below is the edited main.js file that shows changes need to sort and show day of week.

  '''bash
    let dayInput = document.getElementById('dayOfWeek');

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
css style additions are below.
  '''bash
    /* Define classes for each day of the week */
    .day-Monday {
      background-color: #bb1313!important; 
    }

    .day-Tuesday {
      background-color: #213112!important; 
    }

    .day-Wednesday {
      background-color: #05c505!important; 
    }
    .day-Thursday{
      background-color: #3bad2c!important; 
    }

    .day-Friday {
      background-color: #bdbdb0!important;
    }

    .day-Saturday {
      background-color: #25b8b8!important;
    }

    .day-Sunday {
      background-color: #112dc9!important;
    }

  
##  Python virtual environment

```powershell
python -m venv venv
.\venv\Scripts\activate
```

```powershell
deactivate
```

##  pip

Pip is automatically installed during a Python installation. You can verify whether pip is
installed by running the following command in your terminal:

```powershell
python -m pip list
```

The preceding command should return a list of packages installed.

### Basic commands

With pip installed, let's learn its basic commands. To install the FastAPI package with
pip, we run the following command:

```powershell
pip install fastapi
```

On a Unix operating system, such as Mac or Linux, in some cases, the sudo keyword is
prepended to install global packages.

To uninstall a package, the following command is used:

```powershell
pip uninstall fastapi
```

To collate the current packages installed in a project into a file, we use the following
freeze command:

```powershell
pip freeze > requirements.txt
```

The > operator tells bash to save the output from the command into the
`requirements.txt` file. This means that running pip freeze returns an output of
all the currently installed packages.

To install packages from a file such as the `requirements.txt` file, the following
command is used:

```powershell
pip install -r requirements.txt
```

The preceding command is mostly used in deployment.

## uvicorn

We'll begin by installing the dependencies required for our application in the todos
folder we created earlier. The dependencies are the following:

- fastapi: The framework on which we'll build our application.
- uvicorn: An Asynchronous Server Gateway Interface module to run our application.

First, activate your development environment by running the following command in your
project directory:

```powershell
source venv/bin/activate
```

Then, install the dependencies as follows:

```powershell
(venv)$ pip install fastapi uvicorn
```

The next step is to start our application using uvicorn. In your terminal, run the
following command:

```powershell
(venv)$ uvicorn main:app --port 8000 --reload
```

In the preceding command, uvicorn takes the following arguments:

- `file:instance`: The file containing the instance of FastAPI and the name
  variable holding the FastAPI instance.
- `--port PORT`: The port the application will be served on.
- `--reload`: An optional argument included to restart the application on every
  file change.

```powershell
python -m venv venv
.\venv\Scripts\activate
pip install fastapi uvicorn
# pip freeze > requirements.txt
pip freeze | Out-File -Encoding UTF8 requirements.txt

# pip uninstall -r requirements.txt -y
```
