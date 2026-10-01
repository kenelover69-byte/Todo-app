const TASKS_KEY = "todoapp.tasks";
const THEME_KEY = "todoapp.dark";

let tasks = JSON.parse(
    localStorage.getItem(TASKS_KEY) || "[]"
);

let darkMode =
    localStorage.getItem(THEME_KEY) === "true";


const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const themeButton = document.getElementById("themeButton");


function saveTasks() {
    localStorage.setItem(
        TASKS_KEY,
        JSON.stringify(tasks)
    );
}


function renderTasks() {

    list.innerHTML = "";

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";


    tasks.forEach((task, index) => {

        const row = document.createElement("div");

        row.className =
            "task" + (task.completed ? " completed" : "");


        const checkButton =
            document.createElement("button");

        checkButton.className = "check";

        checkButton.textContent =
            task.completed ? "✓" : "○";


        checkButton.onclick = () => {

            tasks[index].completed =
                !tasks[index].completed;

            saveTasks();
            renderTasks();
        };


        const text =
            document.createElement("span");

        text.textContent = task.text;


        const deleteButton =
            document.createElement("button");

        deleteButton.className = "delete";

        deleteButton.textContent = "×";


        deleteButton.onclick = () => {

            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        };


        row.appendChild(checkButton);
        row.appendChild(text);
        row.appendChild(deleteButton);

        list.appendChild(row);
    });
}


form.addEventListener("submit", (event) => {

    event.preventDefault();

    const text = input.value.trim();

    if (!text) {
        return;
    }


    tasks.push({
        text: text,
        completed: false
    });


    input.value = "";

    saveTasks();

    renderTasks();

    input.focus();
});


themeButton.onclick = () => {

    darkMode = !darkMode;

    localStorage.setItem(
        THEME_KEY,
        darkMode
    );

    updateTheme();
};


function updateTheme() {

    document.body.classList.toggle(
        "dark",
        darkMode
    );

    themeButton.textContent =
        darkMode ? "🌙" : "☀️";
}


updateTheme();
renderTasks();