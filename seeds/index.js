const seqConnect = require(`../config/connection.js`);

const { User, Post, Comment } = require("../models");

const users = [
  {
    username: "Clark",
    email: "Superman123@gmail.com",
    password: "NotSuperman01",
  },
  {
    username: "Hal",
    email: "DarkestDays123@gmail.com",
    password: "GreenLantern03",
  },
  {
    username: "Bruce",
    email: "ImBatman123@gmail.com",
    password: "ImBatman01",
  },
];

const posts = [
  {
    post_title: "Not Superman",
    content: "Clark Kent is not superman. Quit asking.",
    user_id: 1,
  },
  {
    post_title: "I am green lantern",
    content: "Yes I am THE green lantern. Only one of me of course.",
    user_id: 2,
  },
  {
    post_title: "I'm Batman",
    content:
      "Even if I was not Batman. I would still be a billionaire playboy philanthropist.",
    user_id: 3,
  },
];

const comments = [
  {
    content: "I knew it. Seeing as I am the greatest detective in the world!",
    user_id: 3,
    post_id: 2,
  },
  {
    content: "He is totally not supes. I know the man personally.",
    user_id: 2,
    post_id: 1,
  },
];

const plantSeeds = async () => {
  await User.bulkCreate(users, { individualHooks: true });
  await Post.bulkCreate(posts);
  await Comment.bulkCreate(comments);
};

plantSeeds();
