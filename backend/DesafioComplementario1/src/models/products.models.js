import { Schema, model } from "mongoose";

const productSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: []
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    }
}, {versionKey: false}
)

export const productModel = model("products", productSchema)