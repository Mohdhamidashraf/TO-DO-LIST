// reqire the libray
const mongoose = require("mongoose");

//connect to the database
const url = "mongodb+srv://iammohdhamidashraf:ZYCvPWNtwzAh1UBa@todolist.opgpiby.mongodb.net/TODOList?retryWrites=true&w=majority;";
// 
mongoose.connect(url);

//acquire the connection(check it is connected or not)
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "error connecting to db"));

//up connecting print massage
db.once("open", function () {
  console.log("Sucessfully connected to the database");
});
