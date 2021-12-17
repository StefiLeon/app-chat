import { Router } from 'express';
import Contenedor from '../classes/ClassContenedor.js';
import { io } from '../server.js';
import { authMiddleware } from '../services/auth.js';
import Productos from '../services/Contenedor.js';
const contenedor = new Contenedor();
const router = Router();
const productosServices = new Productos();

//GETS
//Obtener todos los productos
router.get('/', async (req, res) => {
    productosServices.getProducts().then(result => {
        res.send(result);
    })
})

//Obtener producto por id
router.get('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    productosServices.getProductByID(id).then(result => {
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
    productosServices.saveProduct(producto).then(result => {
        res.send(result);
        if(result.status==="success") {
            productosServices.getProducts().then(result => {
                io.emit('updateProducts', result);
                console.log(producto.id)
            })
        }
    })
})

//PUTS
//Actualizar producto por id
router.put('/:pid', authMiddleware, (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.pid);
    if(authMiddleware) {
        productosServices.updateById(id,body).then(result => {
        res.send(result);
        })
    } else {
        res.send({error:-1, descripcion:"ruta /:pid del metodo delete no autorizada"})
    }
})

//DELETES
//Borrar producto por id
router.delete('/:pid', authMiddleware, (req, res) => {
    let id = parseInt(req.params.pid);
    if (authMiddleware) {
    productosServices.deleteById(id).then(result => {
        res.send(result)
        }
    )} else {
        res.send({error:-1, message:"ruta /:pid del metodo delete no autorizada"})
    }
})


export default router;