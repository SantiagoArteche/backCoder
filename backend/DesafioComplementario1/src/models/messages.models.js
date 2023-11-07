import { Schema, model } from "mongoose";

const messagesSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    postTime: {
        type: Date,
        default: Date.now
    }

}, {versionKey: false})

export const messageModel = model("messages", messagesSchema)