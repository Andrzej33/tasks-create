const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");



// const contactsRouter = require("./routes/api/contacts");
// const authRouter = require("./routes/api/users");

const tasksRouter = require("./routes/api/tasks")

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

// const DB_URI ='mongodb+srv://Andy:YE4F750DUfI18hoz@cluster0.5mjlhcp.mongodb.net/'

const DB_HOST = 'mongodb+srv://Andy:YE4F750DUfI18hoz@cluster0.5mjlhcp.mongodb.net/tasks?retryWrites=true&w=majority'
// const { DB_HOST } = process.env;



mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message, DB_HOST);
    process.exit(1);
  });

app.listen(3001);


// app.use("/users", authRouter);
app.use("/api/tasks",tasksRouter)
// app.use("/api/contacts", contactsRouter);


app.use(async (req, res) => {
  const { method, url } = req;

  await console.log(method, url);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
