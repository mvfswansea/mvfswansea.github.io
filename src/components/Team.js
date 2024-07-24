import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/components/teams.css';

const endpointUrl = "https://3u270eyft0.execute-api.eu-west-2.amazonaws.com/prod";
const teamEndpoint = `${endpointUrl}/team`;

function Team({ teamName, leagueName }) {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Team Data
        const teamResponse = await fetch(`${teamEndpoint}?teamName=${encodeURIComponent(teamName)}`);
        if (!teamResponse.ok) {
          throw new Error('Failed to fetch team data');
        }
        const teamJson = await teamResponse.json();
        setTeamData(teamJson);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [teamName, leagueName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teamData) {
    return <div>No data available.</div>;
  }

  // Find the captain
  const captain = teamData.find(player => player.isCaptain) || null;
  const viceCaptain = teamData.find(player => player.isViceCaptain) || null;

  // Find the other players
  const otherPlayers = teamData
    .filter(player => player.isActive && player.name && !player.isCaptain && !player.isViceCaptain)
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(otherPlayers);
  let captainData = null;

  if (!captain && !viceCaptain) {
    captainData =
      <>
        <p>No Captain</p>
        <p>No Vice Captain</p>
      </>
  } else if (captain && !viceCaptain) {
    captainData =
      <>
        <p>Captain <br /> Name: <Link to={`/player/${captain.id}`}>{captain.name}</Link> <br /> Age: {captain.age}</p>
        <p>No Vice Captain</p>
      </>
  } else if (!captain && viceCaptain) {
    captainData =
      <>
        <p>No Captain</p>
        <p>Vice Captain <br /> Name: <Link to={`/player/${viceCaptain.id}`}>{viceCaptain.name}</Link> <br /> Age: {viceCaptain.age}</p>
      </>
  } else {
    captainData =
      <>
        <p>Captain <br /> Name: <Link to={`/player/${captain.id}`}>{captain.name}</Link> <br /> Age: {captain.age}</p>
        <p>Vice Captain <br /> Name: <Link to={`/player/${viceCaptain.id}`}>{viceCaptain.name}</Link> <br /> Age: {viceCaptain.age}</p>
      </>
  }

  return (
    <div className='teamContainer'>
      <h1>{teamName}</h1>
      <h2>Team Members:</h2>
      <div className='captainsContainer'>
        {captainData}
      </div>
      <div className='players'>
        {otherPlayers.map(player => (
          <div key={player.id} className='player'>
            <p>Name: <Link to={`/player/${player.id}`}>{player.name}</Link></p>
            <p>Age: {player.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
