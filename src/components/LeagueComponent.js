import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/components/leagueList.css';

const endpointUrl = "https://3u270eyft0.execute-api.eu-west-2.amazonaws.com/prod";
const leagueEndpoint = `${endpointUrl}/league`;
const fixturesEndpoint = `${endpointUrl}/fixtures`;

function LeagueComponent({ leagueName, leagueId }) {
    const [leagueData, setLeagueData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [latestResult, setLatestResult] = useState(null);
    const [nextFixture, setNextFixture] = useState(null);

    useEffect(() => {
        const fetchLeagueAndFixtures = async () => {
            try {
                // Fetch League data
                const leagueResponse = await fetch(`${leagueEndpoint}?leagueName=${encodeURIComponent(leagueName)}&leagueId=${encodeURIComponent(leagueId)}`);
                if (!leagueResponse.ok) {
                    throw new Error('Failed to fetch league data');
                }

                const leagueData = await leagueResponse.json();
                if (leagueData && leagueData.teams && leagueData.teams.length > 0) {
                    setLeagueData(leagueData);
                } else {
                    throw new Error("Invalid league data structure received from API");
                }

                // Get the previous and next Tuesdays
                const { previousTuesday, nextTuesday } = getPreviousAndNextTuesdays();

                // Fetch Fixtures data for both dates
                const previousFixturesResponse = await fetch(`${fixturesEndpoint}?leagueId=${encodeURIComponent(leagueId)}&date=${previousTuesday}`);
                const nextFixturesResponse = await fetch(`${fixturesEndpoint}?leagueId=${encodeURIComponent(leagueId)}&date=${nextTuesday}`);

                // Check responses
                if (!previousFixturesResponse.ok || !nextFixturesResponse.ok) {
                    throw new Error('Failed to fetch fixtures data');
                }

                // Parse fixtures data
                const previousFixturesData = await previousFixturesResponse.json();
                const nextFixturesData = await nextFixturesResponse.json();

                // console.log(previousFixturesData);
                // console.log(nextFixturesData);

                // Combine fixtures
                const allFixtures = {
                    ...(previousFixturesData?.fixtures || {}),
                    ...(nextFixturesData?.fixtures || {})
                };

                // Process fixtures for latest result and next fixture
                const sortedFixtures = Object.entries(allFixtures || {}).sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));

                if (sortedFixtures.length > 0) {
                    const todayDate = new Date();
                    let latest = null;
                    let next = null;

                    sortedFixtures.forEach(([date, fixture]) => {
                        const fixtureDate = new Date(date);

                        if (fixtureDate < todayDate) {
                            latest = { date, ...fixture };
                        } else if (fixtureDate >= todayDate && !next) {
                            next = { date, ...fixture };
                        } else {
                            throw new Error("Unable to work out fixtures");
                        }
                    });

                    setLatestResult(latest);
                    setNextFixture(next);
                } else {
                    throw new Error("No fixtures found for this league");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagueAndFixtures();
    }, [leagueName, leagueId]);

    // Function to get the previous and next Tuesdays
    const getPreviousAndNextTuesdays = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // Sunday - Saturday : 0 - 6
        const daysUntilTuesday = (2 - dayOfWeek + 7) % 7; // Days until next Tuesday
        const previousTuesday = new Date(today);
        previousTuesday.setDate(today.getDate() - (dayOfWeek < 2 ? (7 + dayOfWeek - 2) : (dayOfWeek - 2))); // Calculate previous Tuesday

        const nextTuesday = new Date(today);
        nextTuesday.setDate(today.getDate() + (daysUntilTuesday === 0 ? 7 : daysUntilTuesday)); // Calculate next Tuesday

        return {
            previousTuesday: previousTuesday.toISOString().split('T')[0], // Format as YYYY-MM-DD
            nextTuesday: nextTuesday.toISOString().split('T')[0] // Format as YYYY-MM-DD
        };
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="league">
            <div className="league-header">
                <h2>{leagueData?.league_name} League</h2>
            </div>

            <div className="team-container">
                <ul className="team-list">
                    {leagueData?.teams && leagueData.teams[0] ? (
                        Object.values(leagueData.teams[0]).map((team) => (
                            <li key={team.name} className="team-item">
                                <Link to={`/leagues/team/${Object.keys(leagueData.teams[0]).find(key => leagueData.teams[0][key] === team)}`} className="team-link">
                                    <div className="team-color-block" style={{ backgroundColor: team.color }}></div>
                                    {team.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>No teams available.</li>
                    )}
                </ul>
            </div>

            <div className="fixtures">
                <div className="latest-results">
                    <h3>Latest Results</h3>
                    {latestResult ? (
                        <div className="latest-results-teams">
                            {Object.entries(latestResult).map(([team, details], index, entries) => {
                                // Skip the `date` key and ensure we only handle teams with opposition details
                                if (team === "date" || !details.opposition) return null;

                                // Ensure each match is only displayed once by checking team names
                                const isDisplayed = entries.findIndex(([key]) => key === details.opposition) < index;

                                if (isDisplayed) return null;

                                return (
                                    <li key={team}>
                                        <Link to={`/leagues/team/${team}`} className="team-link"> {leagueData.teams[0][team].name} </Link>

                                        <span className="latest-results-text">
                                            {details.played ? (
                                                details.pitchResult ? (
                                                    <Link
                                                        to={`/results/${latestResult.date}/${team}/${details.opposition}`}>
                                                        {details.pitchResult}
                                                    </Link>
                                                ) : 'TBA'
                                            ) : 'TBA'}
                                        </span>

                                        <Link to={`/leagues/team/${details.opposition}`} className="team-link"> {leagueData.teams[0][details.opposition]?.name} </Link>
                                    </li>
                                );
                            })}
                        </div>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>

                <div className="next-fixtures">
                    <h3>Next Fixture</h3>
                    {nextFixture ? (
                        <div className="next-fixtures-teams">
                            {Object.entries(nextFixture).map(([team, details], index, entries) => {
                                // Skip the `date` key and ensure we only handle teams with opposition details
                                if (team === "date" || !details.opposition) return null;

                                // Ensure each fixture is only displayed once by checking team names
                                const isDisplayed = entries.findIndex(([key]) => key === details.opposition) < index;

                                if (isDisplayed) return null;

                                return (
                                    <li key={team}>
                                        <Link to={`/leagues/team/${team}`} className="team-link"> {leagueData.teams[0][team].name} </Link>
                                        <span className="next-fixtures-text"> VS </span>
                                        <Link to={`/leagues/team/${details.opposition}`} className="team-link"> {leagueData.teams[0][details.opposition]?.name} </Link>
                                    </li>
                                );
                            })}
                        </div>
                    ) : (
                        <p>No upcoming fixtures.</p>
                    )}
                </div>
            </div>



        </div>
    );
}

export default LeagueComponent;
