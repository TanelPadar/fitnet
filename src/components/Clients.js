import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";



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
        <div className="clients">
            <h4 class="my-3">KLIENDID</h4>
            <div className="container w-75">
            <table className="table table-hover table-striped table-responsive mt-5 ">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nimi</th>
                    <th scope="col">Telefoni Nr</th>
                    <th scope="col">Tegevus</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td><i onClick={()=>deleteClientFromTrainer(client._id)} className="icon fas fa-trash-alt"></i>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Clients;


