import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json" 
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            console.log("New Workout Added");
            setTitle("")
            setLoad("")
            setReps("")
            dispatch({type: "CREATE_WORKOUT", payload: json})
        }
    }


  return (
    <form  className="create" onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label>Exercise Title: </label>
        <input 
            type="text" 
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='Enter title'
            value={title}

        />
        
        <label>Steps : </label>
        <input 
            type="text" 
            onChange={(e)=>setLoad(e.target.value)}
            placeholder='How many steps?'
            value={load}


        />
        <label>PushUps : </label>
        <input 
            type="text" 
            onChange={(e)=>setReps(e.target.value)}
            placeholder='How many pushups?'
            value={reps}

        />

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm