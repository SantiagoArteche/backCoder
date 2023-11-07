import { Router } from "express";

const userRouter = Router()

userRouter.get("/", async (request, response) => {
    
    try {
        const users = await usersModel.find()
        response.status(200).send({ res: "OK", mes: users})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

userRouter.post("/", async (request, response) => {

    const { first_name, last_name, password, age, email } = request.body
    
    try {
        const userCreate = await usersModel.create({ first_name, last_name, password, age, email})
       
        response.status(200).send({ res: "OK", mes: userCreate})
    } catch (error) {
        response.status(404).send({ res: "ERROR", mes: error})
    }
})

export default userRouter