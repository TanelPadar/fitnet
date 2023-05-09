
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

    const deleteClientFromTrainer = async (clientId) => {
        const trainerId = localStorage.getItem('userId')

        try {
            await axios.put(api + `/remove_client/${trainerId}/${clientId}`)
            getTrainerClients()
        } catch (error) {
            console.log('Error removing client', error)
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

            <table className="table table-hover table-striped table-responsive mt-5 ">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Nr</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td><i onClick={()=>deleteClientFromTrainer(client._id)} className="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Clients;


