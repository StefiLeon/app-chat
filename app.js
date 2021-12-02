const express = require('express');
const { Server } = require ('socket.io'); //Para traer solo el Server del socket
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en: ${PORT}`);
})

const io = new Server(server); //creo un nuevo server importado de Socket.io y le paso un servidor QUE YA ESTE ESCUCHANDO
app.use(express.static('public'));

let messages = [];

io.on('connection', socket => { //en mi servidor io, cuando haya una conexion quiero que ejecutes lo siguiente
    console.log('Cliente nuevo conectado');
    socket.emit('log', messages); //Para que le aparezcan todos los msjs al que se conecta despues
    socket.emit('welcome', 'Bienvenido a mi server');
    socket.on('message', data => {
        messages.push(data)
        io.emit('log', messages) //Si creo un evento en el servidor o en el cliente, tengo que programar como recibirlo del otro lado
    })
})