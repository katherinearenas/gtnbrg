const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log('Now listening'));
});
