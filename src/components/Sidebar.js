import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import TrainerProfile from "./TrainerProfile";
import Clients from "./Clients";


const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('profile');

    function generateNavItem(itemName, activeItem, handleItemClick) {
        const isActive = itemName === activeItem;
        return (
            <a
                className={`profile-item ${isActive ? 'active' : ''}`}
                href="#"
                onClick={() => handleItemClick(itemName)}
            >
                {itemName.charAt(0).toUpperCase() + itemName.slice(1)}
            </a>
        );
    }
    function logOut() {
        localStorage.removeItem('userId')
        window.location.reload(false)
    }

    const handleItemClick = (item) => {
        setActiveItem(item);
    };
    return (
       <div className="container-fluid">
           <div className="row">
           <div className="col-2 vh-100 sidebar min-vw-25">
               <nav className="d-flex flex-column mt-2">
                   {generateNavItem('profile', activeItem, handleItemClick)}
                   {generateNavItem('clients', activeItem, handleItemClick)}
                   {generateNavItem('schedule', activeItem, handleItemClick)}
                   {generateNavItem('settings', activeItem, handleItemClick)}
                   <a className="profile-item" onClick={logOut}>
                       <i className="fas fa-power-off"></i> Log out
                   </a>




               </nav>
           </div>
           <div className="col-10">
               {activeItem === 'profile' && <TrainerProfile viewClients={setActiveItem}/>}
               {activeItem === 'clients' && <Clients/>}
           </div>
           </div>
       </div>
    );
};

export default Sidebar;
