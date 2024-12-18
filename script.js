const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addButton = document.getElementById("addButton");
const sortButton = document.getElementById("sortButton");
const taskList = document.getElementById("taskList");

// タスクを追加する
addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value; // 優先順位を取得

    if (taskText !== "") {
        addTaskToList(taskText, priority);
        taskInput.value = "";
        prioritySelect.value = "1"; // 優先順位を初期化
        saveTasks();
    }
});

// タスクをリストに追加する関数
function addTaskToList(taskText, priority) {
    const li = document.createElement("li");
    li.setAttribute("data-priority", priority); // 優先順位をデータ属性として保存
    li.innerHTML = `
        <span>[優先度 ${priority}] ${taskText}</span>
        <button class="deleteButton">削除</button>
    `;
    taskList.appendChild(li);
}

// タスクを削除する
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteButton")) {
        e.target.parentElement.remove();
        saveTasks();
    }
});

// 優先順位順に並び替える
sortButton.addEventListener("click", () => {
    const tasks = Array.from(taskList.querySelectorAll("li"));

    tasks.sort((a, b) => {
        const priorityA = parseInt(a.getAttribute("data-priority"));
        const priorityB = parseInt(b.getAttribute("data-priority"));
        return priorityA - priorityB; // 優先順位が低い順に並び替え
    });

    // 並び替えたタスクを再描画
    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));

    saveTasks(); // 並び替えた結果を保存
});

// タスクデータを保存する
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.textContent.replace("削除", "").trim(),
            priority: li.getAttribute("data-priority")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 保存されたデータを読み込む
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToList(task.text, task.priority));
}

loadTasks(); // ページ読み込み時に保存データを読み込む
