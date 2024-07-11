const ContactModel = require("../models/contact");
class FrontController {
  static home = async (req, res) => {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      res.render("about");
    } catch (error) {
      console.log(error);
    }
  };
  static feature = async (req, res) => {
    try {
      res.render("feature");
    } catch (error) {
      console.log(error);
    }
  };
  static benefit = async (req, res) => {
    try {
      res.render("benefit");
    } catch (error) {
      console.log(error);
    }
  };
  static help = async (req, res) => {
    try {
      res.render("help");
    } catch (error) {
      console.log(error);
    }
  };
  static grievance = async (req, res) => {
    try {
      res.render("grievance");
    } catch (error) {
      console.log(error);
    }
  };
  // Feedback
static insertFeedback = async(req,res)=>{
  try {
    // console.log(req.body)
    const{name, mail, phone, add, mesg}= req.body
    const result = new ContactModel({
      name:name,
      email:mail,
      phone:phone,
      address:add,
      message: mesg,
    })
    await result.save()
    res.redirect('help')
  } catch (error) {
    console.log(error)
  }
}
}
module.exports = FrontController;
