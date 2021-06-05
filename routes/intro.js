const express = require("express");
// Construct a router instance.
const router = express.Router();

// setup a friendly greeting for the root route
router.get('/', (req, res) => {
  
    res.json({
      message: 'Welcome to the REST API project!',
    });
  });

  module.exports = router;