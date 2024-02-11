const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

const serverURL = `https://it3049c-chat.fly.dev/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;


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
       ` ;
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
        updateMessages();
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
        sendButton.addEventListener("click", function(sendButtonClickEvent) {
            sendButtonClickEvent.preventDefault();
            const sender = nameInput.value;
            const message = myMessage.value;

            sendMessages(sender, message);
            myMessage.value = "";
        });
