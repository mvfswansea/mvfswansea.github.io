import React from 'react';
import { useParams } from 'react-router-dom';
import jsonLeagueData from '../data/league_data.json';

function PlayerProfile() {
    const { playerName, leagueName } = useParams();
    const decodedName = decodeURIComponent(playerName);
    const decodedLeague = decodeURIComponent(leagueName);

    let playerProfile;
    const league = jsonLeagueData.leagues.find(l => l.name.toLowerCase() === decodedLeague.toLowerCase());

    if (league) {
        league.teams.forEach(team => {
            // 'team' is an object with the team name as the key
            Object.keys(team).forEach(teamName => {
                const teamData = team[teamName];
                // Assuming the second element of this array contains the players
                const players = teamData[1]?.players;
                if (players) {
                    const player = Object.values(players).find(p => p.name === decodedName);
                    if (player) {
                        playerProfile = player.profile;
                    }
                }
            });
        });
    }

    if (!playerProfile) {
        return <div>No profile data available for {decodedName} in the {decodedLeague} league.</div>;
    }

    return (
        <div>
            <h1>{decodedName}'s Profile</h1>
            <p>Test Data: {playerProfile.test}</p>

            {/* 
            Photo
            Before/Now?
            Since Started
            Hobbies
            Other Stuff
             */}


            {/* Add more details from the playerProfile object as needed */}

        </div>
    );
}

export default PlayerProfile;