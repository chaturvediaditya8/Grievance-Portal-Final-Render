const StudentModel = require("../../models/student");
const CourseModel = require("../../models/course");
const AdminModel = require("../../models/admin")
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const ComplainModel = require("../../models/complain");
const jwt = require("jsonwebtoken");
const checkStudentAuth = require("../../Middleware/studentauth");
cloudinary.config({
  cloud_name: "djjzy96fu",
  api_key: "248116893734283",
  api_secret: "sX9x4jLJxgMuqx97qKZPwUBWxd4",
});

class StudentController {
  static StudentInsert = async (req, res) => {
    try {
      // console.log(req.files.image);
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "StudentImages,",
      });
      const {
        rollno,
        name,
        Fname,
        Mname,
        dob,
        gender,
        email,
        mobile,
        category,
        semester,
        education,
        course,
        address,
        password,
      } = req.body;
      console.log(req.body);
      const hashPassword = await bcrypt.hash(password, 10);
      const result = new StudentModel({
        rollno: rollno,
        name: name,
        Fname: Fname,
        Mname: Mname,
        dob: dob,
        gender: gender,
        email: email,
        mobile: mobile,
        category: category,
        semester: semester,
        education: education,
        course: course,
        address: address,
        password: hashPassword,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      const data = await result.save();
      console.log(data);
      res.redirect("/admin/StudentDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static StudentDisplay = async (req, res) => {
    try {
      const { name, image } = req.data;
      const data = await StudentModel.find();
      const course = await CourseModel.find();
      res.render("admin/student/display", {
        course: course,
        d: data,
        name: name,
        image: image,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static StudentView = async (req, res) => {
    try {
      const { name, image } = req.data;
      const data = await StudentModel.findById(req.params.id);
      res.render("admin/Student/view", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static StudentEdit = async (req, res) => {
    try {
      const { name, image } = req.data;
      const data = await StudentModel.findById(req.params.id);
      res.render("admin/student/edit", { d: data, name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };
  static StudentDelete = async (req, res) => {
    try {
      await StudentModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Student data deleted successfully.");
      res.redirect("/admin/StudentDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static StudentUpdate = async (req, res) => {
    try {
      const { id } = req.data;
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "StudentImages,",
      });
      const {
        rollno,
        name,
        Fname,
        Mname,
        dob,
        gender,
        email,
        mobile,
        category,
        semester,
        education,
        course,
        address,
        password,
      } = req.body;
      const Update = await StudentModel.findByIdAndUpdate(req.params.id, {
        rollno: rollno,
        name: name,
        Fname: Fname,
        Mname: Mname,
        dob: dob,
        gender: gender,
        email: email,
        mobile: mobile,
        category: category,
        semester: semester,
        education: education,
        course: course,
        address: address,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
        user_id: id,
      });
      req.flash("success", "Student data updated successfully.");
      res.redirect("/admin/StudentDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static StudentLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const student = await StudentModel.findOne({ email: email });
        if (student != null) {
          const isMatch = await bcrypt.compare(password, student.password);
          if (isMatch) {
            const token = jwt.sign({ ID: student._id }, "Aditya@1234");
            res.cookie("token", token);
            res.redirect("/studentdashboard");
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
  static logout = async (req, res) => {
    try {
      req.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  static StudentDashboard = async (req, res) => {
    try {
      const { name, email, image, id } = req.studentdata;
      const data = await StudentModel.findById(id);
      const complain = await ComplainModel.find({user_id:id});
      res.render("admin/student/StudentDashboard", {
        d: data,
        c: complain,
        name: name,
        email: email,
        image: image,
        msg: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static updateProfile = async (req, res) => {
    try {
      const { id } = req.studentdata;
      const { name, email } = req.body;
      if (req.files) {
        const student = await StudentModel.findById(id);
        const imageID = student.image.public_id;
        //deleting image
        await cloudinary.uploader.destroy(imageID);
        //new image
        const imagefile = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          { folder: "StudentImages" }
        );
        var studentdata = {
          name: name,
          email: email,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        };
      } else {
        var studentdata = {
          name: name,
          email: email,
        };
      }
      await StudentModel.findByIdAndUpdate(id, studentdata);
      req.flash("success", "Update Profile successfully");
      res.redirect("/studentdashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static changePassword = async (req, res) => {
    try {
      const { id } = req.studentdata;
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const student = await StudentModel.findById(id);
        const isMatch = await bcrypt.compare(op, student.password);
        if (!isMatch) {
          req.flash("error", "Current Password is incorrect");
          res.redirect("admin/student/StudentDashboard");
        } else {
          if (np != cp) {
            req.flash("error", "password does not match");
            res.redirect("admin/student/StudentDashboard");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await StudentModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "password updated successfully");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "Please fill all the fields");
        res.redirect("/studentdashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static studentForgotPass = async(req,res)=>{
    try {
      
    } catch (error) {
      console.log(error)
    }
  };
}
module.exports = StudentController;
