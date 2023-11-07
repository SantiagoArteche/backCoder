import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productRouter = Router()

productRouter.get("/", async (request, response) => {

    const { limit } = request.query

    try {
        const products = await productModel.find().limit(limit)
        
        response.status(200).send({ res: "OK", message: products })

    } catch (error) {
        response.status(404).send({ res: "Error producto no encontrado", message: error})
    }
})

productRouter.get("/:pid", async (request, response) => {

    const { pid } = request.params

    try {
        const products = await productModel.findById(pid)
        
        products ?  response.status(200).send({ res: "OK", message: products }) : response.status(404).send({ res: "Error", message: "Producto no encontrado"})

    } catch (error) {
        response.status(404).send({ res: "Error producto no encontrado", message: error})
    }
    
})

productRouter.post("/", async (request, response) => {


    const { title, description, price, thumbnail, code, stock } = request.body;
    
    try {
        
        const createProduct = await productModel.create({ title, description, price, thumbnail, code, stock })

        response.status(200).send({ res: "OK", message: createProduct})
        
    } catch (error) {
        response.status(404).send({ res: "Error creando el producto", message: error})
    }
    
})

productRouter.put("/:pid", async (request, response) => {

    const { pid } = request.params
    
    const { title, description, price, thumbnail, code, stock } = request.body;

    try {
        const product = await productModel.findByIdAndUpdate(pid, { title, description, price, thumbnail, code, stock })

        product ? response.status(200).send({ res: "OK", message: "Producto actualizado" }) : response.status(404).send({ res: "Error actualizando el producto", message: "Product not found"})
        
    } catch (error) {
        response.status(404).send({ res: "Error", message: error})
    }
    
})

productRouter.delete("/:pid", async (request, response) => {

    const { pid } = request.params

    try{
        const product = await productModel.findByIdAndDelete(pid)

        product ? response.status(200).send({ res: "OK", message: "Producto borrado" }) : response.status(404).send({ res: "Error borrando el producto", message: "Product not found"})
        
    }catch(error){
        response.status(404).send({ res: "Error borrando el producto", message: error})
    }
})

export default productRouter