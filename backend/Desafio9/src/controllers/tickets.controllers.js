import { cartsModel } from "../models/carts.models.js";
import { ticketModel } from "../models/ticket.models.js";

export const buy = async (request, response) => {
  const cartId = request.params.cid;

  try {
    const cart = await cartsModel.findById(cartId).populate(".products");
    if (!cart) {
      return res.status(404).send({ message: "Carrito no encontrado" });
    }
    const productsUnprocessed = [];
    cart.products.forEach(async (el) => {
      const product = el;
      const requestQuantity = el.quantity;

      if (product.quantity >= requestQuantity) {
        product.quantity -= requestQuantity;
        await product.save();
      } else {
        productsUnprocessed.push(product.id_prod);
      }
    });

    cart.products = cart.products.filter((item) => {
      !productsUnprocessed.includes(item.id_prod);
    });
    await cart.save();

    const ticket = new ticketModel({
      amount: cart.products.reduce(
        (acum, el) => acum + el.quantity * el.precio,
        0
      ),
      purcharser: cart.userEmail,
      purchase_datetime,
    }); //SUPUESTO, YA QUE NO LO VIMOS EN CLASE
    await ticket.save();

    return response.status(200).send({
      mes: "Compra finalizada exitosamente",
      productsUnprocessed: productsUnprocessed,
    });
  } catch (error) {
    return response.status(500).send({ error: error });
  }
};
