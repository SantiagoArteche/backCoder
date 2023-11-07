import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  /*    
  1er paramatero objeto asociado al token 
        
  2do genero la clave privada para el cifrado
        
  3ro tiempo de expiracion
        */
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  return token;
};

generateToken({
  _id: "6518eb6bd946901567c6d170",
  first_name: "Santiago",
  last_name: "",
  age: "18",
  email: "santiarteche@hotmail.com",
  password: "$2b$15$aH6WICh9Z1u2kbiNBA7H1Oxq8vs3WurvjAITEeyy/wDDpe.9CTc4K",
  rol: "user",
});

export const authToken = (request, response, next) => {
  const authHeader = request.headers.Authorization;

  if (!authHeader) {
    return response.status(401).send({ error: "Usuario no autenticado" });
  }

  const token =
    authHeader.split(" ")[1]; /*obtengo el token y descarto el bearer */

  jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
    if (error) {
      return response
        .status(403)
        .send({ error: "Usuario no autorizado, token invalido" });
    }
  });

  request.user = credential.user;
  next();
};
