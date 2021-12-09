import fs from 'fs';

export default class Carrito {

    //Guardar carrito
    async saveShop(order) {
        let data = await fs.promises.readFile('./files/carrito.txt', 'utf-8');
            let carritos = JSON.parse(data);
            let id = carritos[carritos.length-1].id+1;
            let fyh = Date(Date.now());
            let timestamp = fyh.toString();
            let carrito = carritos.find(i => i.id === id)
        try {
            carrito = Object.assign({id:id}, {timestamp:`Added at ${timestamp}`}, order);
            carritos.push(carrito);
            console.log(carrito.id);
            try {
                await fs.promises.writeFile('./files/carrito.txt', JSON.stringify(carritos, null, 2));
                return {status:"success",message:"Carrito guardado."}
            } catch(err) {
                return {status:"Error", message: "No se guardó el carrito."}
            }
        } catch {
            carrito = Object.assign({id:1}, order);
            try {
                await fs.promises.writeFile('./files/carrito.txt', JSON.stringify([dataCarrito], null, 2))
                return {status: "success", message: "Carrito creado con exito."}
            } catch(err) {
                console.log("No se pudo crear el carrito.");
                return {status: "error", message: `No se pudo crear el carrito, ${err}`}
            }
        }
    }

    //Obtener lista de productos de un carrito
    async listProducts(cid) {
        try {
            let carritoData = await fs.promises.readFile('./files/carrito.txt', 'utf-8');
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
            let data = await fs.promises.readFile('./files/carrito.txt', 'utf-8');
            let carritos = JSON.parse(data);
            let newArray = carritos.filter(i => i.id !== id);
            await fs.promises.writeFile('./files/carrito.txt', JSON.stringify(newArray, null, 2));
            return {status: "success", message:"Carrito vacío."}
        } catch(err) {
            return {status: "error", message: "No se puede leer el archivo para vaciar el carrito."}
        }
    }

    //Borrar producto de carrito
    async deleteProduct(cid, pid) {
        try {
            let carritoData = await fs.promises.readFile('./files/carrito.txt', 'utf-8');
            let productosData = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let carritos = JSON.parse(carritoData);
            let productos = JSON.parse(productosData);
            let carrito = carritos.find(i=>i.id==cid);
            let producto = productos.find(i=>i.id==pid);
            let lista = carrito.productos;
            if(lista) {
                let newArray = lista.filter(i => i.id !== producto.id);
                lista = newArray;
                carrito.productos = newArray;
                await fs.promises.writeFile('./files/carrito.txt', JSON.stringify(carritos, null, 2));
                return {status: "success", message:"Producto eliminado."}
            } 
        } catch(err) {
            return {status:"error", message:"No se completó el proceso de compra."}
        }
    }

    //Agregar producto al carrito
    async addProduct(cid, pid) {
        try {
            let carritoData = await fs.promises.readFile('./files/carrito.txt', 'utf-8');
            let productosData = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let carritos = JSON.parse(carritoData);
            let productos = JSON.parse(productosData);
            let carrito = carritos.find(i=>i.id==cid);
            let producto = productos.find(i=>i.id==pid);
            let lista = carrito.productos;
            if(lista) {
                lista.push(producto);
                console.log(lista);
                try {
                    await fs.promises.writeFile('./files/carrito.txt', JSON.stringify(carritos, null, 2));
                    return {status:"success",message:"Carrito actualizado"}
                } catch (err) {
                    return {status:"Error", message: "No hay carrito creado."}
                }
            } 
        } catch(err) {
            return {status:"error", message:"No se completó el proceso de compra."}
        }
    }
}