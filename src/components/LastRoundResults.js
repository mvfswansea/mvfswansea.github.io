import React from 'react';

function LastRoundResults({ leagueData }) {
  const lastRoundResults = leagueData.lastRoundResults; // Assuming this data exists in your leagueData object

  return (
    <div>
      <h2>Last Round Results</h2>
      <ul>
        {lastRoundResults.map((result, index) => (
          <li key={index}>
            {result.homeTeam} {result.homeScore} - {result.awayScore} {result.awayTeam}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LastRoundResults;
