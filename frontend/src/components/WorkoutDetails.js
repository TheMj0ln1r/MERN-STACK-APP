import { useWorkoutContext } from "../hooks/useWorkoutContext"

const WorkoutDetails = ({ workout }) =>{//With the object destructuring { workout }, it extracts the workout property from the object and assigns it to a variable named workout within the component. This allows you to directly access the workout property without having to use props.workout.
    const { dispatch } = useWorkoutContext()

    const handleClick = async ()=>{
        const response = await fetch("/api/workouts/"+workout._id,{
            method: "DELETE"
        })

        const json = await response.json()

        if (response.ok){
            dispatch({type: "DELETE_WORKOUT",payload: json})
        }

    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load : </strong>{workout.load}</p>
            <p><strong>Reps : </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails