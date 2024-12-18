document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addButton');
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskList = document.getElementById('taskList');
    const sortButton = document.getElementById('sortButton');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // タスクを表示する関数
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                【優先度: ${task.priority}】 ${task.text}
                <button onclick="deleteTask(${index})">削除</button>
            `;
            taskList.appendChild(listItem);
        });
        saveTasks();
    }

    // タスク追加機能
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;

        if (taskText === '') {
            alert('タスクを入力してください！');
            return;
        }

        tasks.push({ text: taskText, priority: priority });
        displayTasks();

        taskInput.value = '';
    });

    // タスク削除機能
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        displayTasks();
    };

    // 優先順位順に並び替え
    sortButton.addEventListener('click', function () {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
        displayTasks();
    });

    // タスクをローカルストレージに保存する関数
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // ページ読み込み時にタスクを表示
    displayTasks();
});
