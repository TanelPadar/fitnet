
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';



function Profile () {

    const parseRow = (name,value) => {
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
                        {parseRow('Name', 'Sander Palk')}
                        {parseRow('Birthday', '3. November 2002')}
                        {parseRow('Gender', 'Male')}
                        {parseRow('E-mail', 'Sander@voco.ee')}
                        {parseRow('City', 'Tartu')}
                        {parseRow('Home city', 'Tasku Gym!')}
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


