const socket = io();

const chat = document.querySelector('#chat-window');
const output = document.querySelector('#output');
const userName = document.querySelector('#name');
const message = document.querySelector('#message');
const form = document.querySelector('#form');
const feedback = document.querySelector('#feedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let name;
  userName.value.trim() !== '' ? (name = userName.value) : 'Anonymous User';
  if (message.value.trim() !== '') {
    socket.emit('message', {
      id: socket.id,
      message: message.value,
      name,
    });
  }
  message.value = '';
  message.focus();
});

socket.on('message', (data) => {
  // console.log(data);
  let pos;
  data.id === socket.id ? (pos = 'right') : '';

  output.innerHTML += ` <div class="chat-box ${pos}">
            <p class="chat-name">${data.name}</p>
            <p class="chat-message">
              ${data.message}
            </p>
          </div>`;
  feedback.innerHTML = '';
  chat.scrollTop = chat.scrollHeight;
});

message.addEventListener('keypress', () => {
  socket.emit('typing', userName.value);
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p>${data} skriver...</p>`;
});
