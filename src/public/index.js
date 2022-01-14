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
    .then(
        location.href='/'
    )
}

document.getElementById("thumbnail").onchange = (e) => {
    let read = new FileReader();
    read.onload = e => {
        document.getElementById("preview").src = e.target.result;
    }
    read.readAsDataURL(e.target.files[0]);
}

let input = document.getElementById('info');
input.addEventListener('click', (e) => {
    socket.emit('newMessage', {email:email.value, content:content.value});
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
    let mensajes = data.lista.map (message => {
        return `<div><span>${message.email} dice: "${message.content}"</span></div>`
    }). join(' ');
    p.innerHTML = mensajes;
    div.appendChild(p);
})