import React from 'react';
import Button from './Button';
import LeagueComponent from './LeagueComponent';

import '../styles/css/components/home.css';

// For Hero of the week, create a function that finds all of the values within the data set
// Possibly change/remove this in favour of team of the week options in the league page?

function Home() {
  return (
    <div>
      <h1> Welcome to MvF Swansea </h1>
      <div className='home-leagues'>
        <LeagueComponent
          leagueName="Gwyr"
          leagueId="1"
        />
        <LeagueComponent
          leagueName="Copr"
          leagueId="2"
        />
      </div>
      <div className='home-images'>
        <Button
          text="League"
          imageUrl="images/LeagueArt.png"
          to="#/leagues"
        />
        <Button
          text="Elevens"
          imageUrl="images/ElevensArt.png"
          to="#/elevens"
        />
      </div>

    </div>
  );
}

export default Home;
