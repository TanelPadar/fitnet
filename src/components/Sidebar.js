import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import TrainerProfile from "./TrainerProfile";
import Clients from "./Clients";
import Schedule from "./Schedule";


const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('profile');

    function generateNavItem(itemName, activeItem, handleItemClick,icon) {
        const isActive = itemName === activeItem;
        return (
            <a
                className={`profile-item d-flex  ${isActive ? 'active' : ''}`}
                href="#"
                onClick={() => handleItemClick(itemName)}
            >
                <i className={'icon d-flex align-items-center mx-2 my-5 ' + icon + (isActive ? ' active' : '')}></i>
            </a>
        );
    }
    function logOut() {
        localStorage.removeItem('userId')
        window.location.reload(false)
    }

    const handleItemClick = (item) => {
        setActiveItem(item);
        if (item === 'log out') {
            logOut()
        }
    };
    return (
        <div className="container-fluid vh-100">
            <div className="row vh-100">
                <div className="col-1 sidebar align-items-center min-vw-25">
                    <nav className="d-flex flex-column align-items-center h-100  mt-2 justify-content-center">
                        {generateNavItem('profile', activeItem, handleItemClick, 'fa fa-user fa-fw')}
                        {generateNavItem('clients', activeItem, handleItemClick, 'fas fa-users')}
                        {generateNavItem('schedule', activeItem, handleItemClick, 'far fa-calendar-alt')}
                        {generateNavItem('settings', activeItem, handleItemClick, 'fas fa-cog')}
                        {generateNavItem('log out', activeItem, handleItemClick, 'fas fa-power-off')}
                    </nav>
                </div>
                <div className="main-content col-11 justify-content-center align-items-center">
                    {activeItem === 'profile' && <TrainerProfile viewClients={setActiveItem}/>}
                    {activeItem === 'clients' && <Clients/>}
                    {activeItem === 'schedule' && <Schedule/>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
