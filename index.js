const express = require("express");
const path = require("path");
const mongoose = require("./config/mongoose");
const ToDo = require("./models/todo");
const port = 8000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("./assets"));

app.get("/", function (req, res) {
  ToDo.find({}, function (err, todo) {
    if (err) {
      console.log("Error to fatching the todos from DB ");
      return;
    }
    console.log("todo list", todo);
    return res.render("home", {
      title: "My To Do List",
      todo_list: todo,
    });
  });
});
app.post("/create-to-do", function (req, res) {
  ToDo.create({
    description: req.body.description,
    category: req.body.category,
    date: req.body.date,
  });
  res.redirect("back");
});
app.post("/delete-to-do", function (req, res) {
  let idArr = [req.body.todo];
  ToDo.deleteMany({ _id: idArr[0] }, function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", todos);
    }
  });
  res.redirect("back");
});
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
  }
  console.log(`Your server is running on port ${port}`);
});
