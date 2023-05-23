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
            await  axios.put(api + `/trainers/${userId}`, updatedFields)
            setEditInfo(false)
        } catch (error) {
            console.log("Error", error)
        }
    }

    const parseRow = (name, value, icon) => {
        return (
            <div className="profile-info d-flex justify-content-start align-items-center gap-3 my-2">
                <div>{icon}</div>
                <div className="d-block">
                    <p className="text-muted d-flex"><small>{name}</small></p>
                    <div><p className="">{value}</p></div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h4 className="my-3">Profiil</h4>
            <div className="justify-content-center row mt-5">
                <div className="container d-flex justify-content-evenly">
                    {editInfo ?
                        <div className="flex-column">
                            {user && parseRow('Nimi', user.name, <div className="profile-icon"><i className="fas fa-user-circle fa-fw"></i></div>)}
                            {user && parseRow('E-Post', user.email, <div className="profile-icon"><i className="fas fa-envelope fa-fw"></i></div>)}
                            {user && parseRow('Telefon', user.phone, <div className="profile-icon"><i className="fas fa-phone-alt fa-fw"></i></div>)}
                            {user && parseRow('Sünnipäev', new Date(user.birthday).toLocaleDateString("en-US", {day: "numeric", month: "long"}),
                                <div className="profile-icon"><i className="fas fa-birthday-cake fa-fw"></i></div>)}
                            {user && parseRow('Sugu', user.gender, <div className="profile-icon"><i className="fas fa-venus-mars fa-fw"></i></div>)}
                            {user && parseRow('Linn', user.city, <div className="profile-icon"><i className="fas fa-city fa-fw" ></i></div>)}
                            {user && parseRow('Jõusaal', user.home_gym, <div className="profile-icon"><i className="fas fa-dumbbell fa-fw"></i></div>)}
                            <div className="d-flex mt-5">
                                <button type="button" onClick={handleEditInfo} className="profile-btn">Muuda profiili
                                </button>
                            </div>
                        </div>
                        :
                        <div className="">
                            <form onSubmit={handleEditInfoSubmit}>
                                {user && parseRow('Name', user.name)}
                                {user && parseRow('E-mail', user.email)}
                                <div className="profile-info d-block justify-content-start ps-2">
                                    <p className="d-flex text-muted">Phone</p>
                                        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-sm"></input>
                                    <div>
                                        <p className="d-flex text-muted">Birthday</p>
                                        <input type="date" value={birthday ? new Date(birthday).toISOString().substring(0, 10) : ''} onChange={(e) => setBirthday(e.target.value)} className="form-control" aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <div>
                                        <p className="d-flex text-muted">Gender</p>
                                        <select className="form-select" aria-label="Default select example" name="gender" onChange={(e) => setGender(e.target.value)}>
                                            <option value="Male">Mees</option>
                                            <option value="Female">Naine</option>
                                            <option value="Other">Muu</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="d-flex text-muted">City</p>
                                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <div>
                                        <p className="d-flex text-muted">Home Gym</p>
                                        <input type="text" value={homeGym} onChange={(e) => setHomeGym(e.target.value)} className="form-control" aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                </div>
                                <div className="d-flex gap-1 justify-content-between mt-5">
                                    <button type="button" type="submit" className="profile-btn">Save information
                                    </button>
                                    <button type="button" onClick={handleEditInfo} className="profile-btn ">Cancel
                                    </button>
                                </div>
                            </form>

                        </div>
                    }
                    <div className="w-25">
                        <div className="profile-info d-flex justify-content-evenly w-50 py-3">
                            <p className="fw-bold">Klientide arv:</p>
                            <p className="">{clients.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default TrainerProfile;


