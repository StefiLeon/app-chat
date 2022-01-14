import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://StefiLeon:Laion160191@ecommerce.uxagm.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default class ChatContainer {
    constructor(collection, schema, timestamps) {
        this.collection = mongoose.model(collection, new mongoose.Schema(schema,timestamps))
    }

    addChat = async(object) => {
        try {
            let result = await this.collection.create(object);
            return {status:"success", message: `Mensaje agregado con exito.`, payload: result}
        } catch(err) {
            return {status: "error", message: "No se pudo agregar la informacion" + " "+ err}
        }
    }

    getAllChats = async() => {
        try {
            let messages = await this.collection.find();
            return {status: "success", lista: messages}
        } catch(err) {
            return {status: "error", error: `no se pudo obtener la informacion por ${err}`}
        }
    }
}