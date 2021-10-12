var SocketIOFileUpload = require('socketio-file-upload');
var io = require('socket.io-client');

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Heroku server url
const socket = io.connect({
  transports: ['websocket'],
  upgrade: false,
});

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  //TODO 2
});

//TODO 3

//TODO 4

// Output message to DOM
function outputMessage(message, obj) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span> ${message.time}</span>`;
  div.appendChild(p);
  div.appendChild(obj);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = './index.html';
  }
});

//file upload
var uploader = new SocketIOFileUpload(socket);
uploader.listenOnInput(document.getElementById("plain_input_element"));

// client side
uploader.addEventListener("start", function (event) {
  event.file.meta.roomName = roomName.textContent;
  event.file.meta.username = username;
});

const recordButton = document.querySelector('#record');
const stopButton = document.querySelector('#stop');

recordButton.addEventListener('click', async () => {
  recordButton.style.display = 'none';
  stopButton.style.display = 'block';

  var constraints = { audio: true };
  navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    var mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.onstart = function (e) {
      this.chunks = [];
    };
    mediaRecorder.ondataavailable = function (e) {
      this.chunks.push(e.data);
    };
    mediaRecorder.onstop = function (e) {
      var blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
      socket.emit('voiceMessage', { username, room, blob });
    };

    // Start recording
    mediaRecorder.start();

    //Stop recording after 5 seconds and broadcast it to server
    setTimeout(function () {
      mediaRecorder.stop();
      recordButton.style.display = 'block';
      stopButton.style.display = 'none';
    }, 5000);
  });
});