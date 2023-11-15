import React from 'react';
import { Link } from 'react-router-dom';
import jsonLeagueData from '../data/league_data.json';

function TeamOfTheWeek() {
    const allPlayersTOTW = [];

    jsonLeagueData.leagues.forEach(league => {
        league.teams.forEach(team => {
            Object.values(team).forEach(teamData => {
                Object.values(teamData).forEach(data => {
                    if (data.players) {
                        Object.values(data.players).forEach(player => {
                            if (player.isHero || player.isTOTW) {
                                allPlayersTOTW.push(player);
                            }
                        });
                    }
                });
            });
        });
    });

    console.log(allPlayersTOTW)

    // Filter players for Team of the Week or Heroes, excluding private profiles
    const teamOfTheWeekPlayers = allPlayersTOTW.filter(player =>
        (player.isHero || player.isTOTW) && !player.isPrivate
    );

    // Sort players by name
    teamOfTheWeekPlayers.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='totw-main'>
            <h2>Team of the Week</h2>
            <div className='totw-players'>
                <ul>
                    {teamOfTheWeekPlayers.map((player, index) => (
                        <li key={index}>
                            {player.name} <br />

                            {/* Link to player profile */}
                            {player.profile && (
                                <Link to={`/player/${encodeURIComponent(player.name)}`}>
                                    <br /> View Profile
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TeamOfTheWeek;
