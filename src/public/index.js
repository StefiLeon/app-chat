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
enviar.addEventListener('click', (e) => {
    socket.emit('message', {email:email.value, message:message.value})
    console.log(`Llego todo ${email.value} ${message.value}`);
})

socket.on('messageCenter', data => {
    let div = document.getElementById('messageCenter');
    if(div.firstChild) {
        div.removeChild(div.firstChild)
    }
    let p = document.createElement('p');
    let chat = data.map(message => {
        return `<div>${message.email} dice: "${message.message}"</div>`
    }). join(' ');
    p.innerHTML = chat;
    div.appendChild(p);
    console.log(chat);
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
    // .then(result => {
    //     location.href='/' //redireccion al form
    // })
}

document.getElementById("thumbnail").onchange = (e) => {
    let read = new FileReader();
    read.onload = e => {
        document.getElementById("preview").src = e.target.result;
    }
    read.readAsDataURL(e.target.files[0]);
}