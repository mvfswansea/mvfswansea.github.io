import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/css/components/matchResult.css';

const fixturesEndpoint = "https://3u270eyft0.execute-api.eu-west-2.amazonaws.com/prod/fixtures";

function MatchResult() {
    const { date, team1, team2 } = useParams();
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Derive leagueName and leagueId from the team name (team1)
    const leagueName = team1.slice(0, 4);
    const leagueId = leagueName === "Gwyr" ? 1 : leagueName === "Copr" ? 2 : null;

    useEffect(() => {
        if (!leagueId) {
            setError(new Error("Invalid league reference derived from team name."));
            setLoading(false);
            return;
        }

        const fetchMatchData = async () => {
            try {
                // Fetch match data for the given date and leagueId
                const response = await fetch(
                    `${fixturesEndpoint}?leagueId=${encodeURIComponent(leagueId)}&date=${date}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch match data");
                }

                const data = await response.json();
                // Store the fetched match data
                setMatchData(data.fixtures?.[date] || {});
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchData();
    }, [leagueId, date]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!matchData) {
        return <div>No match data available for the specified date.</div>;
    }

    // Extract team details for team1 and team2 from the fetched match data
    const team1Details = matchData[team1] || {};
    const team2Details = matchData[team2] || {};

    return (
        <div className="match-result">
            <div className="match-header">
                <h3>{date}</h3>
                <h2>{team1} VS {team2}</h2>
            </div>
            <div className="match-details">
                <div className="team-details">
                    <h4>{team1}</h4>
                    <p><strong>Pitch Result:</strong> {team1Details.pitchResult || "N/A"}</p>
                    <p><strong>Overall Result:</strong> {team1Details.overallResult || "N/A"}</p>
                    <p><strong>Scales MOTM:</strong> {team1Details.matchReport?.scalesMOTM || "N/A"}</p>
                    <p><strong>Pitch MOTM:</strong> {team1Details.matchReport?.pitchMOTM || "N/A"}</p>
                    <p><strong>Opponent MOTM:</strong> {team1Details.matchReport?.opponentMOTM || "N/A"}</p>
                    <p><strong>Scorers:</strong></p>
                    <ul>
                        {team1Details.matchReport?.scorers && team1Details.matchReport.scorers.length > 0 ? (
                            team1Details.matchReport.scorers.map((scorer, index) => (
                                <li key={index}>{scorer.name}: {scorer.goalsScored}</li>
                            ))
                        ) : (
                            <li>N/A</li>
                        )}
                    </ul>
                    <p><strong>Write-Up:</strong> {team1Details.matchReport?.writeUp || "N/A"}</p>
                </div>
                <div className="team-details">
                    <h4>{team2}</h4>
                    <p><strong>Pitch Result:</strong> {team2Details.pitchResult || "N/A"}</p>
                    <p><strong>Overall Result:</strong> {team2Details.overallResult || "N/A"}</p>
                    <p><strong>Scales MOTM:</strong> {team2Details.matchReport?.scalesMOTM || "N/A"}</p>
                    <p><strong>Pitch MOTM:</strong> {team2Details.matchReport?.pitchMOTM || "N/A"}</p>
                    <p><strong>Opponent MOTM:</strong> {team2Details.matchReport?.opponentMOTM || "N/A"}</p>
                    <p><strong>Scorers:</strong></p>
                    <p><strong>Scorers:</strong></p>
                    <ul>
                        {team2Details.matchReport?.scorers && team2Details.matchReport.scorers.length > 0 ? (
                            team2Details.matchReport.scorers.map((scorer, index) => (
                                <li key={index}>{scorer.name}: {scorer.goalsScored}</li>
                            ))
                        ) : (
                            <li>N/A</li>
                        )}
                    </ul>
                    <p><strong>Write-Up:</strong> {team2Details.matchReport?.writeUp || "N/A"}</p>
                </div>
            </div>
        </div>
    );
}

export default MatchResult;
