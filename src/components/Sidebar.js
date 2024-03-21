import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/css/components/sidebar.css';

function Sidebar({ closeSidebar }) {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
        closeSidebar(); // Close the sidebar when toggled
    };

    return (
        <div className={`sidebar ${showSidebar ? 'show-sidebar' : ''}`}>
            <img src="images/MVFFLogo.svg" alt="Sidebar" />
            <ul>
                <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
                <li><Link to="/news" onClick={toggleSidebar}>News</Link></li>
                <li><Link to="/leagues" onClick={toggleSidebar}>Leagues</Link></li>
                <li><Link to="/challenge" onClick={toggleSidebar}>AC Challenge</Link></li>
                <li><Link to="/totw" onClick={toggleSidebar}>Team Of The Week</Link></li>
                <li><Link to="/events" onClick={toggleSidebar}>Events</Link></li>
                <li><Link to="/sponsors" onClick={toggleSidebar}>Sponsors</Link></li>
                <li><a href="https://www.manvfatfootball.org/swansea">Official Gwyr League</a></li>
                <li><a href="https://www.manvfatfootball.org/swansea2">Official Copr League</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
