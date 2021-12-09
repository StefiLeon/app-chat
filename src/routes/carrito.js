import { Router } from "express";
import Carrito from "../classes/ClassCarrito.js";
const carrito = new Carrito();
const router = Router();

//GETS
//Obtener productos de un carrito
router.get('/:cid/productos', async (req, res) => {
    let id = parseInt(req.params.cid);
    let lista = await carrito.listProducts(id);
    res.send(lista);
})

//POSTS
//Crear carrito
router.post('/', (req, res) => {
    let order = req.body;
    carrito.saveShop(order).then(result => {
        res.send(result);
    })
})

//Incorporar productos al carrito por id
router.post('/:cid/:pid', (req, res) => {
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    carrito.addProduct(cid, pid).then(result => {
        res.send(result);
    })
})

//DELETES
//Borrar carrito por id
router.delete('/:cid', (req, res) => {
    let id = parseInt(req.params.cid);
    carrito.deleteShopById(id).then(result => {
        res.send(result);
    })
})

//Borrar producto de un carrito por id de ambos
router.delete('/:cid/productos/:pid', (req, res) => {
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    carrito.deleteProduct(cid, pid).then(result => {
        res.send(result);
    })
})
export default router;