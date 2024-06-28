import React from 'react';
import LeagueTable from './LeagueTable';
import LastRoundResults from './LastRoundResults';
import NextRoundFixtures from './NextRoundFixtures';
import TopGoalscorers from './TopGoalscorers';

function Home({ leagueData }) {
  return (
    <div>
      <LeagueTable leagueData={leagueData} />
      <LastRoundResults leagueData={leagueData} />
      <NextRoundFixtures leagueData={leagueData} />
      <TopGoalscorers leagueData={leagueData} />
    </div>
  );
}

export default Home;
