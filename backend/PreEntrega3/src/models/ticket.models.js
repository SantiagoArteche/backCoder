import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    code: { type: String, required: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purcharser: { type: String, required: true },
  },
  { versionKey: false }
);

export const ticketModel = model("ticket", ticketSchema);
