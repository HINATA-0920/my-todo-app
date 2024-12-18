document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addButton'); // 追加ボタン
    const taskInput = document.getElementById('taskInput'); // タスク入力欄
    const prioritySelect = document.getElementById('prioritySelect'); // 優先順位選択
    const taskList = document.getElementById('taskList'); // タスクリスト
    const sortButton = document.getElementById('sortButton'); // 並び替えボタン

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // 保存済みデータをロード

    // タスクを表示する関数
    function displayTasks() {
        taskList.innerHTML = ''; // 一旦リストをクリア
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

        taskInput.value = ''; // 入力欄をクリア
    });

    // タスク削除機能
    window.deleteTask = function (index) {
        tasks.splice(index, 1); // 配列から該当タスクを削除
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
