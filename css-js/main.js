document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi variabel untuk menampung elemen
  const dateElement = document.getElementById("date");
  const taskForm = document.getElementById("task-form");
  const taskTable = document.getElementById("task-table").getElementsByTagName("tbody")[0];
  const deleteAllButton = document.getElementById("delete-all");

  // Menambahkan tanggal
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const today = new Date();
  const dateString = today.toLocaleDateString("id-ID", options);
  dateElement.textContent = dateString;

  // Menambah event listener untuk form submit
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskInput = document.getElementById("task-input");
    const taskLevel = document.getElementById("task-level");
    const taskValue = taskInput.value;
    const taskLevelValue = taskLevel.value;
    const dateValue = new Date().toLocaleDateString();

    // Menambahkan row ke table
    const newRow = taskTable.insertRow();

    // Menambahkan cell ke row
    const taskCell = newRow.insertCell(0);
    const dateCell = newRow.insertCell(1);
    const levelCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);
    const deleteCell = newRow.insertCell(4);

    // Menambahkan text ke cell
    taskCell.textContent = taskValue;
    dateCell.textContent = dateValue;
    levelCell.textContent = taskLevelValue;

    // Menambahkan completed cell
    const completedCell = document.createElement("h1");

    // membuat checkbox dan menambahkan event listener untuk checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        taskCell.style.textDecoration = "line-through";
        dateCell.style.textDecoration = "line-through";
        levelCell.style.textDecoration = "line-through";
        completedCell.style.textDecoration = "none";
        completedCell.textContent = `${taskValue}  (Tugas Selesai)`;
        completedCell.classList.add("completed");
        document.getElementById("completed-list").appendChild(completedCell);
      } else {
        taskCell.style.textDecoration = "none";
        dateCell.style.textDecoration = "none";
        levelCell.style.textDecoration = "none";
        completedCell.textContent = "";
        completedCell.classList.remove("completed");
        
      }
    });
    actionCell.appendChild(checkbox);

    // Menambahkan delete button ke cell
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", function () {
      taskTable.deleteRow(newRow.rowIndex - 1); //
      completedCell.remove();
    });
    deleteCell.appendChild(deleteButton);
    taskInput.value = "";
  });

  // Menambahkan event listener untuk delete all button
  deleteAllButton.addEventListener("click", function () {
    taskTable.innerHTML = "";
    document.getElementById("completed-list").innerHTML = "";
  });
});
