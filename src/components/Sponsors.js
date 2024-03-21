import React from 'react';
import sponsors from './sponsorsData';
import '../styles/css/components/sponsors.css';

function Sponsors() {

  return (
    <div className="sponsors">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="sponsor">
          <img src={sponsor.imageUrl} alt={sponsor.title} className="sponsor-image" />
          <div className="sponsor-details">
            <h3 className="sponsor-title">{sponsor.title}</h3>
            <p className="sponsor-description">{sponsor.description}</p>
            <a href={sponsor.link} className="sponsor-link">
              Visit Website
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sponsors;
