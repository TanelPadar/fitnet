import axios from "axios";
import {useState} from "react";


const AddExerciseForm = (props) => {
    const [exerciseName, setExerciseName] = useState('')


    const api = process.env.REACT_APP_API_KEY
    async function addExercise() {
        const workoutId = props.workoutId
        try {
            await axios.post(api + `/add-exercise/${workoutId}`, {
                exerciseName: exerciseName
            }).then(res => {
                if (res.status === 200) {
                    props.setAddExercise(false)
                    props.refreshExercises()
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <button onClick={() => props.setAddExercise(false)}>Close</button>
            <div>
                <input type={"text"} placeholder={"Harjutuse nimi..."} onChange={(e) => setExerciseName(e.target.value)} value={exerciseName}/>
                <button onClick={()=>addExercise()}>Lisa</button>
            </div>
        </div>
    );
};

export default AddExerciseForm;
