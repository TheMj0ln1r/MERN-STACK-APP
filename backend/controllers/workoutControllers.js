// creating functions to perform db operations on invocation of routes

const Workout = require("../models/workoutModel")
// mongoose here is to check the values sent by user is valid or not
const mongoose = require("mongoose")

//get all workouts
const getWorkouts = async (req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})// finds all documents
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Workout"})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: "No Workout found"})
    }
    res.status(200).json(workout)
}

//create a new workout
const createWorkout = async (req,res) =>{
    const {title, reps, load} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all the fields",emptyFields})
    }

    //add a doc to db
    try{
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req,res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})//find on id criteria
    if (!workout){
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req,res) =>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{...req.body})// spread operator, posted data to the / willl be updated
    if (!workout){
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}