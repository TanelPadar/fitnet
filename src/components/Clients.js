
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import Deletebtn from '../Images/deletebtn.svg';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";




function Clients () {
    const [clients, setClients] = useState([])

    const api = process.env.REACT_APP_API_KEY
    const userId = localStorage.getItem('userId')
    const getTrainerClients = async () => {
        try {
            const response = await axios.get(api + `/trainer/clients/${userId}`)
            setClients(response.data)
        } catch (error) {
            console.log('No clients found', error)
        }
    }

    useEffect(() => {
        getTrainerClients()
    }, [])


    return(
        <div>
            <div class="row mt-2">
                <div className="col-11 justify-content-center align-items-center d-flex h1">CLIENTS</div>
                <div className="col-1 h2 text-white d-flex justify-content-end">
                    <div className="search-box">
                        <button className="btn-search"><i className="fas fa-search"></i></button>
                        <input type="text" className="input-search dark" placeholder="Type to Search..."></input>
                    </div></div>
            </div>
            <div className="d-flex align-items-center client-headers">
                <div className="d-flex justify-content-around w-50">
                    <p className="m-0 w-25">Name</p>
                    <p className="m-0 w-25">Phone</p>
                </div>
            </div>
            <div className="d-block mt-5">
                {clients.map(client => (
                    <div className="d-flex mb-3">
                        <div className="d-flex justify-content-around w-50">
                            <p className="m-0 w-25 fs-4">{client.name}</p>
                            <p className="m-0 w-25 fs-4">{client.phone}</p>
                        </div>
                        <div className="d-flex justify-content-center w-50 gap-5">
                            <button type="button" className="clients-info-btn">Info</button>
                            <button type="button" className="clients-edit-btn">Edit</button>
                            <img src={Deletebtn} alt="delete_button" />
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default Clients;


