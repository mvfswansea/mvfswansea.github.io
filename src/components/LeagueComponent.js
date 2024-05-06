import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/components/leagueList.css';

const endpointUrl = "https://3u270eyft0.execute-api.eu-west-2.amazonaws.com/prod";
const leagueEndpoint = `${endpointUrl}/league`;

function LeagueComponent({ leagueName, leagueId }) {
    const [leagueData, setLeagueData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeagueData = async () => {
            try {
                const response = await fetch(`${leagueEndpoint}?leagueName=${encodeURIComponent(leagueName)}&leagueId=${encodeURIComponent(leagueId)}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch league data');
                }

                const data = await response.json();

                console.log('Data:', data);

                setLeagueData(data);

            } catch (error) {
                console.error('Error fetching league data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagueData();
    }, [leagueName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="league">
            <div className="league-header">
                <h2>{leagueData.league_name} League</h2>
                {/* <img src={leagueData.photoUrl} alt={leagueData.name} /> */}
            </div>
            <div className="team-container">
                <ul className="team-list">
                    {Object.values(leagueData.teams[0]).map((team) => (
                        <li key={team.name} className="team-item">
                            <Link to={`/team/${Object.keys(leagueData.teams[0]).find(key => leagueData.teams[0][key] === team)}`} className="team-link">
                                <div className="team-color-block" style={{backgroundColor: team.color }}></div>
                                {team.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default LeagueComponent;
