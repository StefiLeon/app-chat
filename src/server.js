//IMPORTS
import express from 'express';
import cors from 'cors';
import productosRouter from './routes/productos.js';
import upload from './services/uploader.js';
import Contenedor from './classes/ClassContenedor.js';
let contenedor = new Contenedor();

//EXPRESS
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`);
})
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.static('public'));
app.use(upload.single('thumbnail'));

//ROUTER
app.use('/api/productos', productosRouter);

//ENGINE
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send(`<h1 style="color:green;font-family:Georgia, serif">Bienvenidos al servidor express de Stefi</h1>`);
})

app.get('/views/productos', (req, res) => {
    contenedor.getAll().then(result => {
        let info = result.lista;
        let prepObj = {
            productos: info
        }
        res.render('productos', prepObj)
    })
})