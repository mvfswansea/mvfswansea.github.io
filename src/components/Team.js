import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/components/teams.css';
import jsonLeagueData from '../data/league_data.json';

function Team({ teamName, leagueName }) {
  const league = jsonLeagueData.leagues.find((league) => league.name === leagueName);
  if (!league) {
    return <div>No league data available.</div>;
  }

  const teamData = league?.teams.find((team) => team.hasOwnProperty(teamName));
  if (!teamData) {
    return <div>No team data available.</div>;
  }

  const teamPlayerData = teamData[teamName][1].players;
  if (!teamPlayerData) {
    return <div>No player data available.</div>;
  }

  let captainData = null;

  const captain = Object.values(teamPlayerData).find((player) => player.isCaptain) || null;
  const viceCaptain = Object.values(teamPlayerData).find((player) => player.isViceCaptain) || null;

  const otherPlayers = Object.values(teamPlayerData)
    .filter(player => player && player.isActive && player.name && !player.isCaptain && !player.isViceCaptain)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!captain && !viceCaptain) {
    captainData =
      <>
        <p>
          No Captain
        </p>
        <p>
          No Vice Captain
        </p>
      </>
  } else if (captain && !viceCaptain) {
    captainData =
      <>
        <p>
          Captain <br />
          Name: {captain.name} <br />
          Age: {captain.age} <br />
          Skill: {captain.skill}
        </p>
        <p>
          No Vice Captain
        </p>
      </>
  } else if (!captain && viceCaptain) {
    captainData =
      <>
        <p>
          No Captain
        </p>
        <p>
          Vice Captain <br />
          Name: {viceCaptain.name} <br />
          Age: {viceCaptain.age} <br />
          Skill: {viceCaptain.skill}
        </p>
      </>
  } else {
    captainData =
      <>
        <p>
          Captain <br />
          Name: {captain.name} <br />
          Age: {captain.age} <br />
          Skill: {captain.skill}
        </p>
        <p>
          Vice Captain <br />
          Name: {viceCaptain.name} <br />
          Age: {viceCaptain.age} <br />
          Skill: {viceCaptain.skill}
        </p>
      </>
  }

  // Main component return
  return (
    <div className='team-main'>
      <h2> {teamName} Team Page </h2>
      <div className='team-captains'>
        {captainData}
      </div>
      <div className='team-players'>
        <ul>
          {otherPlayers.map((player, index) => (
            <li key={index}>
              {player.name} <br />
              Age: {player.age} <br />
              Skill: {player.skill}
              {/* Conditionally display link if player.profile exists */}
              {player.profile && (
                <Link to={`/player/${encodeURIComponent(leagueName)}/${encodeURIComponent(player.name)}`}>
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

export default Team;
