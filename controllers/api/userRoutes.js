const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET /api/users
// select all users from the user table in the database and send it back as JSON when client makes GET request to /api/users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET
//returns one user
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "post_title", "content", "date_created"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "date_created"],
        include: {
          model: Post,
          attributes: ["post_title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        // if user with nonexistent id is searched, return error 404 with message.
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});

// POST carries request parameter in req.body

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that username" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      // if match returns false value, sned back error message to client
      res.status(400).json({ message: "Incorrect password!" });
      // exit out of function immediately
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      // if match returns true value, ignore conditional statement and send back data with message
      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

// allow user to logout
// destroy session variables and reset the cookie
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
