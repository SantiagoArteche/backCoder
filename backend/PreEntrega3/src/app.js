import express from "express";
import mongoose from "mongoose";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import { usersModel } from "./models/users.models.js";
import passport from "passport";
import initializePassport from "./config/passport.js";
import { router } from "./routes/index.routes.js";
import cors from "cors";

const whiteList = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado"));
    }
  },
};
const PORT = 8080;

const app = express();

app.use(cors(corsOptions));
// BDD
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BD conectada");
  })
  .catch((error) => console.log(error));

const server = app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGNED_COOKIE)); // cookie firmada

// Almacenar session en la base de datos
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
// middleware de autorizacion para usar la app como administrador

app.use("/api/sessions", express.static(path.join(__dirname, "/public")));

// SERVER IO
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("Conectado a socket IO");

  socket.on("nuevoUsuario", async (newUser) => {
    const user = await usersModel.create(newUser);

    socket.emit("usuarioRegistrado", user);
  });
});

// Routes

app.use("/", router);
