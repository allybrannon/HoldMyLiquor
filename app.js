const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const es6Renderer = require("express-es6-template-engine");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new FileStore(),
    secret: "known",
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
  })
);

app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/user", userRouter);

module.exports = app;
