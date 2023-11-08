import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';
import DropdownList from './DropdownList';
import '../styles/css/components/header.css';


function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);

    if (showSidebar) {
      document.body.classList.remove('sidebar-open');
    } else {
      document.body.classList.add('sidebar-open');
    }

    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
      bar.style.zIndex = showSidebar ? '0' : '1';
    });
  };

  return (
    <div className="header">
      <div className="left-button">
        <Link to="/">
          <img
            src="images/MVFFLogo.svg"
            alt="Home"
            style={{
              width: '207px',
              height: '36px'
            }}
          />
        </Link>
      </div>
      <div className="central-button">
        <DropdownList />
      </div>
      <div className="right-button">
        <div className={`container ${showSidebar ? 'change' : ''}`} onClick={toggleSidebar}>
          <div className={`bar bar1 ${showSidebar ? 'change' : ''}`} />
          <div className={`bar bar2 ${showSidebar ? 'change' : ''}`} />
          <div className={`bar bar3 ${showSidebar ? 'change' : ''}`} />
        </div>
        {showSidebar && <Sidebar toggleSidebar={toggleSidebar} />}
      </div>
    </div>
  );
}

export default Header;
