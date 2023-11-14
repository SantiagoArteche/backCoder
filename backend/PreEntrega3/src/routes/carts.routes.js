import { Router } from "express";
import {
  addProductToCart,
  changeProductQuantity,
  clearCart,
  createCart,
  deleteCartProduct,
  getCart,
  getCartById,
  changeCartQuantity,
} from "../controllers/carts.controller.js";
import { buy } from "../controllers/tickets.controllers.js";

const cartRouter = Router();

cartRouter.get("/", getCart);

cartRouter.get("/:cid", getCartById);

cartRouter.post("/", createCart);

cartRouter.post("/:cid/products/:pid", addProductToCart);

cartRouter.delete("/:cid/products/:pid", deleteCartProduct);

cartRouter.put("/:cid", changeCartQuantity);

cartRouter.delete("/:cid", clearCart);

cartRouter.put("/:cid/products/:pid", changeProductQuantity);

cartRouter.post("/:cid/purchase", buy);

export default cartRouter;
