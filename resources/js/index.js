const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const saveNameButton = document.getElementById("save-name-button");
const modifyNameButton = document.getElementById("modify-name-button");

const serverURL = `https://it3049c-chat.fly.dev/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;

function isNameSaved() {
    return localStorage.getItem("savedName") !== null;
}


function updateInputAndButtonState() {
    const savedName = isNameSaved();
    myMessage.disabled = !savedName;
    sendButton.disabled = !savedName;
}


saveNameButton.addEventListener("click", function () {
    const enteredName = nameInput.value.trim();

    if (enteredName !== "") {
        localStorage.setItem("savedName", enteredName);
        updateInputAndButtonState();
    }
});

modifyNameButton.addEventListener("click", function () {
    const newUsername = prompt("Enter your new username:");

    if (newUsername !== null && newUsername.trim() !== "") {
        localStorage.setItem("savedName", newUsername.trim());
        updateInputAndButtonState();
    }
});


updateInputAndButtonState();


sendButton.addEventListener("click", function () {
    const sender = localStorage.getItem("savedName");
    const message = myMessage.value.trim();

    if (sender && message !== "") {
        sendMessages(sender, message);
        myMessage.value = "";
    }
});


async function fetchMessages() {
    const response = await fetch(serverURL);
    return response.json();
}

function formatMessage(message, myNameInput) {
    const time = new Date(message.timestamp);
    const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

    if (myNameInput === message.sender) {
        return `
        <div class="mine messages">
            <div class="message">
                ${message.text}
            </div>
            <div class="sender-info">
                ${formattedTime}
            </div>
        </div>
       `;
    } else {
        return `
            <div class="yours messages">
                <div class="message">
                    ${message.text}
                </div>
                <div class="sender-info">
                    ${message.sender} ${formattedTime}
                </div>
            </div>
        `;
    }
}


async function updateMessages() {
    const messages = await fetchMessages();
    let formattedMessages = "";
    messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;
}


setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);


function sendMessages(username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date().toISOString()
    };

    fetch(serverURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Message sent successfully:', data);
        updateMessages();
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
}
