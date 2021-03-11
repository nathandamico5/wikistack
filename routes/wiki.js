const router = require("express").Router();
const { addPage, wikiPage, main } = require("../views");
const { Page } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
