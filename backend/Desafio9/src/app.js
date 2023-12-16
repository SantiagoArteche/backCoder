import express from "express";
import mongoose from "mongoose";
import { __dirname } from "./path.js";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.js";
import { router } from "./routes/index.routes.js";
import cors from "cors";
import compression from "express-compression";
import { addLogger } from "./config/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

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
app.use(addLogger);
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser(process.env.SIGNED_COOKIE)); // cookie firmada

//BROTLI
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

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

app.use("/api", express.static(path.join(__dirname, "/public")));

// Routes

app.use("/", router);

app.get("/info", (request, response) => {
  request.logger.info("Info");
  response.send("Hola!");
});
app.get("/error", (request, response) => {
  request.logger.error("Error");
  response.send("Hola!");
});
app.get("/fatal", (request, response) => {
  request.logger.fatal("Fatal");
  response.send("Hola!");
});
app.get("/warning", (request, response) => {
  request.logger.warning("Warning");
  response.send("Hola!");
});
app.get("/debug", (request, response) => {
  request.logger.debug("Debug");
  response.send("Hola!");
});

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentacion del curso Backend",
      description: "API Coder Backend",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
