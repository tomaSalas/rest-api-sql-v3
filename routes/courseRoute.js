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
        res.status(200).json(courses);
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

// updates a course of the user requested
router.put("/:id",  asyncHandler(async (req, res) => {
    try {
        const updateCourse = await Course.findByPk(req.params.id);
        //using  express middleware to update the values
        if (updateCourse) {
            await course.update({
              title: req.body.title,
              description: req.body.description,
              estimatedTime: req.body.estimatedTime,
              materialsNeeded: req.body.materialsNeeded,
              userId: req.body.userId
            });
            res.status(204).end();
          } else {
            res
              .status(404).json({ message: "Ups, course not found" });
          }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });   
        } else {
          throw error;
        }
      }
    
}));

// delete row of the table
router.delete("/:id",  asyncHandler(async (req, res) => {
    const courseDelete = await Course.findByPk(req.params.id);

    if (courseDelete) {
        await course.destroy();
        res.status(204).end();
    } else {
        res.status(404).json( { message: "Ups, course not found"})
    }
}));



module.exports = router;