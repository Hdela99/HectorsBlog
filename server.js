const path = require("path");
const express = require("express");
const session = require(`express-session`);
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);
require(`./models`); //makes me run schema.sql repeatedly if i do not include this require.
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secrets: process.env.SECRET,
  cookies: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 20 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  }),
};
app.use(session(sess));

// Create the Handlebars.js engine object with custom helper functions
const hbs = exphbs.create({ helpers });

// Inform Express.js which template engine we're using
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);
app.listen(PORT, () => {
  console.log(`Listening at: ${PORT}!`);
  sequelize.sync({ force: true }).then(() => require(`./seeds`));
});
