import { useState } from 'react';
import './Sidebar.css'
import { RxHamburgerMenu, RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";


const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <div className="top">
                <div className="logo">
                    <p> Wurdle </p>
                </div>
                <RxHamburgerMenu id="hamburger" size={20} onClick={() => setSidebarOpen(!sidebarOpen)}/>
            </div>
            <div className="user">

            </div>
            <ul className="items">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <RxDashboard className="nav-icon"/> 
                        
                        <span className="nav-text"> Homepage </span>
                    </Link>

                    <span className="tooltip"> Homepage </span>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;