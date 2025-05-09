const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user-message');
        userInput.value = '';

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                const data = await response.json();
                addMessage(data.botMessage, 'bot-message');
            } else {
                addMessage('Error: Unable to get a response from the server.', 'bot-message');
            }
        } catch (error) {
            console.error('Network error:', error);
            addMessage('Error: Unable to connect to the server.', 'bot-message');
        }
    }
});

function addMessage(text, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${className}`;
    messageElement.textContent = text;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}