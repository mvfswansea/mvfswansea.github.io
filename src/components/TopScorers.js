import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TopScorers() {
    const [topScorers, setTopScorers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract leagueId from the URL query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const leagueId = queryParams.get('leagueId');

    useEffect(() => {
        const fetchTopScorers = async () => {
            try {
                const response = await fetch(`https://3u270eyft0.execute-api.eu-west-2.amazonaws.com/prod/top-scorers?leagueId=${leagueId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch top scorers');
                }

                const data = await response.json();

                // Ensure the data is valid and has top scorers
                if (Array.isArray(data) && data.length > 0) {
                    setTopScorers(data);  // Set top scorers directly
                } else {
                    setTopScorers([]);  // Set empty array if no scorers found
                }
            } catch (err) {
                setError(err.message);  // Set error message
            } finally {
                setLoading(false);  // Set loading state to false once done
            }
        };

        fetchTopScorers();
    }, [leagueId]);  // Effect runs when leagueId changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="top-scorers">
            <h1>Top Scorers {leagueId === '1' ? 'Gwyr' : 'Copr'}</h1>
            <ul>
                {topScorers && topScorers.length > 0 ? (
                    topScorers.map((scorer, index) => (
                        <li key={index}>
                            <strong>{scorer.name}</strong> - {scorer.goals} goals ({scorer.team})
                        </li>
                    ))
                ) : (
                    <li>No top scorers found</li>
                )}
            </ul>
        </div>
    );
}

export default TopScorers;
