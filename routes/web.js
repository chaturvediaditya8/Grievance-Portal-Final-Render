const express = require('express')
const route = express.Router()
const FrontController = require('../conrollers/FrontController')
const AdminController = require('../conrollers/admin/AdminController')
const CourseController = require('../conrollers/admin/CourseController')
const StudentController = require('../conrollers/admin/StudentController')
const ComplainController = require('../conrollers/admin/ComplainController')
const checkAdminAuth = require('../Middleware/adimauth')
const checkStudentAuth = require('../Middleware/studentauth')
const HodController = require('../conrollers/admin/HodController')
const checkHodAuth = require('../Middleware/hodauth')




// FrontController
route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/grievance',FrontController.grievance)
route.get('/feature', FrontController.feature)
route.get('/benefit',FrontController.benefit)
route.get('/help',FrontController.help)
route.post('/insertFeedback',FrontController.insertFeedback)

//AdminPart
route.get('/admin/dashboard',checkAdminAuth, AdminController.dashboard)
route.get('/admin/register',AdminController.register)
route.post('/AdminInsert', AdminController.AdminInsert)
route.post('/admin/verifyLogin',AdminController.verifyLogin)
route.get('/profile',checkAdminAuth, AdminController.profile)
route.get('/admin/insertuser',checkAdminAuth,AdminController.insertUser)
route.post('/updateProfile',checkAdminAuth,AdminController.updateProfileAdm)
route.post("/changePassword",checkAdminAuth,AdminController.upAdmPass)
route.get('/logout',AdminController.logout)
route.get("/admin/feedback",checkAdminAuth,AdminController.Feedback)


// ADmin Complain
route.get("/admin/checkComplain",checkAdminAuth,ComplainController.complainDisplayAdm)
route.get("/admin/approvedComplain", checkAdminAuth,ComplainController.approvedComplainADM)
route.get("/admin/rejectComplain",checkAdminAuth,ComplainController.rejectComplainADM)
route.post("/admin/update_Status/:id",checkAdminAuth,ComplainController.ADmUpdateStatus)


// Course Insert by Admin
route.post("/admin/courseInsert",checkAdminAuth,CourseController.courseInsert)
route.get("/admin/courseDisplay",checkAdminAuth, CourseController.courseDisplay)
route.get("/admin/course/view/:id",checkAdminAuth,CourseController.courseView)
route.get("/admin/course/edit/:id",checkAdminAuth,CourseController.courseEdit)
route.get("/admin/course/Delete/:id",checkAdminAuth,CourseController.courseDelete)
route.post("/admin/courseUpdate/:id",checkAdminAuth,CourseController.courseUpdate)

//admin Course Display
route.get('/admin/course/display', CourseController.courseDisplay)


//Student Insert
route.post('/StudentInsert',checkAdminAuth,StudentController.StudentInsert)
route.get('/admin/StudentDisplay',checkAdminAuth,StudentController.StudentDisplay)
route.get('/admin/Student/view/:id',checkAdminAuth,StudentController.StudentView)
route.get('/admin/Student/Edit/:id',checkAdminAuth,StudentController.StudentEdit)
route.get('/admin/Student/Delete/:id',checkAdminAuth,StudentController.StudentDelete)
route.post('/admin/StudentUpdate/:id',checkAdminAuth,StudentController.StudentUpdate)
route.post('/student/VerifyLogin', StudentController.StudentLogin)
route.get('/logout', StudentController.logout)

// Student complain part
route.get('/studentdashboard',checkStudentAuth, StudentController.StudentDashboard)
route.post('/studentdashboard/updateprofile',checkStudentAuth,StudentController.updateProfile)
route.post('/studentdashboard/changepassword',checkStudentAuth,StudentController.changePassword)
route.post('/complain',ComplainController.ComplainInsert)
route.get('/complaindisplay',checkStudentAuth,StudentController.StudentDashboard)


// HodController
// route.get('/hod/dashboard',HodController.Dashboard)




module.exports= route