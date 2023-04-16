
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import Deletebtn from '../Images/deletebtn.svg';
import '@fortawesome/fontawesome-free/css/all.css';




function Clients () {



    return(
        <div>
            <div class="row bg-secondary">
                <div className="col-11 justify-content-center align-items-center d-flex h2 text-white">Your Client List</div>
                <div className="col-1 h2 text-white d-flex justify-content-end">
                    <div className="search-box">
                        <button className="btn-search"><i className="fas fa-search"></i></button>
                        <input type="text" className="input-search" placeholder="Type to Search..."></input>
                    </div></div>
            </div>
            <div className="d-flex align-items-center client-headers">
                <div className="d-flex justify-content-around w-50">
                    <p className="m-0 w-25">Name</p>
                    <p className="m-0 w-25">Phone</p>
                </div>
            </div>
            <div className="d-block mt-5">
                <div className="d-flex mb-3">
                    <div className="d-flex justify-content-around w-50">
                            <p className="m-0 w-25">Arnold Schwarzenegger</p>
                            <p className="m-0 w-25">+372 942 293</p>
                    </div>
                    <div className="d-flex justify-content-center w-50 gap-5">
                        <button type="button" className="clients-info-btn">Info</button>
                        <button type="button" className="clients-edit-btn">Edit</button>
                        <img src={Deletebtn} alt="delete_button" />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="d-flex justify-content-around w-50">
                        <p className="m-0 w-25">Arnold Schwarzenegger</p>
                        <p className="m-0 w-25">+372 942 293</p>
                    </div>
                    <div className="d-flex justify-content-center w-50 gap-5">
                        <button type="button" className="clients-info-btn">Info</button>
                        <button type="button" className="clients-edit-btn">Edit</button>
                        <img src={Deletebtn} alt="delete_button" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clients;


