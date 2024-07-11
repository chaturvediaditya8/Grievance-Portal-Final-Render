const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
  {
    rollno: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    Fname: {
      type: String,
      required: true,
    },
    Mname: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    education:{
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    }, 
    semester:{
      type: String,
      required:true,
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
    token: {
      type: String,
    },
    status: {
      type: String,
      default:"0"
    },
  },
  { timestamps: true }
);
const StudentModel = mongoose.model("student", StudentSchema);
module.exports = StudentModel;
