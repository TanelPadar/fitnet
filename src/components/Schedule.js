import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
import "./Calendar.css"
import axios from "axios";

function Schedule() {
    const [value, onChange] = useState(new Date());
    const [workouts, setWorkouts] = useState([]);

    const api = process.env.REACT_APP_API_KEY
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        getWorkouts()
    }, []);


    const getWorkouts = async () => {
        try {
            const results = await axios.get(api + `/schedule/${userId}`)
            console.log(results.data)
            await setWorkouts(results.data)
        } catch (e) {
            console.log(e)
        }
    }

    const hasWorkout = ({date, view}) => {
        if (view === 'month') {
            for (const workout of workouts) {
                if (date.getDate() === new Date(workout.date).getDate()) {
                    return <div>Get up pussy</div>
                }
            }
        }
    }

    const hasWorkoutStyle = ({date, view}) => {
        if (view === 'month') {
            for (const workout of workouts) {
                if (date.getDate() === new Date(workout.date).getDate()) {
                    return "has-workout"

                }
            }
        }
    }


    return (
        <div>
            <Calendar className={"calendar"} onChange={onChange} value={value} tileContent={hasWorkout}
                      tileClassName={hasWorkoutStyle}/>
        </div>
    )
}

export default Schedule;
