import Schema from 'mongoose';
import ChatContainer from "../classes/ClassChat.js";

export default class ChatMongo extends ChatContainer {
    constructor() {
        super('messages', 
            {
                email: {
                    type: String,
                    required: true
                },
                name: {
                    type: String
                },
                content: {
                    type: String,
                    required: true
                }
            }, {timestamps: true}
        )
    }
}