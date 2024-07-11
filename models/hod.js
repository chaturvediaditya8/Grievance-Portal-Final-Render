const mongoose = require("mongoose");
const HodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "HOD",
    },
    department: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
    token: { String },
  },
  { timestamps: true }
);
const HodModel = mongoose.model("Hod", HodSchema)
module.exports = HodModel
