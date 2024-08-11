document.addEventListener("DOMContentLoaded", () => {
  const initialScreen = document.getElementById("initial-screen");
  const mainScreen = document.getElementById("main-screen");
  const nameInput = document.getElementById("name-input");
  const submitNameButton = document.getElementById("submit-name");
  const greetingDiv = document.getElementById("greeting");
  const quotesDiv = document.getElementById("quotes");
  const showTodoButton = document.getElementById("show-todo");
  const todoPopup = document.getElementById("todo-popup");
  const todoInput = document.getElementById("todo-input");
  const tasksList = document.getElementById("tasks");

  // Show main screen if name is stored in local storage
  const storedName = localStorage.getItem("userName");
  if (storedName) {
    showMainScreen(storedName);
  }

  submitNameButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    const userName = nameInput.value.trim();
    if (userName) {
      localStorage.setItem("userName", userName);
      showMainScreen(userName);
    }
  });

  function showMainScreen(userName) {
    initialScreen.style.display = "none";
    mainScreen.style.display = "flex";

    // Set background image based on time of day
    const hours = new Date().getHours();
    let backgroundImage = "";
    let greetingText = "";

    if (hours < 12) {
      backgroundImage =
        'url("https://images.pexels.com/photos/910411/pexels-photo-910411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
      greetingText = `Good morning, ${userName}!`;
    } else if (hours < 18) {
      backgroundImage =
        'url("https://images.pexels.com/photos/913215/pexels-photo-913215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
      greetingText = `Good afternoon, ${userName}!`;
    } else {
      backgroundImage =
        'url("https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")';
      greetingText = `Good evening, ${userName}!`;
    }
    mainScreen.style.backgroundImage = backgroundImage;
    greetingDiv.textContent = greetingText;

    // Function to update the clock (without seconds)
    function updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const currentTime = `${hours}:${minutes}`;
      document.getElementById("clock").textContent = currentTime;
    }

    // Update the clock immediately and then every minute
    updateClock();
    setInterval(updateClock, 60000); // Update every 60 seconds

    // Set inspirational quotes
    const quotes = [
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "Believe you can and you're halfway there.",
      "The only way to do great work is to love what you do.",
    ];
    setInterval(() => {
      quotesDiv.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }, 5000); // Change quote every 5 seconds
  }

  // Toggle todo popup
  showTodoButton.addEventListener("click", () => {
    todoPopup.style.display =
      todoPopup.style.display === "block" ? "none" : "block";
  });

  // Add task with Enter key
  todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const taskText = todoInput.value.trim();
      if (taskText && tasksList.children.length < 5) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            li.classList.add("completed");
          } else {
            li.classList.remove("completed");
          }
        });
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        tasksList.appendChild(li);
        todoInput.value = ""; // Clear input
      }
    }
  });
});
