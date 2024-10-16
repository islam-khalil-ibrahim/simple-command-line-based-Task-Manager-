let tasks = [];

// Load tasks from localStorage on page load
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  } else {
    tasks = [];
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to display all tasks in the console
function displayTasks() {
  if (tasks.length === 0) {
    console.log("No tasks available.");
  } else {
    console.log("\n--- Task List ---");
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1} _ ${task.description} [${
          task.completed ? "Completed" : "Not completed"
        }]`
      );
    });
  }
}

// Function to add a new task
const addTask = () => {
  const description = prompt("Enter task description:");
  if (description) {
    tasks.push({ description, completed: false });
    saveTasks(); // Save the updated tasks to localStorage
    console.log("Task added successfully!");
  } else {
    console.log("Task description cannot be empty.");
  }
};

// Function to update a task description
function updateTask() {
  if (tasks.length === 0) {
    console.log("You don't have any tasks to update.");
  } else {
    displayTasks();
    const taskId = parseInt(prompt("Enter task ID to update:")) - 1;
    if (taskId >= 0 && taskId < tasks.length) {
      const newDescription = prompt("Enter new description:");
      if (newDescription) {
        tasks[taskId].description = newDescription;
        saveTasks(); // Save the updated tasks to localStorage
        console.log("Task updated successfully!");
      } else console.log("Task description cannot be empty.");
    } else console.log("Invalid task ID.");
  }
}

// Function to toggle the completion status of a task
function toggleTaskCompletion() {
  if (tasks.length === 0) {
    console.log("You don't have any tasks to toggle.");
  } else {
    displayTasks();
    const taskId = parseInt(prompt("Enter task ID to toggle completion:")) - 1;
    if (taskId >= 0 && taskId < tasks.length) {
      tasks[taskId].completed = !tasks[taskId].completed;
      saveTasks(); // Save the updated tasks to localStorage
      console.log("Task status updated!");
    } else {
      console.log("Invalid task ID.");
    }
  }
}

// Function to remove a task from the list
function removeTask() {
  if (tasks.length === 0) {
    console.log("You don't have any tasks to remove.");
  } else {
    displayTasks();
    const taskId = parseInt(prompt("Enter task ID to remove:")) - 1;
    if (taskId >= 0 && taskId < tasks.length) {
      tasks.splice(taskId, 1);
      saveTasks(); // Save the updated tasks to localStorage
      console.log("Task removed successfully!");
    } else {
      console.log("Invalid task ID.");
    }}}

// Function to search for tasks by description
function searchTasks() {
  if (tasks.length === 0) {
    console.log("You don't have any tasks to search.");
  } else {
    const keyword = prompt("Enter a keyword to search for:");
    if (keyword) {
      const filteredTasks = tasks.filter((task) =>
        task.description.toLowerCase().includes(keyword.toLowerCase())
      );
      if (filteredTasks.length > 0) {
        console.log("\n--- Search Results ---");
        filteredTasks.forEach((task, index) => {
          const status = task.completed ? "Completed" : "Pending";
          console.log(`${index + 1}. ${task.description} [${status}]`);
        });
      } else {
        console.log("No tasks found matching the keyword.");
      }
    } else {
      console.log("Search keyword cannot be empty.");
    }
  }}

// Main menu function (console-based)
function mainMenu() {
  console.log(`
--- Task Manager ---
1. View Tasks
2. Add Task
3. Update Task Description
4. Toggle Task Completion
5. Remove Task
6. Search Tasks
7. Exit
Choose an option: \n`);
  let option = prompt("Please enter a number between 1 and 7");
  switch (option) {
    case "1":
      displayTasks();
      mainMenu();
      break;
    case "2":
      addTask();
      mainMenu();

      break;
    case "3":
      updateTask();
      mainMenu();
      break;
    case "4":
      toggleTaskCompletion();
      mainMenu();
      break;
    case "5":
      removeTask();
      mainMenu();
      break;
    case "6":
      searchTasks();
        mainMenu();
      break;
    case "7":
      console.log("Goodbye!");
      break;
    default:
      console.log("Invalid option, please try again.");
      mainMenu();
  }
}

// Load tasks from localStorage and start the task manager
loadTasks();
mainMenu();
