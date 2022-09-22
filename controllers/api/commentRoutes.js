const router = require("express").Router();
const { Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

//GET all comments
router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "content", "user_id", "post_id", "date_created"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    order: [["date_created", "DESC"]],
  })
    .then((dbCommentData) => {
      const comments = dbCommentData.map((comment) =>
        comment.get({ plain: true })
      );
      res.render("single-post", { comments, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST/CREATE
router.post("/", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    Comment.create({
      content: req.body.content,
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
