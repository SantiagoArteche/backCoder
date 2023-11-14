import { usersModel } from "../models/users.models.js";

export const getUsers = async (request, response) => {
  try {
    const users = await usersModel.find();
    response.status(200).send({ res: "OK", mes: users });
  } catch (error) {
    response.status(404).send({ res: "ERROR", mes: error });
  }
};

export const createUser = async (request, response) => {
  const { first_name, last_name, password, age, email } = request.body;

  try {
    const userCreate = await usersModel.create({
      first_name,
      last_name,
      password,
      age,
      email,
    });

    response.status(200).send({ res: "OK", mes: userCreate });
  } catch (error) {
    response.status(404).send({ res: "ERROR", mes: error });
  }
};
