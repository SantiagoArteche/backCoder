import { generateToken } from "../utils/jwt.js";

export const currentSession = (request, response) => {
  response.send(request.user);
};
export const github = async (request, response) => {
  response.status(200).send({ mes: "Usuario registrado" });
};
export const githubCallback = async (request, response) => {
  request.session.user = request.user;
  response.status(200).send({ mes: "Usuario logeado" });
};
export const register = async (request, response) => {
  try {
    if (!request.user) {
      return response.status(400).send({ mes: "Usuario ya existente" });
    }

    response.status(200).send({ mes: "Usuario registrado" });
  } catch (error) {
    response.status(500).send({ mes: `Error al registrar usuario ${error}` });
  }
};

export const login = async (request, response) => {
  try {
    if (!request.user) {
      return response.status(401).send({ mes: "Usuario invalido" });
    }

    request.session.user = {
      first_name: request.user.first_name,
      last_name: request.user.last_name,
      age: request.user.age,
      email: request.user.email,
    };

    const token = generateToken(request.user);
    response.cookie("jwtCookie", token, {
      maxAge: 43200000,
    });

    response.status(200).send({ payload: request.user });
  } catch (error) {
    response.status(500).send({ mes: `Error al iniciar sesion ${error}` });
  }
};

export const testJWT = (request, response) => {
  console.log(request);
  response.send(request.user);
};

export const logout = (request, response) => {
  if (request.session.login) {
    request.session.destroy();
  }
  response.clearCookie("jwtCookie");
  response.redirect("/api/sessions/login", 200, {
    res: "usuario deslogeado",
  });
};
