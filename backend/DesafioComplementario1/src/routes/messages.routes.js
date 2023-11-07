import { Router } from "express";
import { messageModel } from "../models/messages.models.js";

const messagesRouter = Router()

messagesRouter.get('/', async (request, response) => {

    const { limit } = request.query

    try {
        const message = await messageModel.find().limit(limit);

        response.status(200).send({respuesta: 'OK', menssage: message})

    } catch (error){

        response.status(400).send({respuesta: 'Error', message: error})

    }
})

messagesRouter.post('/', async (request, response) => {

    const { email, message } = request.body

    try {

        const respuesta = await messageModel.create({ email, message })

        response.status(200).send({respuesta: 'OK message send', message: respuesta})

    } catch (error){

        response.status(400).send({respuesta: 'Error sending message', message: error})
    }
})

export default messagesRouter