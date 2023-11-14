import { Router } from "express";

const mockingRouter = Router();

mockingRouter.get("/", (request, response) => {
  try {
    const array = [];
    for (let i = 1; i <= 100; i++) {
      const products = {
        title: "title",
        description: 2,
        price: 3,
        thumbnail: [],
        code: 1,
        stock: 22,
        category: "random",
      };
      array.push(products);
    }

    response.status(200).send(array);
  } catch (error) {
    response.status(400).send(error);
  }
});

export default mockingRouter;
