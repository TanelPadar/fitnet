
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import axios from "axios";



function Profile () {
    const [user, setUser] = useState(null)
    const api = 'http://localhost:4000'
    const getUserInformation = async (userId) => {
        axios.get(api + `/trainers/${userId}`)
            .then((response) => {
                const userData = response.data
                setUser(userData)
            })
            .catch(() => console.log('No user found'))
    }

    getUserInformation('644faf4484fe1969b0782942')

    const parseRow = (name,value) => {
        if (name === "Birthday" && value) {
            const date = new Date(value);
            const options = { day: "numeric", month: "long"};
            value = date.toLocaleDateString("en-US", options);
        }
        return (
            <div className="profile-info d-flex justify-content-between w-75 py-3">
                <p>{name}</p>
                <p className="pe-5">{value}</p>
            </div>
        )
    }

    return(
        <div>
            <div class="row bg-secondary">
            <div className="col-8 h2 text-white">Your information</div>
            <div className="col-4 h2 text-white">Stats</div>
            </div>

            <div className="row mt-5">
                <div className="col-6 mx-5">
                    <div>
                        {user && parseRow('Name', user.name)}
                        {user && parseRow('Birthday', user.birthday)}
                        {user && parseRow('Gender', user.gender)}
                        {user && parseRow('E-mail', user.email)}
                        {user && parseRow('City', user.city)}
                        {user && parseRow('Home city', user.home_gym)}
                        <div className="d-flex mt-4"><button type="button" className="profile-btn ">Edit information</button></div>
                    </div>

                </div>
                <div className="col-4 mx-5">
                    <div className="profile-info d-flex justify-content-evenly w-75 py-3">
                        <p>Total Clients</p>
                        <p className="">4</p>
                    </div>
                    <div className="profile-info d-flex justify-content-evenly w-75 py-3">
                        <p>Active Clients</p>
                        <p className="">3</p>
                    </div>
                    <div className="d-flex justify-content-between w-75 mt-4">
                        <button type="button" className="profile-btn">View Clients</button>
                        <button type="button" className="profile-btn ">Add new</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Profile;


