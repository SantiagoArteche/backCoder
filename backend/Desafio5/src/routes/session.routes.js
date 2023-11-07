import { Router } from "express";
import { usersModel } from "../models/users.models.js";


const sessionRouter = Router()

sessionRouter.post('/login', async(request, response) => {

    const { email, password } = request.body
    
    try {
        if(request.session.login){
            response.status(200).send({ res: "Login existente"})
        }

        const user = await usersModel.findOne({ email: email })

        if(user){
            if(user.password == password){
                request.session.login = true

                response.cookie("username", user.first_name, { maxAge: 100000, signed: true}) //GENERACION DE COOKIE PARA LUEGO SER PARSEADA EN APP.JS
                response.cookie("rol", user.rol, {maxAge: 100000, signed:true})//GENERACION DE COOKIE PARA LUEGO SER PARSEADA EN APP.JS
                
                response.status(200).send({ res: "OK", mes: user})
            }else{
                response.status(404).send({res: "Contrasena incorrecta", mes: password})
            }

        }else{
            response.status(404).send({ res: "error", mes: "usuario no existe"})
        }
    } catch (error) {
        response.status(404).send({ res: "error", mes: error})
    }
})

sessionRouter.get("/logout", (request, response) => {

    try {
        if(request.session.login == true){
            request.session.destroy()
            response.status(200).send({ res: "error", mes: "usuario deslogeado"})
        }else{
            response.status(404).send({ res: "error", mes: "no hay ningun usuario logeado"})
        }
    } catch (error) {
        console.log(error);
    }
   
})

export default sessionRouter