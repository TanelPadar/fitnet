import axios from "axios";
import {useEffect, useState} from "react";
import AddExerciseForm from "./AddExerciseForm";
import './Exercises.css'
import ExerciseModal from "./ExerciseModal";
import {getExercisesById} from "./utils";


function Exercises(props) {

    const [exercises, setExercises] = useState([])
    useEffect(() => {
        fetchExercises().then(r => r)
    }, []);

    const fetchExercises = async () => {
        try {
            const response = await getExercisesById(props.WorkoutId)
            await setExercises(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    function openExerciseModal(exercise) {
        setActiveExercise(exercise)
        setIsOpen(true)
    }

    return (
        <div>
            <h5 className="text-muted my-3">{props.WorkoutDesc}</h5>
            <div onClick={()=>props.setExerciseView(false)} className="text-button d-flex align-items-center mx-auto w-75 gap-1">
                <i className="fas fa-arrow-left"></i>
                <p className="m-0 fw-bold">Tagasi</p>
            </div>
            {!addExercise ?
                <div onClick={() => setAddExercise(true)} className="text-button d-flex align-items-center justify-content-center mt-3 gap-1">
                    <i className="fas fa-plus"></i>
                    <p className="m-0 fw-bold">Lisa harjutus</p>
                </div> :
                <AddExerciseForm setAddExercise={setAddExercise} exercises={exercises} workoutId={props.WorkoutId} refreshExercises={getWorkoutExercises}/>}
            <div>
                {exercises.map((exercise) => {
                    const exerciseSets = exercise.sets
                    return (
                        <>
                            <div className={"exercise-container w-25"} onClick={()=> openExerciseModal(exercise)}>
                                <h2>{exercise.exerciseName}</h2>
                                <table className={"sets"}>
                                    {exerciseSets.map((set) => (
                                        <tr>
                                            <td>{set.weight} kg</td>
                                            <td>{set.reps}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </>
                    )
                })}
            </div>
            <ExerciseModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} exercise={activeExercise} refreshExercises={getWorkoutExercises}/>
        </div>
    )
}

export default Exercises