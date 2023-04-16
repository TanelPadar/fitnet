

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import Profile from "./Profile";
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
               </nav>

           </div>
           <div className="col-10">
               {activeItem === 'profile' && <Profile activeItem={activeItem} />}
               {activeItem === 'clients' && <Clients activeItem={activeItem} />}
           </div>
           </div>
       </div>
    );
};

export default Sidebar;
