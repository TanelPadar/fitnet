import Sidebar from './components/Sidebar.js';
import './App.css';
import Login from "./components/Login";
import {useEffect, useState} from "react";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)

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
