// place where we write express app
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")

// express app 
const app = express()

/* When a request is received, the express.json() middleware will parse the 
JSON data in the request body and make it available in the req.body property of the request object. 
This allows us to access and work with the JSON data in our route handlers.*/
app.use(express.json())

// middleware , executes everytime when a route is accessed
app.use((req,res,next) => { 
    console.log(req.path,req.method)
    next()
})

//using grouped routes exported from workouts 
app.use("/api/workouts",workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT,() => {
        console.log(`connected to db and listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) =>{
        console.log(error)
    })
/* If the connection is successful, you can execute any desired code in the .then() block.
If there is an error during the connection, it will be caught in the .catch() block and logged to the console. */


