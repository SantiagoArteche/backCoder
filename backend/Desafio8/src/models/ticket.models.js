import { Schema, model } from "mongoose";
class Code {
  constructor() {
    this.cod = Code.uniqueCode();
  }
  static uniqueCode() {
    if (this.code) {
      this.code++;
    } else {
      this.code = 1;
    }
    return this.code;
  }
}
const codigo = new Code();

const ticketSchema = new Schema(
  {
    code: { type: String, default: codigo.cod },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purcharser: { type: String, required: true },
  },
  { versionKey: false }
);

export const ticketModel = model("ticket", ticketSchema);
