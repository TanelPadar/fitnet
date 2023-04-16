
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import Deletebtn from '../Images/deletebtn.svg';



function Clients ({ handleItemClick }) {

    const handleClick = () => {
        handleItemClick('clients');
    };

    return(
        <div>
            <div class="row bg-secondary">
                <div className="col-8 h2 text-white">Your Client List</div>
                <div className="col-4 h2 text-white"><input type="text" placeholder="Name"></input></div>
            </div>
            <div className="d-flex align-items-center client-headers">
                <div className="d-flex justify-content-evenly w-50">
                    <p className="m-0">Name</p>
                    <p className="m-0">Phone</p>
                </div>
            </div>
            <div className="d-block mt-5">
                <div className="d-flex mb-3">
                    <div className="d-flex justify-content-evenly w-50">
                        <p className="m-0">Arnold Schwarzenegger</p>
                        <p className="m-0">+372 94294 29329</p>
                    </div>
                    <div className="d-flex justify-content-evenly w-50">
                        <div className="d-flex"><button type="button" className="clients-info-btn">Info</button></div>
                        <button type="button" className="clients-edit-btn">Edit</button>
                        <img src={Deletebtn} alt="delete_button" />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="d-flex justify-content-evenly w-50">
                        <p className="m-0">Arnold Schwarzenegger</p>
                        <p className="m-0">+372 94294 29329</p>
                    </div>
                    <div className="d-flex justify-content-evenly w-50">
                        <div className="d-flex"><button type="button" className="clients-info-btn">Info</button></div>
                        <div className="d-flex"><button type="button" className="clients-edit-btn">Edit</button></div>
                        <img src={Deletebtn} alt="delete_button" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Clients;


