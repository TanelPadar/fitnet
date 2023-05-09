import axios from "axios";
import {useEffect, useState} from "react";
import login from "./Login";

function Exercises(props) {
    const api = process.env.REACT_APP_API_KEY

    const [exercises, setExercises] = useState([])

    useEffect(() => {
        getWorkoutExercises()
    }, []);

    const getWorkoutExercises = async () => {
        const WorkoutId = props.WorkoutId
        try {
            const response = await axios.get(api + `/get-exercises/${WorkoutId}`)
            await setExercises(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <button onClick={()=> console.log(exercises)}>log</button>
        </div>
    )
}

export default Exercises