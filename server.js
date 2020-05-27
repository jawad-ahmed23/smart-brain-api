//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");

//controllers
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

app.use(bodyParser.json());

app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "jawad@2442",
    database: "smart-brain",
  },
});

//endpoints
app.get("/", (req, res) => {
  res.json(database.users);
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

//Port
app.listen(process.env.PORT || 8080, () => {
  console.log(`app is runing on ${process.env.PORT}`);
});
