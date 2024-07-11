
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    reply:{
      type: String,
      default:"pending",
    },
  },
  { timestamps: true }
);
const ContactModel = mongoose.model("feedbacks", ContactSchema);
module.exports = ContactModel;
