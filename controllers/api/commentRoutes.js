const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

//GET/READ
router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "content", "user_id", "post_id", "date_created"],
    order: [["date_created", "DESC"]],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST/CREATE
router.post("/", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    Comment.create({
      commentary: req.body.commentary,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// DELETE/DESTROY
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
