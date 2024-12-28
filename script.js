const chatBot = document.getElementById("chat-bot");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// TODO: Recuperation des messages dans le localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(({sender, message}) => displayMessage(sender, message));
    
};
// TODO: Sauvegarder des messages dans le localStorage
function saveMessage(sender, message) {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push(({sender, message}));
    localStorage.setItem("chatMessages", JSON.stringify(messages));
};

//TODO: Afficher un message dans le chat
function displayMessage(sender, message){
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `${sender}: ${message}`;
    messageDiv.className = sender.toLowerCase();
    chatBot.appendChild(messageDiv);
    chatBot.scrollTop = chatBot.scrollHeight;

};

//TODO : Obtenir une reponse du chatbot
function getBotResponse(userMessage){
    const responses = {
        "hello": "Hello, how can I help you today?",
        "how are you": "I am fine, and you?",
        "good": "That's great to hear, how can I help you today?",
        "nothing thank you": "Okay, have a great day!",
        "goodbye": "Goodbye, see you soon!",
    };
    return responses[userMessage.toLowerCase()] || "I am sorry, I do not understand your message.";
};

//TODO : Gérer l'envoi du message de l'utilisateur
function clickUserMessage(){
    const userMessage = userInput.value.trim();
    if(!userMessage) return;
    displayMessage("You", userMessage);
    saveMessage("You", userMessage);
    const botResponse = getBotResponse(userMessage);
    setTimeout(() => {
        displayMessage("ChatBot", botResponse);
        saveMessage("ChatBot", botResponse);
    }, 500);

    userInput.value = "";
};

loadMessages();

sendBtn.addEventListener("click", clickUserMessage);
userInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") clickUserMessage();
});

