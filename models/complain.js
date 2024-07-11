const mongoose = require("mongoose");
const ComplainSchema = new mongoose.Schema(
  {
    complaintype: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    user_id:{
      type: String,
      required: "complaint",
    },
    course: {
      type: String,
      required: true,
    },
    rollno: {
      type: String,
      required: true,
    },
    complainDetail: {
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
    Status:{
      type: String,
      default:"pending",
    },
    Comment:{
      type:String,
      default:"pending",
    }
  },
  { timestamps:true }
);

const ComplainModel = mongoose.model("complain", ComplainSchema);
module.exports = ComplainModel;
