import React from 'react';
import Button from './Button';

function Home() {
  return (
    <div>
      <h1> Welcome to MvF Swansea </h1>

      <Button
        text="Elevens"
        imageUrl="images/ynystawe.jpg"
        to="/elevens"
        imageWidth="900px"
        imageHeight="500px"
      />

      <Button
        text="League"
        imageUrl="images/purefootball.jpg"
        to="/leagues"
        imageWidth="900px"
        imageHeight="500px"
      />

    </div>
  );
}

export default Home;
