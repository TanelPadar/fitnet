import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {useState} from "react";
import "./Calendar.css"

function Schedule () {
    const [value, onChange] = useState(new Date());

    function logDate(value) {
        console.log(value)
    }

    return (
        <div>
            <Calendar className={"calendar"} onChange={onChange} value={value} onClick={logDate(value)} />
        </div>
    )
}

export default Schedule;