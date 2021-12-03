import express, { Router } from 'express';
import Contenedor from '../classes/ClassContenedor.js';
import { io } from '../server.js';
const contenedor = new Contenedor();
const router = Router();

//GETS
router.get('/', async (req, res) => {
    let productos = await contenedor.getAll();
    res.send(productos);
})

router.get('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.getByID(id).then(result => {
        res.send(result);
    })
})

router.get('/random', async (req, res) => {
    let producto = await contenedor.getRandom();
    res.send(producto);
})

//POSTS
router.post('/', (req, res) => {
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
router.put('/:pid', (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updateById(id,body).then(result => {
        res.send(result);
    })
})

//DELETES
router.delete('/pid', (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.deleteById(id).then(result => {
        res.send(result)
    })
})


export default router;