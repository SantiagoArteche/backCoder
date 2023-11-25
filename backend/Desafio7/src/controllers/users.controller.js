import { usersModel } from "../models/users.models.js";
import { generateUserErrorInfo } from "../services/errors/messages/userCreationError.message.js";
import CustomError from "../services/errors/middlewares/CustomError.js";
import EErrors from "../services/errors/middlewares/errorsEnum.js";

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
    if (!first_name || !last_name || !password || !age || !email) {
      CustomError.createError({
        name: "User creation error",
        cause: generateUserErrorInfo({
          first_name,
          last_name,
          password,
          age,
          email,
        }),
        message: "Error trying to create a user",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const userCreate = await usersModel.create({
      first_name,
      last_name,
      password,
      age,
      email,
    });

    response.status(200).send({ res: "OK", mes: userCreate });
  } catch (error) {
    console.error(error);
    response.status(404).send({ error: error.code, mes: error.message });
  }
};
