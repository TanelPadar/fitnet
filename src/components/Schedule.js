import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
import "./Calendar.css"
import axios from "axios";
import Exercises from "./Exercises";

function Schedule() {
    const api = process.env.REACT_APP_API_KEY
    const userId = localStorage.getItem('userId')

    const [value, onChange] = useState(new Date());
    const [workouts, setWorkouts] = useState([]);
    const [dayView, setDayView] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [newWorkoutForm, setNewWorkoutForm] = useState(false);
    const [clients, setClients] = useState([])
    const [newWorkoutUser, setNewWorkoutUser] = useState(userId);
    const [newWorkoutTime, setNewWorkoutTime] = useState('')
    const [newWorkoutDescription, setNewWorkoutDescription] = useState('')
    const [calendarError, setCalendarError] = useState(false)
    const [exerciseView, setExerciseView] = useState(false)
    const [workoutId, setWorkoutId] = useState('')
    const [workoutDesc, setWorkoutDesc] = useState('')
    const selectedDayWorkouts = []

    useEffect(() => {
        getWorkouts()
        getTrainerClients()
    }, []);

    const getTrainerClients = async () => {
        try {
            const response = await axios.get(api + `/trainer/clients/${userId}`)
            setClients(response.data)
        } catch (error) {
            console.log('No clients found', error)
        }
    }

    const getWorkouts = async () => {
        try {
            const results = await axios.get(api + `/schedule/${userId}`)
            await setWorkouts(results.data)
        } catch (e) {
            console.log(e)
        }
    }

    const hasWorkout = ({date, view}) => {
        if (view === 'month') {
            for (const workout of workouts) {
                if (date.toLocaleDateString() === new Date(workout.date).toLocaleDateString()) {
                    return <div>Treening</div>
                }
            }
        }
    }

    const hasWorkoutStyle = ({date, view}) => {
        if (view === 'month') {
            for (const workout of workouts) {
                if (date.toLocaleDateString() === new Date(workout.date).toLocaleDateString()) {
                    return "has-workout"
                }
            }
        }
    }

    const viewDay = (value) => {
        setSelectedDate(value);
        setDayView(true);
    }

    function toggleNewWorkoutForm() {
        setNewWorkoutForm(!newWorkoutForm)
    }

    async function addNewWorkout() {
        setCalendarError(false)
        if (newWorkoutTime === '') {
            setCalendarError(true)
        } else {
            await axios.post(api + '/add-workout', {
                userId: newWorkoutUser,
                date: newWorkoutTime,
                description: newWorkoutDescription
            })
            await getWorkouts()
            await setNewWorkoutForm(false)
        }
    }

    async function deleteWorkout(workoutId) {
        await axios.delete(api + `/delete-workout=${workoutId}`);
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout._id !== workoutId));
    }

    function toggleExerciseView(id,description) {
        setWorkoutDesc(description)
        setWorkoutId(id)
        setExerciseView(!exerciseView)
    }

    function dayViewRender() {
        for (const workout of workouts) {
            if (selectedDate.toLocaleDateString() === new Date(workout.date).toLocaleDateString()) {
                selectedDayWorkouts.push(workout)
            }
        }
        return (
            <div>

                    <h4>Treening</h4>
                    <h6>{selectedDate.toLocaleDateString()}</h6>
                {!newWorkoutForm ? (
                    <div onClick={closeDayView} className="text-button d-flex align-items-center mx-auto w-75 gap-1">
                        <i className="fas fa-arrow-left"></i>
                        <p className="m-0 fw-bold">Tagasi</p>
                    </div>
                ) : '' }

                {!newWorkoutForm ? (
                        <div>
                            {selectedDayWorkouts.map(selectedDayWorkout => (
                                <div key={selectedDayWorkout._id}
                                     className={"d-flex flex-row justify-content-around day-workout w-75"}>
                                    <div
                                        className={"w-25 border-end border-dark"}>{new Date(selectedDayWorkout.date).toLocaleTimeString('en-GB', {
                                        timeZone: 'EET',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}</div>
                                    <div className={"w-25 border-end border-dark"}>{selectedDayWorkout.userName}</div>
                                    <div className={"w-25 border-end border-dark"}>{selectedDayWorkout.description}</div>
                                    <div className="d-flex flex-row justify-content gap-2">
                                        <i onClick={() =>toggleExerciseView(selectedDayWorkout._id,selectedDayWorkout.description)} className="fas fa-edit"></i>
                                        <i onClick={() => deleteWorkout(selectedDayWorkout._id)} className="fas fa-trash"></i>
                                    </div>
                                </div>
                            ))}
                            <div className="text-button d-flex align-items-center justify-content-center mt-3 gap-1">
                                <i onClick={toggleNewWorkoutForm} className="fas fa-plus"></i>
                                <p onClick={toggleNewWorkoutForm} className="m-0 fw-bold">Lisa Treening</p>
                            </div>
                        </div>
                    ) :
                    <div>
                        <div onClick={() => setNewWorkoutForm(false)} className="text-button d-flex align-items-center mx-auto w-75 gap-1">
                            <i className="fas fa-arrow-left"></i>
                            <p className="m-0 fw-bold">Tagasi</p>
                        </div>
                        <table className="table mt-5">
                            <thead>
                            <tr>
                                <th scope="col">Aeg</th>
                                <th scope="col">Klient</th>
                                <th scope="col">Kirjeldus</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className={"w-25"}> <input className={calendarError ? 'border border-danger' : ''}
                                            value={newWorkoutTime || new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().slice(0, -8)}
                                            name={"workoutTime"} type={"datetime-local"}
                                            onChange={(e) => setNewWorkoutTime(e.target.value)} className="form-control" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-sm"/></td>
                                <td className={"w-25"}> <select name="client" className="form-select" aria-label="Default select example" onChange={(e) => setNewWorkoutUser(e.target.value)} >
                                    <option value={userId}>Mina</option>
                                    {clients.map(client => (
                                        <option key={client._id} value={client._id}>{client.name}</option>
                                    ))}
                                </select></td>
                                <td> <input type={"text"} placeholder={"Lisa treeningu kirjeldus"}
                                            onChange={(e) => setNewWorkoutDescription(e.target.value)} className="form-control w-100" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-sm"/></td>
                            </tr>
                            </tbody>
                        </table>
                        <div onClick={addNewWorkout} className="schedule-save d-flex justify-content-end align-items-center">
                            <p className=" my-0">salvesta</p>
                            <i className="fa-fw fas fa-save"></i>
                        </div>

                    </div>
                }
            </div>
        )
    }

    const closeDayView = () => {
        setDayView(false);
        setSelectedDate(null);
        setNewWorkoutForm(false)
    }


    return (
        <div>
            {!dayView ?
                <div><h4 className="my-3">AJAKAVA</h4>
                <div className="container w-75 mt-5"><Calendar className={"calendar mx-5 w-auto"} onChange={onChange} value={value} tileContent={hasWorkout}
                          tileClassName={hasWorkoutStyle} onClickDay={(value) => viewDay(value)} locale="et-EE"/></div></div>
                :
                <div>
                    {!exerciseView ? dayViewRender() : <Exercises WorkoutId={workoutId} WorkoutDesc={workoutDesc} setExerciseView={setExerciseView}/>}
                </div>
            }
        </div>
    )
}

export default Schedule;
