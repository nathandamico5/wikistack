const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");
const random = require("random-words");

const Page = db.define("page", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM("open", "closed"), defaultValue: "closed" },
});

Page.beforeValidate((instance) => {
  if (instance.title) {
    instance.slug = instance.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  } else {
    instance.slug = random({ exactly: 2, join: "-" });
  }
});

const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = {
  db,
  Page,
  User,
};
