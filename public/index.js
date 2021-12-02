//TENGO QUE INSTANCIAR EL IO PARA QUE LO ENCUENTRE
//Simulacion de cliente
const socket = io();

let input = document.getElementById('info');
input.addEventListener('click', (e) => {
    socket.emit('message', {user:user.value, message:message.value});
})

socket.on('welcome', data => {
    console.log(data);
})

socket.on('log', data => { //ver lo que escribo en el input en tiempo real
    let div = document.getElementById('log');
    if(div.firstChild) {
        div.removeChild(div.firstChild)
    }
    let p = document.createElement('p');
    let mensajes = data.map( message => {
        return `<div><span>${message.user} dice: "${message.message}"</span></div>`
    }). join(' ');
    p.innerHTML = mensajes;
    div.appendChild(p);
})