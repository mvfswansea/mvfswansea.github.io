import React from 'react';

function NextRoundFixtures({ leagueData }) {
  const nextRoundFixtures = leagueData.nextRoundFixtures; // Assuming this data exists in your leagueData object

  return (
    <div>
      <h2>Next Round Fixtures</h2>
      <ul>
        {nextRoundFixtures.map((fixture, index) => (
          <li key={index}>
            {fixture.homeTeam} vs {fixture.awayTeam}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NextRoundFixtures;
