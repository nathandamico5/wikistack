// do not modify this file
const router = require("express").Router();

// don't forget that these are already mounted on /api!
router.use("/wiki", require("./wiki"));
router.use("/users", require("./users"));

module.exports = router;
