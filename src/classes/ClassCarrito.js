import fs from 'fs';
import __dirname from '../utils.js';

const carritoURL = __dirname+'/files/carrito.txt';
const productosURL = __dirname+'/files/productos.txt';

export default class Carrito {

    //Guardar carrito
    async saveShop(order) {
        let dataCarrito = await fs.promises.readFile(carritoURL, 'utf-8');
        let carritos = JSON.parse(dataCarrito);
        let cid = carritos[carritos.length-1].id+1;
        let fyh = Date(Date.now());
        let timestamp = fyh.toString();
        let carrito = carritos.find(i => i.id === cid)
        if(order.id && order.nombre && order.codigo && order.price && order.thumbnail && order.stock && order.descripcion) {
                try {
                carrito = Object.assign({id:cid}, {timestamp:`Added at ${timestamp}`}, {productos:[order]});
                carritos.push(carrito);
                console.log(carrito.id);
                try {
                    await fs.promises.writeFile(carritoURL, JSON.stringify(carritos, null, 2));
                    return {status:"success",message:"Carrito guardado."}
                } catch(err) {
                    return {status:"Error", message: "No se guardó el carrito."}
                }
            } catch {
                carrito = Object.assign({id:1}, {productos:[order]});
                try {
                    await fs.promises.writeFile(carritoURL, JSON.stringify([dataCarrito], null, 2))
                    return {status: "success", message: "Carrito creado con exito."}
                } catch(err) {
                    console.log("No se pudo crear el carrito.");
                    return {status: "error", message: `No se pudo crear el carrito, ${err}`}
                }
            }
        } else if(order.id===undefined) {
            try {
                carrito = Object.assign({id:cid}, {timestamp:`Added at ${timestamp}`}, {productos:[order]});
                carritos.push(carrito);
                console.log(carrito.id);
                try {
                    await fs.promises.writeFile(carritoURL, JSON.stringify(carritos, null, 2));
                    return {status:"success",message:"Carrito guardado."}
                } catch(err) {
                    return {status:"Error", message: `No se pudo crear el carrito, ${err}`}
                }
            } catch (err){
                return {status:"Error", message: `No se pudo crear el carrito, ${err}`}
            }
        } else {
            return {status: "error", message: `No se pudo crear el carrito por body incorrecto.`}
        }
    }

    //Obtener lista de productos de un carrito
    async listProducts(cid) {
        try {
            let carritoData = await fs.promises.readFile(carritoURL, 'utf-8');
            let carritos = JSON.parse(carritoData);
            let carrito = carritos.find(i=>i.id==cid);
            let lista = carrito.productos;
            if(lista) {
                return {status: "success", lista: lista}
            } else {
                console.log("Carrito no encontrado");
                return {status:"error", message:"Carrito no encontrado"}
            }
        } catch (err) {
            return {status:"error", message:"No se completó la lectura."}
        }
    }

    //Vaciar carrito
    async deleteShopById(id) {
        try {
            let dataCarrito = await fs.promises.readFile(carritoURL, 'utf-8');
            let carritos = JSON.parse(dataCarrito);
            let newArray = carritos.filter(i => i.id !== id);
            await fs.promises.writeFile(carritoURL, JSON.stringify(newArray, null, 2));
            return {status: "success", message:"Carrito vacío."}
        } catch(err) {
            return {status: "error", message: "No se puede leer el archivo para vaciar el carrito."}
        }
    }

    //Borrar producto de carrito
    async deleteProduct(cid, pid) {
        try {
            let carritoData = await fs.promises.readFile(carritoURL, 'utf-8');
            let productosData = await fs.promises.readFile(productosURL, 'utf-8');
            let carritos = JSON.parse(carritoData);
            let productos = JSON.parse(productosData);
            let carrito = carritos.find(i=>i.id==cid);
            let producto = productos.find(i=>i.id==pid);
            let lista = carrito.productos;
            if(lista) {
                let newArray = lista.filter(i => i.id !== producto.id);
                lista = newArray;
                carrito.productos = newArray;
                await fs.promises.writeFile(carritoURL, JSON.stringify(carritos, null, 2));
                return {status: "success", message:"Producto eliminado."}
            } 
        } catch(err) {
            return {status:"error", message:"No se completó el proceso de compra."}
        }
    }

    //Agregar producto al carrito
    async addProduct(cid, pid) {
        try {
            let carritoData = await fs.promises.readFile(carritoURL, 'utf-8');
            let productosData = await fs.promises.readFile(productosURL, 'utf-8');
            let carritos = JSON.parse(carritoData);
            let productos = JSON.parse(productosData);
            let carrito = carritos.find(i=>i.id==cid);
            let producto = productos.find(i=>i.id==pid);
            let fyh = Date(Date.now());
            let timestamp = fyh.toString();
            if(carrito) {
                let lista = carrito.productos;
                if(!lista.some(producto => producto.id !== pid)) { //Comprobacion de producto duplicado
                    lista.push(producto);
                    console.log(lista);
                    try {
                        await fs.promises.writeFile(carritoURL, JSON.stringify(carritos, null, 2));
                        return {status:"success", message:"Carrito actualizado", carrito: carrito}
                    } catch (err) {
                        return {status:"Error", message: "No hay carrito creado."}
                    }
                } else {
                    return {status: "Error", message: "Producto duplicado"}
                } 
            } else { //Logica de carrito nuevo
                try {
                    let newCarrito = Object.assign({id:cid}, {timestamp:`Added at ${timestamp}`}, {productos:[producto]});
                    carritos.push(newCarrito);
                    console.log(newCarrito.id);
                    try {
                        await fs.promises.writeFile(carritoURL, JSON.stringify(carritos, null, 2));
                        return {status:"success",message:"Carrito guardado."}
                    } catch(err) {
                        return {status:"Error", message: "No se guardó el carrito1."}
                    }
            } catch(err) {
                return {status:"Error", message: `No se guardó el carrito2 ${err}`}
            }
        }
    } catch(err){
        return {status:"Error", message: `No se guardo el carrito ${err}`}
    }
}}