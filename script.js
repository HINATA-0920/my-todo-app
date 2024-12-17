document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    // タスクを追加する関数
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        // 新しいタスク要素を作成
        const li = document.createElement("li");
        li.textContent = taskText;

        // 完了ボタン
        const completeButton = document.createElement("button");
        completeButton.textContent = "完了";
        completeButton.addEventListener("click", function() {
            li.classList.toggle("completed");
        });

        // 削除ボタン
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(li);
        });

        // タスクにボタンを追加
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        // タスクをリストに追加
        taskList.appendChild(li);

        // 入力欄をクリア
        taskInput.value = "";
    }

    // 追加ボタンのイベント
    addButton.addEventListener("click", addTask);

    // Enterキーでもタスクを追加
    taskInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
});
