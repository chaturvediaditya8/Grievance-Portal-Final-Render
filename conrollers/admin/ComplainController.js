const ComplainModel = require("../../models/complain");
const nodeMailer = require("nodemailer");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "djjzy96fu",
  api_key: "248116893734283",
  api_secret: "sX9x4jLJxgMuqx97qKZPwUBWxd4",
});
class ComplainController {
  static ComplainInsert = async (req, res) => {
    try {
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "studentComplain",
      });
      const {
        complaintype,
        semester,
        course,
        rollno,
        user_id,
        complaindetail,
        Status,
        Comment,
      } = req.body;
      const complain = new ComplainModel({
        rollno: rollno,
        user_id: user_id,
        course: course,
        semester: semester,
        complaintype: complaintype,
        complainDetail: complaindetail,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
        Status: Status,
        Comment: Comment,
      });
      await complain.save();
      req.flash("success", "Complaint Register successfully");
      res.redirect("/studentdashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static ComplainDisplaystudent = async (req, res) => {
    try {
      const { name, image, id } = req.studentdata;
      const data = await ComplainModel.find();
      res.render("/studentdashboard", { d: data });
    } catch (error) {
      console.log(error);
    }
  };
  static complainDisplayAdm = async (req, res) => {
    try {
      const { name, image } = req.data;
      const complain = await ComplainModel.find({ Status: "pending" });
      res.render("admin/checkComplain", {
        name: name,
        image: image,
        c: complain,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static approvedComplainADM = async (req, res) => {
    try {
      const { name, image } = req.data;
      const complain = await ComplainModel.find({ Status: "Approved" });
      res.render("admin/approvedComplain", {
        name: name,
        image: image,
        c: complain,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static rejectComplainADM = async (req, res) => {
    try {
      const { name, image } = req.data;
      const complain = await ComplainModel.find({ Status: "Reject" });
      res.render("admin/rejectComplain", {
        name: name,
        image: image,
        c: complain,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static complainDisplayStu = async (req, res) => {
    try {
      const { name, image } = req.studentdata;
      const complain = await ComplainModel.findById(req.params.id);
      res.redirect("/studentdashboard", {
        complain: complain,
        name: name,
        image: image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static ADmUpdateStatus = async (req, res) => {
    try {
      const { Status, Comment } = req.body;
      // const{rollno,email,complaintype} = req.studentdata
      await ComplainModel.findByIdAndUpdate(req.params.id, {
        Comment: Comment,
        Status: Status,
      });
      // this.sendEmail(name,email,Status, Comment);
      req.flash("success", "Status Updated Successfully");
      res.redirect("/admin/checkComplain");
    } catch (error) {
      console.log(error);
    }
  };
  // static sendEmail = async (name, email, Status, Comment) => {
  //   try {
  //     let transporter = await nodeMailer.createTransport({
  //       host: "smtp.gmail.com",
  //       port: 587,

  //       auth:{
  //         user: "adityachaturveditaekwondo@gmail.com",
  //         pass: "vxtcmicuuamvowwp", //2 step verification password
  //       },
  //     });
  //     let info = await transporter.sendMail({
  //       from:"admin@gmail.com",
  //       to: email,
  //       subject:``
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
module.exports = ComplainController;
