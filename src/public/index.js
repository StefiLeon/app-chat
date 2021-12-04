const socket = io();

//Eventos de socket

socket.on('updateProducts', data => {
    let productos = data.lista;
    fetch('templates/productsTable.handlebars').then(string => string.text()).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const templateObject = {
            productos:productos
        }
        const html = processedTemplate(templateObject);
        let tabla = document.getElementById('productsTable');
        tabla.innerHTML = html;
    })
})

let enviar = document.getElementById('sendMessage');
let email = document.getElementById('email');
let mensaje = document.getElementById('message')
enviar.addEventListener('click', (e) => {
    socket.emit('messageCenter', {email:email.value, message:mensaje.value})
})

const time = new Date;
socket.on('messagelog', data => {
    let div = document.getElementById('messageCenter')
    let p = document.getElementById('log');
    let chat = data.map(message => {
        return `<div><span style="color:blue"><b>${message.email}</b></span> <span style="color:brown"> ${time.toDateString()} ${time.toTimeString()}</span> "<span style="color:green"><i>${message.message}</i></span>"</div>`
    }).join('')
    p.innerHTML = chat;
    div.appendChild(p);
})

//Form
document.addEventListener('submit', sendForm);
fetch('./templates/productsTable.handlebars');
function sendForm(e) {    
    e.preventDefault();
    let form = document.getElementById('prodForm');
    let data = new FormData(form);
    fetch('/api/productos', {
        method:'POST',
        body:data
    }).then(result => {
        return result.json();
    })
}

document.getElementById("thumbnail").onchange = (e) => {
    let read = new FileReader();
    read.onload = e => {
        document.getElementById("preview").src = e.target.result;
    }
    read.readAsDataURL(e.target.files[0]);
}