const express = require("express");
//importing db model
const Workout = require("../models/workoutModel")
//importing db controllers 
const {createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout} = require("../controllers/workoutControllers")
//creates a Router object that allows you to define routes and group related route handlers together
const router = express.Router()

//route handlers

//get all workouts
router.get("/",getWorkouts)
//GET single workout
router.get("/:id",getWorkout)

//POST a new workout
router.post("/",createWorkout)

//DELETE a workout
router.delete("/:id",deleteWorkout)

//UPDATE a workout
router.patch("/:id",updateWorkout)

module.exports = router
 