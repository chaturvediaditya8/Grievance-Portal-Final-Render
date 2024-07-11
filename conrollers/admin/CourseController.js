const CourseModel = require("../../models/course");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "djjzy96fu",
  api_key: "248116893734283",
  api_secret: "sX9x4jLJxgMuqx97qKZPwUBWxd4",
});
class CourseController {
  static courseInsert = async (req, res) => {
    try {
      const { name, email } = req.body;
      const result = new CourseModel({
        name: name,
        email: email,
        
      });
      await result.save();
      res.redirect("/admin/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static courseDisplay = async (req, res) => {
    try {
      const { name, image } = req.data;
      const data = await CourseModel.find();
      res.render("admin/course/display", {
        d: data,
        name: name,
        image: image,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static courseView = async (req, res) => {
    try {
      const { name, image } = req.data;
      const data = await CourseModel.findById(req.params.id);
      res.render("admin/course/view", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static courseEdit = async (req, res) => {
    try {
      const { name, image } = req.data;
      const data = await CourseModel.findById(req.params.id);
      res.render("admin/course/edit", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static courseDelete = async (req, res) => {
    try {
      await CourseModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Course Delete Successfully");
      res.redirect("/admin/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static courseUpdate = async (req, res) => {
    try {
      const { id } = req.data;
      const { name, email } = req.body;
      const update = await CourseModel.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email,
        user_id: id,
      });
      req.flash("success", "Course update Successfully");
      res.redirect("admin/course/display");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = CourseController;
