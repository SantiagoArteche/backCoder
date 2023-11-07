import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import path from "path";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import cartRouter from "./routes/carts.routes.js";
import productRouter from "./routes/products.routes.js";
import messageRouter from "./routes/messages.routes.js";




const PORT = 8080

const app = express()

mongoose.connect(process.env.MONGO_URL)
.then(async () => { 
    console.log("BDD conectada");
    
}).catch(error => {console.log(error);})

const server = app.listen(PORT, ()=> {
    console.log(`Servidor on PORT ${PORT}`);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))
app.use("/api", express.static(path.join(__dirname, "/public")))




const io = new Server(server)

io.on("connection", async (socket) => {
    console.log("Conectado a socket io");

    socket.on("message", (mes) => {
        console.log(mes);
    })
})


app.use("/api/carts", cartRouter)

app.use("/api/products", productRouter)

app.use("/api/messages", messageRouter)



