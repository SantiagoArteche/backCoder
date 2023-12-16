import cartRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./users.routes.js";
import mockingRouter from "./mocking.routes.js";
import { Router } from "express";

export const router = Router();

router.use("/api/products", productRouter);
router.use("/api/users", userRouter);
router.use("/api/sessions", sessionRouter);
router.use("/api/carts", cartRouter);
router.use("/api/mockingproducts", mockingRouter);
