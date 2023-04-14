

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import Profile from "./Profile";



const Sidebar = () => {
    return (
       <div className="container-fluid">
           <div className="row">
           <div className="col-2 vh-100 sidebar">
               <nav className="d-flex flex-column mt-2">
                   <a href="#">Tanel Padar</a>
                   <a href="#">Clients</a>
                   <a href="#">Schedule</a>
                   <a href="#">Settings</a>

               </nav>
           </div>
           <div className="col-10">
            <Profile/>
           </div>
           </div>
       </div>
    );
};

export default Sidebar;
