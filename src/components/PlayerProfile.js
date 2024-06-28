import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const endpointUrl = "https://3u270eyft0.execute-api.eu-west-2.amazonaws.com/prod";
const playerEndpoint = `${endpointUrl}/player`;

function PlayerProfile() {
    const { id } = useParams();
    const [playerProfile, setPlayerProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                setLoading(true);

                console.log(id);

                const response = await fetch(`${playerEndpoint}?playerId=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch player data');
                }

                const data = await response.json();
                setPlayerProfile(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching player data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPlayerData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!playerProfile) {
        return <div>No profile data available for this player.</div>;
    }

    return (
        <div>
            <h1>{playerProfile.name}'s Profile</h1>
            <p>Age: {playerProfile.age}</p>
            <p>Hometown: {playerProfile.profile.hometown}</p>
            <p>Career: {playerProfile.profile.career}</p>
            <p>Favourite Food: {playerProfile.profile.favouriteFood}</p>
            <p>Favourite Team: {playerProfile.profile.favouriteTeam}</p>
            <p>Hobbies: {playerProfile.profile.hobbies}</p>
            <p>Joining Reason: {playerProfile.profile.joiningReason}</p>

            {/* Add more details from the playerProfile object as needed */}
        </div>
    );
}

export default PlayerProfile;
