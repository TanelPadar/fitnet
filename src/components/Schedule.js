import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
import "./Calendar.css"
import axios from "axios";

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
                    return <div>Workouts</div>
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
        }
    }

    async function deleteWorkout(workoutId) {
        await axios.delete(api + `/delete-workout=${workoutId}`);
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout._id !== workoutId));
    }

    function dayViewRender() {
        for (const workout of workouts) {
            if (selectedDate.toLocaleDateString() === new Date(workout.date).toLocaleDateString()) {
                selectedDayWorkouts.push(workout)
            }
        }
        return (
            <div>
                <button onClick={closeDayView}>Close day view</button>
                <h2>{selectedDate.toLocaleDateString()}</h2>
                {!newWorkoutForm ? (
                    <div>
                        {selectedDayWorkouts.map(selectedDayWorkout => (
                            <div key={selectedDayWorkout._id} className={"d-flex flex-row justify-content-around day-workout w-75"}>
                                <div
                                    className={"w-25 border-end border-dark"}>{new Date(selectedDayWorkout.date).toLocaleTimeString('en-GB', {
                                    timeZone: 'EET',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}</div>
                                <div className={"w-25 border-end border-dark"}>{selectedDayWorkout.userName}</div>
                                <div className={"w-25 border-end border-dark"}>{selectedDayWorkout.description}</div>
                                <div className={"d-flex flex-row justify-content-around w-25"}>
                                    <button>Edit</button>
                                    <button onClick={() => deleteWorkout(selectedDayWorkout._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={toggleNewWorkoutForm}>Add new workout</button>
                    </div>
                ):
                    <div>
                        <form className="d-flex flex-column">
                            <label>Time
                                <input className={calendarError ? 'border border-danger' : ''} value={newWorkoutTime || new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().slice(0, -8)} name={"workoutTime"} type={"datetime-local"} onChange={(e) => setNewWorkoutTime(e.target.value)}/></label>
                            <label>Client
                                <select name="client" onChange={(e) => setNewWorkoutUser(e.target.value)}>
                                    <option value={userId}>Me</option>
                                    {clients.map(client => (
                                        <option key={client._id} value={client._id}>{client.name}</option>
                                    ))}
                                </select></label>
                            <label>Description
                            <input type={"text"} onChange={(e) => setNewWorkoutDescription(e.target.value)}/></label>
                        </form>
                        <button onClick={addNewWorkout}>Add new</button>
                        <button onClick={toggleNewWorkoutForm}>Close</button>
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
                <Calendar className={"calendar"} onChange={onChange} value={value} tileContent={hasWorkout}
                          tileClassName={hasWorkoutStyle} onClickDay={(value) => viewDay(value)}/>
                :
                <div>
                    {dayViewRender()}
                </div>
            }
        </div>
    )
}

export default Schedule;
