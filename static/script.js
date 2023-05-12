const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const chatSubmit = document.getElementById("chat-submit");

chatSubmit.addEventListener("click", function () {
  sendMessage();
});

chatInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    addMessageToLog(message, "sent");
    getResponseFromAPI(message);
    chatInput.value = "";
  }
}

function addMessageToLog(message, type) {
  const chatMessage = document.createElement("div");
  chatMessage.innerText = message;
  chatMessage.classList.add("chat-message", type);
  chatLog.appendChild(chatMessage);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getResponseFromAPI(message) {
  fetch("/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })
    .then((response) => response.json())
    .then((data
