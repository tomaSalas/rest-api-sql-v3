const express = require("express");
// Construct a router instance.
const router = express.Router();
const Course = require('../models').Course;
const User = require('../models').User;
const { asyncHandler } = require("../middleware/async-handler");

// get all courses afor the user requested
router.get("/",  asyncHandler(async (req, res) => {
    
    const courses = await Course.findAll({ 
        include: [{ model: User }]
    })
    if (courses) {
        res.status(201).json(courses);
    } else {
        res.status(404).json({ message: "Ups no courses where found "});
    }
}));

// gets a specific courses for the user requested
router.get("/:id",  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: [{ model: User }]
    });

    if (course) {
        res.status(200).json(course)
    } else {
        res.status(404).json({message: "Ups that course does not exist"})
    }
}));
// creates a new course of the user requested
router.post("/",  asyncHandler(async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).location("api/courses" + newCourse.id).end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });   
        } else {
          throw error;
        }
      }
    
}));

module.exports = router;