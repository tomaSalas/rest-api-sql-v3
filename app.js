'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./models').sequelize; // import Sequelize
const userRoutes = require("./routes/userRoutes");
const courseRoute = require("./routes/courseRoute");
const intro = require("./routes/intro");
const User = require("./models").User;
const Course = require("./models").Course;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//middleware
app.use(express.json())

// Add routes.
app.use("/", intro);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoute);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const users = await User.findAll();
    console.log(users); 
    const courses = await Course.findAll();
    console.log(courses);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Sequelize model synchronization, then start listening on our port.
sequelize.sync() // force db to delete data
  .then( () => {
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  });