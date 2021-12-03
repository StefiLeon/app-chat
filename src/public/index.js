const socket = io();

//Form
document.addEventListener('submit', sendForm);

function sendForm(e) {    
    e.preventDefault();
    let form = document.getElementById('prodForm');
    let data = new FormData(form);
    fetch('/api/productos', {
        method:'POST',
        body:data
    }).then(result => {
        return result.json();
    }).then(result => {
        location.href='/' //redireccion al form
    })
}

document.getElementById("thumbnail").onchange = (e) => {
    let read = new FileReader();
    read.onload = e => {
        document.getElementById("preview").src = e.target.result;
    }
    read.readAsDataURL(e.target.files[0]);
}

//Socket
socket.on('welcome', data => {
    console.log(data);
})