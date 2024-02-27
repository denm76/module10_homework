//Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.Добавить в чат механизм отправки гео-локации,При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.
const wsUri = "wss://echo-ws-service.herokuapp.com";

const sendBtn = document.querySelector(".send-btn");
const geoBtn = document.querySelector(".geo-btn");
const chatInput = document.querySelector(".chat__input");
const chatMessaging = document.querySelector(".chat__messaging");

let websocket;

function writeToScreen(message, firstClass, secondClass) {
  if(message === ""){
    return;
  }
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.classList.add(firstClass, secondClass);
  pre.innerHTML = message;
  chatMessaging.appendChild(pre);
}

sendBtn.addEventListener('click', () => {
  let chatInputMessage = chatInput.value;
  websocket = new WebSocket(wsUri);

  websocket.onopen = function (evt) {
    websocket.send(chatInputMessage);
    writeToScreen(chatInputMessage, "chat__message", "rightSideMessage");
  };
  websocket.onmessage = function (evt) {
    writeToScreen(evt.data, "chat__message", "leftSideMessage");
  };
  websocket.onerror = function (evt) {
    writeToScreen("ERROR!" + evt.data, "chat__message", "rightSideMessage");
  };
})

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  let geolocationData = `<a href = "https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target = "_blank">Гео-локация</a>`;
  writeToScreen(geolocationData, "chat__message", "rightSideMessage");
}

const error = () => {
  writeToScreen("Ошибка!", "chat__message", "rightSideMessage")
}

geoBtn.addEventListener('click', () => {
  let chatInputMessage = chatInput.value;
  websocket = new WebSocket(wsUri);

  websocket.onopen = function (evt) {
    websocket.send(chatInputMessage);
    if (!navigator.geolocation) {
      writeToScreen("Ошибка геолокации!", "chat__message", "rightSideMessage");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  websocket.onerror = function (evt) {
    writeToScreen("ERROR!" + evt.data, "chat__message", "rightSideMessage");
  };
})
