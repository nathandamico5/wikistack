const express = require("express");
const app = express();
const morgan = require("morgan");
const views = require("./views/index.js");
const { db, User, Page } = require("./models");
const routes = require("./routes/index.js");

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

const connect = async () => {
  await db.sync(); //will sync model to the database instance we created with seq
  // await db.sync({ force: true });

  app.listen(3000, () => {
    console.log("I am listening at http://localhost:3000");
  });
};

connect();
