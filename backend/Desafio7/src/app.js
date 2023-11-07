import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import "dotenv/config";
import path from "path";
import cookieParser, { JSONCookies } from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { productModel } from "./models/products.models.js";
import { usersModel } from "./models/users.models.js";
import passport from "passport";
import initializePassport from "./config/passport.js";
import { router } from "./routes/index.routes.js";

const PORT = 8080;

const app = express();

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

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
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

const products = await productModel.find().lean();

// VISTA PRODUCTS
app.get("/api/sessions/products", (request, response) => {
  // Parseo de cookies para mostrar nombre de usuario en vista productos
  let cookieName;
  let cookieRol;
  try {
    if (
      JSONCookies(request.signedCookies) !== null &&
      JSONCookies(request.signedCookies) !== undefined
    ) {
      cookieName = JSONCookies(request.signedCookies.username);
      cookieRol = JSONCookies(request.signedCookies.rol);
      console.log(cookieRol);
      console.log(cookieName);
    }
  } catch (error) {
    console.log(error);
  }

  response.status(200).render("productsList", {
    getProducts: products,
    cookieName: cookieName,
    cookieRol: cookieRol,
  });
});

// VISTA LOGIN
app.get("/api/sessions/login", (request, response) => {
  response.status(200).render("login");
});

// VISTA REGISTRARSE
app.get("/api/sessions/registrarse", (request, response) => {
  response.status(200).render("registrarse");
});
