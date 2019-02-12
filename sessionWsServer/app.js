const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const homepageRouter = require("./routes/homepage");
const usersRouter = require("./routes/users");
const meRouter = require("./routes/me");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));

app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: "keyboard cat",
    cookie: { maxAge: 60000 }
  })
);

app.use((req, res, next) => {
  if (!req.session.numOfView) {
    req.session.numOfView = 0;
  }
  req.session.numOfView++;
  console.log(`Number of views ${req.session.numOfView}`);
  next();
});

app.use("/", homepageRouter);
app.use("/users", usersRouter);
app.use("/me", meRouter);

module.exports = app;
