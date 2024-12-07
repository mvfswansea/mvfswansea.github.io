// Elevens.js
import React from 'react';
import { Link } from 'react-router-dom';

function Elevens() {
  return (
    <div className="elevens-page">
      <h1>All Teams</h1>
      <ul>
        <li><Link to="/elevens/gwyr">Gwyr Team</Link></li>
        <li><Link to="/elevens/copr">Copr Team</Link></li>
        <li><Link to="/elevens/tawe">Tawe Team</Link></li>
      </ul>
    </div>
  );
}

export default Elevens;
