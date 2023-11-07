import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        reqiured: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: "user"
    }
}, {versionKey: false})

userSchema.plugin(mongoosePaginate)

export const usersModel = model("users", userSchema)