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
            console.log(exercises)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h5 className="text-muted my-3">{ props.WorkoutDesc}</h5>
            <table className="table mt-5">
                <thead>
                <p className="fw-bold text-muted">Muscle Group:</p>
                <tr>
                    <th scope="col">Row</th>
                    <th scope="col">Exercise</th>
                    <th scope="col">Reps</th>
                    <th scope="col">Sets</th>
                    <th scope="col">Weight</th>
                </tr>
                </thead>
                <tbody>
                {exercises.map((exercise, index) => {
                    let rowNumber = index * 2;
                    return (
                        <>
                            <tr key={exercise._id}>
                                <th scope="row">{rowNumber}</th>
                                <td>{exercise.exerciseName}</td>
                                <td>{exercise.sets[0].reps}</td>
                                <td>{exercise.sets[0].weight}</td>
                                <td>{exercise.sets[0].reps}</td>
                            </tr>
                            {exercise.sets.length > 1 &&
                                exercise.sets.slice(1).map((set, setIndex) => {
                                    rowNumber++;
                                    return (
                                        <tr key={setIndex}>
                                            <th scope="row">{rowNumber}</th>
                                            <td>{exercise.exerciseName}</td>
                                            <td>{set.reps}</td>
                                            <td>{set.weight}</td>
                                            <td>{set.reps}</td>
                                        </tr>
                                    );
                                })}
                        </>
                    );
                })}
                </tbody>
            </table>



        </div>
    )
}

export default Exercises