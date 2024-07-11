const AdminModel = require("../../models/admin");
const CourseModel = require("../../models/course");
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
class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, image } = req.data;
      const student = await StudentModel.countDocuments();
      const course = await CourseModel.countDocuments();
      const pending = await ComplainModel.countDocuments({ Status: "pending" });
      const Approved = await ComplainModel.countDocuments({
        Status: "Approved",
      });
      const Reject = await ComplainModel.countDocuments({ Status: "Reject" });
      const feedback = await ContactModel.countDocuments()
      res.render("admin/dashboard", {
        name: name,
        image: image,
        s: student,
        c: course,
        p: pending,
        a: Approved,
        r: Reject,
        f:feedback,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("admin/register");
    } catch (error) {
      console.log(error);
    }
  };

  static AdminInsert = async (req, res) => {
    try {
      const file = req.files.image;
      // imageUpload
      const imageUploaded = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "Admininage",
        }
      );
      const { name, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const result = new AdminModel({
        name: name,
        email: email,
        password: hashPassword,
        image: {
          public_id: imageUploaded.public_id,
          url: imageUploaded.secure_url,
        },
      });
      const data = await result.save();
      console.log(data);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static verifyLogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email });
        if (admin != null) {
          const isMatch = await bcrypt.compare(password, admin.password);
          if (isMatch) {
            const token = jwt.sign({ ID: admin._id }, "Aditya@1234");
            res.cookie("token", token);
            // console.log(token)
            res.redirect("/admin/dashboard");
            // console.log(data)
          } else {
            res.redirect("/");
          }
        } else {
          res.redirect("/");
        }
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("admin/profile", { name: name, image: image, email: email });
    } catch (error) {
      console.log(error);
    }
  };
  static insertUser = async (req, res) => {
    try {
      const { name, image } = req.data;
      const course = await CourseModel.find();
      res.render("admin/insertuser", {
        name: name,
        course: course,
        image: image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static updateProfileAdm = async (req, res) => {
    try {
      const { id } = req.data;
      const { name, email } = req.body;
      if (req.files) {
        const admin = await AdminModel.findById(id);
        const imageID = admin.image.public_id;
        // console.log(imageID)
        await cloudinary.uploader.destroy(imageID);
        //new image
        const imagefile = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          { folder: "Admininage" }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await AdminModel.findByIdAndUpdate(id, data);
      req.flash("success", "update Profile Successfully.");
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  static upAdmPass = async (req, res) => {
    try {
      const { id } = req.data;
      const { op, np, cp } = req.body;
      // console.log(req.body)
      if (op && np && cp) {
        const admin = await AdminModel.findById(id);
        const isMatch = await bcrypt.compare(op, admin.password);
        if (!isMatch) {
          req.flash("error", "Current password is Incorrect");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "Password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await AdminModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("Success", "Password Updated successfully.");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "Please fill all the fields.");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.render("./home");
    } catch (error) {
      console.log(error);
    }
  };
  static Feedback = async (req, res) => {
    try {
      const { name, image } = req.data;
      const feedback = await ContactModel.find();
      res.render("admin/feedback", { name: name, image: image, f: feedback });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = AdminController;
