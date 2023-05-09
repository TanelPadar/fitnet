import Sidebar from './components/Sidebar.js';
import './App.css';
import Login from "./components/Login";
import {useEffect, useState} from "react";
import Signup from "./components/Signup";
import Registrationcomplete from "./components/Registrationcomplete";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [registered, setRegistered] = useState(false)


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false)
        }
    }, []);

    return (
        <div className="App">
            {!loggedIn ?
                <Login setLoggedIn={setLoggedIn}/>
                :
                <Sidebar/>
            }
        </div>
    );
}

export default App;
