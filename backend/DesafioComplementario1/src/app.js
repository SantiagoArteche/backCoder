import express from "express"
import cartRouter from "./routes/cart.routes.js"
import productRouter from "./routes/products.routes.js"
import messagesRouter from "./routes/messages.routes.js"
import mongoose from "mongoose"
import path from "path"
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
import { Server } from "socket.io"


const PORT = 8080

const app = express()

mongoose.connect("mongodb+srv://SantiArteche:EpjiAvhPp0BgL5Hi@cluster0.zn2mcct.mongodb.net/?retryWrites=true&w=majority").then(console.log("DB connected"))

const server = app.listen(PORT, () => {
    console.log(`Server on PORT ${PORT}`);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))
app.use("/api", express.static(path.join(__dirname, "/public")))


const io = new Server(server)

io.on('connection', async (socket) => {
    
    console.log("Conectado a Socket Io")

    socket.on("nuevoMensaje", async (info) => {
        await messageModel.create({ email: info.email, message: info.message})
        socket.emit("messages", info)
    })
})




app.use("/api/carts", cartRouter)

app.use("/api/products", productRouter)

app.use("/api/messages", messagesRouter)

app.get("/api/chatmessage", (request, response) => {
    response.status(200).render("chat")
})


