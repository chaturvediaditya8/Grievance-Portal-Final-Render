const jwt = require("jsonwebtoken");
const HodModel = require("../models/hod");

const checkHodAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    req.flash("error", "unauthorised user please login");
    res.redirect("/");
  } else {
    const verifyLogin = jwt.verify(token, "Aditya@1234");
    //console.log(verifyLogin)
    const data = await HodModelModel.findOne({ _id: verifyLogin.ID });
    // console.log(data)
    req.hoddata = data;

    next()
  }
};
module.exports = checkHodAuth
