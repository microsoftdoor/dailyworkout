import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { AiFillDelete } from "react-icons/ai";
import {formatDistanceToNow} from "date-fns"

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Steps : </strong>
        {workout.load}
      </p>
      <p>
        <strong>PushUps : </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix : true})}</p>
      <span onClick={handleClick}>
        <AiFillDelete style={{ color: "#8a1e1e" }} />
      </span>
    </div>
  );
};

export default WorkoutDetails;
