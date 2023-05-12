const url = 'wss://echo-ws-service.herokuapp.com';
const btnOpen = document.querySelector('.open__connection');
const btnSend = document.querySelector('.btn2');
const btnGeo = document.querySelector('.btn1');
let websocket;

function sendMessage(){
    let userMessage = document.querySelector('.chat-input').value;
    websocket.send(userMessage);
    let msgContainer = document.querySelector('.chat__main-outcomingMessages');
    const message = `<div class="outcomingMessages__item">${userMessage}</div>`;
    msgContainer.innerHTML += message;
}

function printIncommingMessage(serverMessage){
    let msgContainer = document.querySelector('.chat__main-outcomingMessages');
    const message = `<div class="incomingMessages__item">${serverMessage}</div>`;
    msgContainer.innerHTML += message;
}

function sendGeoData(){
    navigator.geolocation.getCurrentPosition((position) => {
        const {coords} = position;
        geoData = `https://www.openstreetmap.org/#map=4/${coords.latitude}/${coords.longitude}`;
        let msgContainer = document.querySelector('.chat__main-outcomingMessages');
        msgContainer.innerHTML += `<a class="outcomingMessages__item" target="#blank" href = ${geoData}> Гео-локация </a>`;
        websocket.send(geoData);
      });
}

btnOpen.addEventListener('click', ()=>{
    document.querySelector('.container').style ='display: block';
    websocket = new WebSocket(url);
    websocket.onmessage = function(event){
        printIncommingMessage(event.data)
    }
});

btnSend.addEventListener('click', sendMessage);
btnGeo.addEventListener('click', sendGeoData);

/* так и не понял как сделать так чтобы сообщение, которое отправляет сервер не выводилось */