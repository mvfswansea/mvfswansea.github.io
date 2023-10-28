import React from 'react';
import Button from './Button';

import '../styles/css/components/home.css';

function Home() {
  return (
    <div>
      <h1> Welcome to MvF Swansea </h1>
      <div className='home-images'>
        <Button
          text="League"
          imageUrl="images/purefootball.jpg"
          to="#/leagues"
        />
        <Button
          text="Elevens"
          imageUrl="images/ynystawe.jpg"
          to="#/elevens"
        />
      </div>
    </div>
  );
}

export default Home;
