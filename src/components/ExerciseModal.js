import Modal from 'react-modal'
import {useEffect, useState} from "react";
import axios from "axios";


const customStyles = {
    content: {
        textAlign: 'center',
        width: '50%',
        margin: 'auto',
        top: '50%',
        left: '55%',
        right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function ExerciseModal(props) {
    const api = process.env.REACT_APP_API_KEY

    const [selectedExercise, setSelectedExercise] = useState({})
    const [exerciseSets, setExerciseSets] = useState([])
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')

    useEffect(() => {
        setSelectedExercise(props.exercise)
        setExerciseSets(props.exercise.sets || [])
    }, [props.exercise]);

    function closeModal() {
        props.setIsOpen(false);
    }

    async function addExerciseSets() {
        const exerciseId = selectedExercise._id
        try {
            const response = await axios.put(api + `/add-exercise-set/${exerciseId}`, {
                weight: weight,
                reps: reps
            })
            setExerciseSets(response.data.sets)
            props.refreshExercises()
        } catch (error) {
            console.log("Error", error)
        }
    }

    async function deleteExerciseSet(setIndex) {
        const exerciseId = selectedExercise._id;
        try {
            const response = await axios.delete(api + `/exercise-set/${exerciseId}/${setIndex}`);
            setExerciseSets(response.data.sets);
            props.refreshExercises();
        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button className={"modal-close"} onClick={closeModal}>Sulge</button>
                <h2>{selectedExercise.exerciseName}</h2>
                <input className={"exercise-input"} type={"number"} placeholder={"Raskused"} onChange={(e)=>setWeight(e.target.value)}/>
                <input className={"exercise-input"} type={"number"} placeholder={"Kordused"}  onChange={(e)=>setReps(e.target.value)}/>
                <button onClick={()=> addExerciseSets()}>Lisa</button>
                <table className={"sets exercise-modal-sets"}>
                    {exerciseSets.length > 0 && exerciseSets.map((set, key) => (
                        <tr key={key}>
                            <td>{set.weight} kg</td>
                            <td>{set.reps}</td>
                            <td><button onClick={()=> deleteExerciseSet(key)}>X</button></td>
                        </tr>
                    ))}
                </table>
            </Modal>
        </div>
    );
}

export default ExerciseModal
