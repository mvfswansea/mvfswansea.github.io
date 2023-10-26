import React from 'react';
import LeagueTable from './LeagueTable';
import jsonLeagueData from '../data/league_data.json';

function LeagueCopr() {

  const leagueData = jsonLeagueData.leagues.find((league) => league.name === "Copr");

  if (!leagueData) {
    return <div>No league data available.</div>;
  }

  return (
    <div>
      <LeagueTable leagueData={leagueData} />
    </div>
  );
}

export default LeagueCopr;
