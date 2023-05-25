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
            <div>
                <input className={"add-exercise-input"} type={"text"} placeholder={"Harjutuse nimi..."} onChange={(e) => setExerciseName(e.target.value)} value={exerciseName} />
                <i onClick={()=>addExercise()} className="fas fa-plus"></i>
            </div>
            <button className={"profile-btn"} onClick={() => props.setAddExercise(false)}>Sulge</button>
        </div>
    );
};

export default AddExerciseForm;
