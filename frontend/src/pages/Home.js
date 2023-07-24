import {useEffect} from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

const Home = () => {
    //to get all workouts
    const {workouts, dispatch} = useWorkoutContext()

    useEffect(() => {
        const fetchWorkouts = async () =>{
            const response = await fetch("/api/workouts")
            const json = await response.json() // json contains array of object
            if (response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    },[dispatch]) // Empty dependency array means the effect runs only once

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>( // map executes only if workouts is not empty
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home