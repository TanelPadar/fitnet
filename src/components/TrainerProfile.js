import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import axios from "axios";


function TrainerProfile(props) {
    const [user, setUser] = useState(null)
    const [editInfo, setEditInfo] = useState(true)
    const [clients, setClients] = useState([])

    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [homeGym, setHomeGym] = useState('')

    const api = process.env.REACT_APP_API_KEY
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        getUserInformation();
        getTrainerClients()
    }, []);

    const getUserInformation = async () => {
        try {
            const response = await axios.get(api + `/trainers/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.log('No user found', error);
        }
    };

    const getTrainerClients = async () => {
        try {
            const response = await axios.get(api + `/trainer/clients/${userId}`)
            setClients(response.data)
            await console.log(clients)
        } catch (error) {
            console.log('No clients found', error)
        }
    }

    const handleEditInfo = () => {
        setEditInfo(!editInfo);
        setName(user.name)
        setBirthday(user.birthday)
        setEmail(user.email)
        setPhone(user.phone)
        setGender(user.gender)
        setCity(user.city)
        setHomeGym(user.home_gym)
    }

    const handleEditInfoSubmit = async () => {
        const updatedFields = {}

        if (name !== user.name) {
            updatedFields.name = name
        }
        if (phone !== user.phone) {
            updatedFields.phone = phone
        }
        if (gender !== user.gender) {
            updatedFields.gender = gender
        }
        if (city !== user.city) {
            updatedFields.city = city
        }
        if (homeGym !== user.home_gym) {
            updatedFields.home_gym = homeGym
        }
        if (birthday !== user.birthday) {
            updatedFields.birthday = new Date(birthday).toISOString();
        }

        try {
            const response = await  axios.put(api + `/trainers/${userId}`, updatedFields)
            setEditInfo(false)
        } catch (error) {
            console.log("Error", error)
        }
    }

    const parseRow = (name, value) => {
        return (
            <div className="profile-info d-flex justify-content-between w-75 py-3">
                <p>{name}</p>
                <p className="pe-5">{value}</p>
            </div>
        )
    }

    function logOut() {
        localStorage.removeItem('userId')
        window.location.reload(false)
    }

    return (
        <div>
            <div class="row bg-secondary">
                <div className="col-8 h2 text-white">Your information</div>
                <div className="col-2 h2 text-white">Stats</div>
                <div className="col-2"><button onClick={logOut} className="profile-btn">Log out</button></div>
            </div>

            <div className="row mt-5">
                <div className="col-6 mx-5">
                    {editInfo ?
                        <div>
                            {user && parseRow('Name', user.name)}
                            {user && parseRow('E-mail', user.email)}
                            {user && parseRow('Phone', user.phone)}
                            {user && parseRow('Birthday', new Date(user.birthday).toLocaleDateString("en-US", {day: "numeric", month: "long"}))}
                            {user && parseRow('Gender', user.gender)}
                            {user && parseRow('City', user.city)}
                            {user && parseRow('Home Gym', user.home_gym)}
                            <div className="d-flex mt-4">
                                <button type="button" onClick={handleEditInfo} className="profile-btn ">Edit information
                                </button>
                            </div>
                        </div>
                        :
                        <div>
                            <form onSubmit={handleEditInfoSubmit}>
                                {user && parseRow('Name', user.name)}
                                {user && parseRow('E-mail', user.email)}
                                <div className="profile-info d-flex justify-content-between w-75 py-3">
                                    <p>Phone</p>
                                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                </div>
                                <div className="profile-info d-flex justify-content-between w-75 py-3">
                                    <p>Birthday</p>
                                    <input type="date" value={birthday ? new Date(birthday).toISOString().substring(0, 10) : ''} onChange={(e) => setBirthday(e.target.value)}/>
                                </div>
                                <div className="profile-info d-flex justify-content-between w-75 py-3">
                                    <p>Gender</p>
                                    <select name="gender" onChange={(e) => setGender(e.target.value)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="profile-info d-flex justify-content-between w-75 py-3">
                                    <p>City</p>
                                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                                </div>
                                <div className="profile-info d-flex justify-content-between w-75 py-3">
                                    <p>Home Gym</p>
                                    <input type="text" value={homeGym} onChange={(e) => setHomeGym(e.target.value)}/>
                                </div>
                                <div className="d-flex w-75 justify-content-between mt-4">
                                    <button type="button" type="submit" className="profile-btn ">Save information
                                    </button>
                                    <button type="button" onClick={handleEditInfo} className="profile-btn ">Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
                <div className="col-4 mx-5">

                    <div className="profile-info d-flex justify-content-evenly w-75 py-3">
                        <p>Your Clients</p>
                        <p className="">{clients.length}</p>
                    </div>
                    <div className="d-flex justify-content-between w-75 mt-4">
                        <button type="button" onClick={(e) => props.viewClients('clients')} className="profile-btn">View Clients</button>
                        <button type="button" className="profile-btn ">Add new</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default TrainerProfile;


