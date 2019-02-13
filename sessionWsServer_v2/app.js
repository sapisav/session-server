const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const uuid = require("uuid/v4");
const homepageRouter = require("./routes/homepage");
const usersRouter = require("./routes/users");
const meRouter = require("./routes/me");

const app = express();
// const expressWs = require("express-ws")(app);

// app.ws("/echo", function(ws, req) {
//   ws.on("message", function(msg) {
//     ws.send(`>> ${msg}`);
//   });
// });

// General purpose mws
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));

// session mgmt mw
app.use(
  session({
    genid: req => {
      if (req.session) {
        console.log("session found");
      }
      console.log(`Generating session ID for req.sessionID ${req.sessionID}`);
      return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore({
      path: "../sessions"
    }),
    saveUninitialized: false,
    resave: true,
    cookie: { sameSite: true },
    secret: "secret_top_cat"
  })
);

// views count mw
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
