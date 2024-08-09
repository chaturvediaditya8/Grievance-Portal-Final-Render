const mongoose = require("mongoose");
const Local_URL = "mongodb://localhost:27017/JiwajiPortal";
// const Live_URL = "mongodb+srv://chaturvediaditya8:Program1ngAP1@ap1express.1qq4hie.mongodb.net/JiwajiPortal1?retryWrites=true&w=majority&appName=JiwajiPortal"
const connectDB = () => {
  return mongoose
    .connect(Local_URL)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectDB