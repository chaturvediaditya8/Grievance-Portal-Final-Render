const express = require("express");
const app = express();
const port = 3700;
const web = require("./routes/web");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");

//Toekn get
app.use(cookieParser());

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());

// imageUpload
const filesUpload = require("express-fileupload");

// temp file uploaders
app.use(filesUpload({ useTempFiles: true }));

// connsect flash and session

const session = require("express-session");
const flash = require("connect-flash");

// message
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// db connection
connectDB();

//EJS Set html css
app.set("view engine", "ejs");
//set public
app.use(express.static("public"));
//route load

app.use("/", web);
//server create
app.listen(port, () => {
  console.log(`Server Start http://localhost:${port}`);
});
