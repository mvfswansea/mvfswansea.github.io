import React from 'react';
import Button from './Button';

function Elevens() {
  return (
    <div>
      <div>
        <h1> Welcome to MvF Swansea </h1>

        <div>
          <Button
            text="Gwyr"
            imageUrl="images/ynystawe.jpg"
            to="#/elevens/gwyr"
            imageWidth="900px"
            imageHeight="500px"
          />
        </div>

        {/* <div>
          <Button
            text="Tawe"
            imageUrl="images/teams/TaweTeam.jpeg"
            to="#/elevens/tawe"
            imageWidth="900px"
            imageHeight="500px"
          />
        </div> */}

        <div>
          <Button
            text="Copr"
            imageUrl="images/purefootball.jpg"
            to="#/elevens/copr"
            imageWidth="900px"
            imageHeight="500px"
          />
        </div>

      </div>
    </div>
  );
}

export default Elevens;
