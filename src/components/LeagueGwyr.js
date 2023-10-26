import React from 'react';
import LeagueTable from './LeagueTable';
import jsonLeagueData from '../data/league_data.json';

function LeagueGwyr() {

  const leagueData = jsonLeagueData.leagues.find((league) => league.name === "Gwyr");

  if (!leagueData) {
    return <div>No league data available.</div>;
  }

  return (
    <div>
      <LeagueTable leagueData={leagueData} />
    </div>
  );
}

export default LeagueGwyr;
