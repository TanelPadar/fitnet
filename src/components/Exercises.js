import axios from "axios";
import {useEffect, useState} from "react";
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

    return (
        <div>
            <h5 className="text-muted my-3">{props.WorkoutDesc}</h5>
            <table className="table mt-5 w-50 center">
                <thead>
                <p className="fw-bold text-muted">Lihasgrupp:</p>
                <tr>
                    <th scope="col">Rida</th>
                    <th scope="col">Harjutus</th>
                </tr>
                </thead>
                <tbody>
                {exercises.map((exercise, index) => {
                    let rowNumber = index + 1;
                    const exerciseSets = exercise.sets
                    return (
                        <>
                            <tr key={exercise._id}>
                                <th scope="row">{rowNumber}</th>
                                <td>{exercise.exerciseName}</td>
                                <td></td>
                            </tr>
                            {exerciseSets.map((set) => (
                                <tr>
                                    <td></td>
                                    <td>{set.weight} kg</td>
                                    <td>{set.reps}</td>
                                </tr>
                            ))}
                        </>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Exercises