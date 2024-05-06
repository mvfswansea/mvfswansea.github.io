import React from 'react';

function TopGoalscorers({ leagueData }) {
  const topGoalscorers = leagueData.topGoalscorers; // Assuming this data exists in your leagueData object

  return (
    <div>
      <h2>Top Goalscorers</h2>
      <ol>
        {topGoalscorers.map((player, index) => (
          <li key={index}>
            {player.name} - {player.goals} goals
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TopGoalscorers;
