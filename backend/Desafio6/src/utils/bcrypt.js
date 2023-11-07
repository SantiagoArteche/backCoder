import "dotenv/config"
import bcrypt from "bcrypt"

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)))  

// const pass = createHash("hola")

export const validatePass = (passwordSend, passwordDB) => bcrypt.compareSync(passwordSend, passwordDB)

// console.log(validatePass("hola", pass));
