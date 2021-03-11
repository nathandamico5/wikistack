const router = require("express").Router();
const { addPage } = require("../views");
const { Page } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res, next) => {
  res.send("get /wiki working");
});

// router.post("/", (req, res, next) => {
//   res.json(req.body);
//   //res.send("post /wiki working");
// });

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
