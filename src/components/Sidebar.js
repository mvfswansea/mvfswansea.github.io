import React from 'react';

import '../styles/css/components/sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <img
                src="/images/MVFFLogo.svg"
                alt="Sidebar" />
            <ul>
                <li><a href="/"> Home </a></li>
                <li><a href="/elevens"> Elevens </a></li>
                <li><a href="/leagues"> Leagues </a></li>
                <li><a href="https://www.manvfatfootball.org/swansea"> Official Gwyr League </a></li>
                <li><a href="https://www.manvfatfootball.org/swansea2"> Official Copr League </a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
