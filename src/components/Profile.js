
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';



function Profile ({ activeItem}) {



    return(
        <div>
            <div class="row bg-secondary">
            <div className="col-8 h2 text-white">Your information</div>
            <div className="col-4 h2 text-white">Stats</div>
            </div>
            <div className="row mt-5">
                <div className="col-6 mx-5">
                    <div>
                        <div className="profile-info d-flex justify-content-between w-75 py-3">
                            <p>Name</p>
                            <p className="pe-5">Sander Palk</p>
                        </div>
                        <div className="profile-info d-flex justify-content-between w-75 py-3">
                            <p>Birthday</p>
                            <p className="pe-5">3. November 2002</p>
                        </div>
                        <div className="profile-info d-flex justify-content-between w-75 py-3">
                            <p>Gender</p>
                            <p className="pe-5">Male</p>
                        </div>
                        <div className="profile-info d-flex justify-content-between w-75 py-3">
                            <p>E-mail</p>
                            <p className="pe-5">Sander@voco.ee</p>
                        </div>
                        <div className="profile-info d-flex justify-content-between w-75 py-3">
                            <p>Phone</p>
                            <p className="pe-5">+372 5459 0759</p>
                        </div>
                        <div className="profile-info d-flex justify-content-between w-75 py-3">
                            <p>City</p>
                            <p className="pe-5">Tartu</p>
                        </div>
                        <div className="profile-info d-flex justify-content-between w-75 py-3">
                            <p>Home city</p>
                            <p className="pe-5">Tasku Gym!</p>
                        </div>
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


