import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/css/components/leagueTable.css';

function LeagueTable({ leagueData, lastRoundResults, nextRoundFixtures, topGoalscorers }) {
    const [selectedLeague, setSelectedLeague] = useState('combined');

    const handleTabClick = (league) => {
        setSelectedLeague(league);
    };

    if (!leagueData) {
        return <div>No league data available.</div>;
    }

    const teams = Object.keys(leagueData.teams[0]).map((teamName) => {
        const team = leagueData.teams[0][teamName][0];
        if (team && team[selectedLeague]) {
            const data = team[selectedLeague];
            data.goalDifference = data.goalsFor - data.goalsAgainst;
            data.points = data.wins * 2 + data.draws;
            return {
                name: teamName,
                data,
            };
        }
        return null;
    });

    // Remove any null entries
    const filteredTeams = teams.filter((team) => team);

    // Sort the teams based on various criteria
    filteredTeams.sort((a, b) => {
        if (a.data.points === b.data.points) {
            if (a.data.goalDifference === b.data.goalDifference) {
                if (a.data.goalsFor === b.data.goalsFor) {
                    if (a.data.goalsAgainst === b.data.goalsAgainst) {
                        if (a.data.wins === b.data.wins) {
                            // If wins are the same, sort by losses in ascending order
                            return a.data.losses - b.data.losses;
                        }
                        // Sort by wins in descending order
                        return b.data.wins - a.data.wins;
                    }
                    // Sort by goalsAgainst in ascending order
                    return a.data.goalsAgainst - b.data.goalsAgainst;
                }
                // Sort by goalsFor in descending order
                return b.data.goalsFor - a.data.goalsFor;
            }
            // Sort by goalDifference in descending order
            return b.data.goalDifference - a.data.goalDifference;
        }
        // Sort by points in descending order
        return b.data.points - a.data.points;
    });

    // Return the html code
    return (
        <div className="league-table-container">
            <div className="league-table">
                <h2>
                    <div className="tab">
                        <button className={`tablinks ${selectedLeague === 'combined' && 'active'}`} onClick={() => handleTabClick('combined')}>Combined League</button>
                        <button className={`tablinks ${selectedLeague === 'pitch' && 'active'}`} onClick={() => handleTabClick('pitch')}>Pitch League</button>
                        <button className={`tablinks ${selectedLeague === 'scales' && 'active'}`} onClick={() => handleTabClick('scales')}>Scales League</button>
                    </div>
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>P</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>F</th>
                            <th>A</th>
                            <th>GD</th>
                            <th>PTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.map((team, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/leagues/team/${team.name}`}>{team.name}</Link>
                                </td>
                                <td>{team.data.matchesPlayed}</td>
                                <td>{team.data.wins}</td>
                                <td>{team.data.draws}</td>
                                <td>{team.data.losses}</td>
                                <td>{team.data.goalsFor}</td>
                                <td>{team.data.goalsAgainst}</td>
                                <td>{team.data.goalDifference}</td>
                                <td>{team.data.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div>
                    {/* Display Last Round Results */}
                    <h2>Last Round Results</h2>
                    <ul>
                        {lastRoundResults.map((result, index) => (
                            <li key={index}>
                                {result.homeTeam} {result.homeScore} - {result.awayScore} {result.awayTeam}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    {/* Display Next Round Fixtures */}
                    <h2>Next Round Fixtures</h2>
                    <ul>
                        {nextRoundFixtures.map((fixture, index) => (
                            <li key={index}>
                                {fixture.homeTeam} vs {fixture.awayTeam}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    {/* Display Top Goalscorers */}
                    <h2>Top Goalscorers</h2>
                    <ol>
                        {topGoalscorers.map((player, index) => (
                            <li key={index}>
                                {player.name} - {player.goals} goals
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default LeagueTable;
