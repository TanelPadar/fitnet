

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import Profile from "./Profile";
import Clients from "./Clients";



const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('profile');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };
    return (
       <div className="container-fluid">
           <div className="row">
           <div className="col-2 vh-100 sidebar">
               <nav className="d-flex flex-column mt-2">
                   <a
                       className={activeItem === 'profile' ? 'profile-item active' : 'profile-item'}
                       href="#"
                       onClick={() => handleItemClick('profile')}
                   >
                       Tanel Padar
                   </a>
                   <a
                       className={activeItem === 'clients' ? 'active' : ''}
                       href="#"
                       onClick={() => handleItemClick('clients')}
                   >
                       Clients
                   </a>
                   <a
                       className={activeItem === 'schedule' ? 'active' : ''}
                       href="#"
                       onClick={() => handleItemClick('schedule')}
                   >
                       Schedule
                   </a>
                   <a
                       className={activeItem === 'settings' ? 'active' : ''}
                       href="#"
                       onClick={() => handleItemClick('settings')}
                   >
                       Settings
                   </a>
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
