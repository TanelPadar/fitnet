import {useEffect, useState} from "react";
import AddExerciseForm from "./AddExerciseForm";
import './Exercises.css'
import ExerciseModal from "./ExerciseModal";
import {getExercisesById} from "./utils";
import axios from "axios";

function Exercises(props) {
    const [exercises, setExercises] = useState([])
    const [addExercise, setAddExercise] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [activeExercise, setActiveExercise] = useState({})

    useEffect(() => {
        fetchExercises()
    }, []);

    const fetchExercises = async () => {
        try {
            const response = await getExercisesById(props.WorkoutId)
            await setExercises(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async function deleteExercise(id) {
        await axios.delete(process.env.REACT_APP_API_KEY + `/delete-exercise/${id}`)
        setIsOpen(false)
        fetchExercises()
    }

    function openExerciseModal(exercise) {
        setActiveExercise(exercise)
        setIsOpen(true)
    }

    return (
        <div>
            <h4 className="tmy-3">{props.WorkoutDesc}</h4>
            <div onClick={() => props.setExerciseView(false)}
                 className="text-button d-flex align-items-center mx-auto w-75 gap-1">
                <i className="fas fa-arrow-left"></i>
                <p className="m-0">Tagasi</p>
            </div>
            {!addExercise ?
                <div onClick={() => setAddExercise(true)}
                     className="text-button d-flex align-items-center justify-content-center mt-3 gap-1">
                    <i className="fas fa-plus"></i>
                    <p className="m-0 fw-bold">Lisa harjutus</p>
                </div> :
                <AddExerciseForm setAddExercise={setAddExercise} exercises={exercises} workoutId={props.WorkoutId}
                                 refreshExercises={fetchExercises}/>}
            {exercises.map((exercise) => {
                const exerciseSets = exercise.sets
                return (
                    <>
                        <div className={"exercise-container w-25"}>
                            <div onClick={()=> openExerciseModal(exercise)} className={"cursor-pointer"}>
                                <i onClick={() => deleteExercise(exercise._id)} className="icon fas fa-trash-alt delete-exercise-icon"></i>
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
                        </div>
                    </>
                )
            })}
            <ExerciseModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} exercise={activeExercise}
                           refreshExercises={fetchExercises}/>
        </div>
    )
}

    export default Exercises