/* eslint-disable no-undef */
// alert('Welcome to Chat development');
// eslint-disable-next-line no-unused-vars
// const username = prompt('Welcome to Chat, please enter your username');

const form = document.querySelector('form');
const inputMessage = document.querySelector('input');
const ulMessages = document.querySelector('ul');

// https://sweetalert2.github.io/
Swal.fire({
  title: 'Welcome to Chat',
  input: 'text',
  // inputAttributes: {
  //   autocapitalize: "off"
  // },
  showCancelButton: true,
  confirmButtonText: 'Get in',
  allowOutsideClick: false,
}).then((result) => {
  if (result.isConfirmed) {
    startChat(result.value);
    inputMessage?.focus();
  }
});

function startChat(user) {
  // eslint-disable-next-line no-unused-vars, no-undef
  const socket = io({
    auth: {
      user,
    },
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = inputMessage?.value;
    if (text) {
      socket.emit('message', {
        timestamp: Date.now(),
        user,
        text,
      });
      // inputMessage.value = '';
      form.reset();
    }
  });

  // use socket io to connect to the server
  socket.on('NewUser', (NewUser) => {
    // console.log('New message from '+ NewUser);
    Swal.fire({
      text: 'New user: ' + NewUser,
      toast: true,
      position: 'top-right',
    });
  });
  socket.on('disconnectedUser', (disconnectedUser) => {
    Swal.fire({
      text: disconnectedUser + 'has disconnected',
      toast: true,
      position: 'top-right',
    });
  });
  socket.on('messages', (messages) => {
    ulMessages.innerHTML = '';
    for (const { timestamp, user, text } of messages) {
      const li = document.createElement('li');
      li.innerHTML = `(${new Date(timestamp).toLocaleTimeString()}) ${user}: ${text}`;
      ulMessages?.appendChild(li);
    }
  });
}
