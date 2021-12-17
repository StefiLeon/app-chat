import database from "../config.js";

export default class Productos {
    constructor() {
        database.schema.hasTable('ecommerce').then(result => {
            if(!result) {
                database.schema.createTable('ecommerce', table => {
                    table.increments();
                    table.string('nombre').notNullable();
                    table.string('descripcion').notNullable();
                    table.integer('codigo').notNullable();
                    table.integer('price').notNullable().defaultTo(0);
                    table.integer('stock').notNullable().defaultTo(1);
                    table.string('thumbnail').notNullable;
                    table.timestamps(true, true);
                }).then(result => {
                    console.log("Products table created.")
                })
            }
        })
    }
    getProducts = async() => {
        try {
        let productos = await database.table('ecommerce').select();
        return {status:"success", lista:productos}
        } catch (err) {
            return {status:"Error", message: err}
        }
    }
    getProductByID = async(id) => {
        try {
            let producto = await database.table('ecommerce').select().where('id', id).first();
            if(producto) {
                return {status:"Success", producto: producto}
            } else {
                return {status:"Error", message: "Producto no encontrado."}
            }
        } catch(err) {
            return {status:"Error", message: err}
        }
    }
    saveProduct = async (producto) => {
        try {
            let exists = await database.table('ecommerce').select().where('codigo', producto.codigo).first();
            if (exists) return {status:"Error", message: "Ya existe un producto con ese codigo."}
            let result = await database.table('ecommerce').insert(producto);
            return {status:"Success", producto: `Producto registrado con id ${result[0]}`}
        } catch(err) {
            return {status:"Error", message: err}
        }
    }
    deleteById = async(id) => {
        try {
            let result = await database.table('ecommerce').del().where('id', id);
            return {status:"Success", message: result}
        } catch(err) {
            return {status:"Error", message: err}
        }
    }
    updateById = async(id, body) => {
        try {
            let result = await database.table('ecommerce').where('id', id).update(body);
            return {status: "Success", message: result}
        } catch(err) {
            return {status:"Error", message: err}
        }
    }
}