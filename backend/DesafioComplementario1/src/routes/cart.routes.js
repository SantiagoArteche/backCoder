import { Router } from "express";
import { cartsModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import res from "express/lib/response.js";


const cartRouter = Router()

cartRouter.get("/", async (request, response) => {

    try {
        const cart = await cartsModel.find()

        response.status(200).send({ res: "OK", message: cart})
    } catch (error) {

        response.status(404).send({ res: "Error cart not found", message: error})
    }

})

cartRouter.get("/:cid", async (request, response) =>{

    const { cid } = request.params

    try {
        const cartId = await cartsModel.findById(cid)

        response.status(200).send({ res: "OK", message: cartId})
    } catch (error) {

        response.status(404).send({ res: "Error cart not found", message: error})
    }
})

cartRouter.post("/", async (request, response) => {

    try {

        const cart = await cartsModel.create()

        response.status(200).send({ res: "OK", message: cart})

    } catch (error) {
        response.status(404).send({ res: "Error creando el carrito", message: error})
    }
})

cartRouter.post("/:cid/products/:pid", async (request, response) => {

    const { cid , pid } = request.params
    const { quantity } = request.body

    try {
        const cart = await cartsModel.findById(cid)
        
        if(cart){
            const product = await productModel.findById(pid)
            if(product){

                const index = cart.products.findIndex(prod => prod.id_prod === pid)
                
                if(indice != -1){
                    cart.products[index].quantity = quantity
                }else{
                    cart.products.push({id_prod: pid, quantity: quantity})
                }

                const resp = await cartsModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({ res:"OK", message: resp})
                
            }else{
                
                response.status(404).send({ res: "Error en agregar producto al carrito", message: "Producto no encontrado"})
            }
        }else{
            response.status(404).send({ res: "Error en agregar producto al carrito", message: "Carrito no encontrado"})
        }
    } catch (error) {
        response.status(404).send({ res: "Error en agregar producto al carrito", message: error})
    }
})


export default cartRouter