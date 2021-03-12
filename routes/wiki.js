const router = require("express").Router();
const { addPage, wikiPage, main } = require("../views");
const { Page, User } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const [author, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    // const author = await User.findOne({
    //   where: { name: reg.body.name },
    // });
    // if (!author) {
    //   author = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //   });
    // }
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });

    await page.setAuthor(author.id);

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

    // const author = await User.findOne({
    //   where: { id: page.authorId },
    // });
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
