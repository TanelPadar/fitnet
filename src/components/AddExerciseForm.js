import {useState} from "react";
import {postExercise} from "./utils";


const AddExerciseForm = (props) => {
    const [exerciseName, setExerciseName] = useState('')
    async function addExercise() {
        try {
            await postExercise(props.workoutId,exerciseName).then(res => {
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
