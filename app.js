const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
// const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static("public/avatars"));
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
// app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message.includes("E11000 duplicate key")) {
    res.status(409).json({ message: "Email in use" });
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
