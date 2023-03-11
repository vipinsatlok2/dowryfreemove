const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("./src/passport");
const publicModel = require("./src/models/public");

// setup view engin and public folder
app.set("view engine", "ejs");
app.use(express.static("public"));

// use passport
app.use(passport.initialize());

// use middlwares for parse data to json
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

// for all call
app.use(async (req, res, next) => {
  const url = req?._parsedOriginalUrl?.href || "/";

  if (url == "/favicon.ico") return next();
  await publicModel.create({ path: url });

  next();
});

// uses session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "satsahebji",
    resave: false,
    saveUninitialized: true,
  })
);

// database connnetion
require("./src/database");

// uses routes
const auth = require("./src/routes/auth");
const render = require("./src/routes/render");
const posts = require("./src/routes/posts");

// routes uses
app.use("/", render);
app.use("/auth", auth);
app.use("/", posts);

app.get("*", (req, res) => {
  res.render("pages/notFound", { user: {} });
});

module.exports = app;
