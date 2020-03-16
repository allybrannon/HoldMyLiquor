const express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  es6Renderer = require("express-es6-template-engine"),
  session = require("express-session"),
  FileStore = require("session-file-store")(session);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
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
const favoriteRouter = require("./routes/favorite");
const aboutRouter = require("./routes/about");

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/favorite", favoriteRouter);
app.use("/about", aboutRouter);
app.use(function(req, res) {
  res.status(404).render("template", {
    locals: {
      title: "BROKEN",
      sessionData: req.session
    },
    partials: {
      partial: "partial-page404"
    }
  });
});

module.exports = app;
