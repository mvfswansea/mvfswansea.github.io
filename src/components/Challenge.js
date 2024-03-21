import React from 'react';
import challenges from './challengesData';
import '../styles/css/components/challenges.css';

function Challenges() {

  return (
    <div className="challenges">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="challenge">
          <img src={challenge.imageUrl} alt={challenge.title} className="challenge-image" />
          <div className="challenge-details">
            <h3 className="challenge-title">{challenge.title}</h3>
            <p className="challenge-description">{challenge.description}</p>
            <a href={challenge.link} className="challenge-link">
              Visit Website
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Challenges;
