import { Router } from 'express';
import Contenedor from '../classes/ClassContenedor.js';
import { io } from '../server.js';
import { authMiddleware } from '../services/auth.js';
const contenedor = new Contenedor();
const router = Router();

//GETS
//Obtener todos los productos
router.get('/', async (req, res) => {
    let productos = await contenedor.getAll();
    res.send(productos);
})

//Obtener producto por id
router.get('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.getByID(id).then(result => {
        res.send(result);
    })
})

//POSTS
//Agregar producto
router.post('/', authMiddleware, (req, res) => {
    let file = req.file;
    let producto = req.body;
    console.log(producto);
    producto.thumbnail = `${req.protocol}://${req.hostname}:8080/images/${file.filename}`;
    contenedor.save(producto).then(result => {
        res.send(result);
        if(result.status==="success") {
            contenedor.getAll().then(result => {
                io.emit('updateProducts', result);
            })
        }
    })
})

//PUTS
//Actualizar producto por id
router.put('/:pid', authMiddleware, (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updateById(id,body).then(result => {
        res.send(result);
    })
})

//DELETES
//Borrar producto por id
router.delete('/:pid', authMiddleware, (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.deleteById(id).then(result => {
        res.send(result)
    })
})


export default router;