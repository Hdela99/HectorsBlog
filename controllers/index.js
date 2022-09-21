const router = require("express").Router();

const apiRoutes = require("./api/");
const homeRoutes = require("./homeRoutes.js");
const dashBoardRoutes = require("./dashBoardRoutes.js");

router.use("/", homeRoutes);
router.use("/dashboard", dashBoardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
