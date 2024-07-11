const HodModel = require("../../models/hod");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StudentModel = require("../../models/student");
const ComplainModel = require("../../models/complain");
const ContactModel = require("../../models/contact");

cloudinary.config({
  cloud_name: "djjzy96fu",
  api_key: "248116893734283",
  api_secret: "sX9x4jLJxgMuqx97qKZPwUBWxd4",
});

class HodController {
  static Dashboard = async (req, res) => {
    try {
//       const { name, image } = req.hoddata;
      //const student = await StudentModel.countDocuments();
     // const course = await CourseModel.countDocuments();
      const pending = await ComplainModel.countDocuments({ Status: "pending" });
      const Approved = await ComplainModel.countDocuments({
        Status: "Approved",
      });
      const Reject = await ComplainModel.countDocuments({ Status: "Reject" });
     // const feedback = await ContactModel.countDocuments();
      res.render("admin/hod/dashboard", {
        p: pending,
        a: Approved,
        r: Reject,
        
      });
    } catch (error) {
      console.log(error);
    }
  };
  static HodInsert = async(req,res)=>{
               try {
                              
               } catch (error) {
                      console.log(error)        
               }
  }
}
module.exports = HodController;
