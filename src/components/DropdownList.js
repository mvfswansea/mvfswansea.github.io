import React, { useState } from 'react';
import jsonLeagueData from '../data/league_data.json';
import { Link } from 'react-router-dom';

function DropdownList() {
    const [selectedValue, setSelectedValue] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const getDropdownOptions = () => {
        const options = [];
        options.push(
            <option key="default" value="">
                --- Select a Team ---
            </option>
        );

        jsonLeagueData.leagues.forEach((league) => {
            options.push(
                <optgroup key={league.name} label={league.name}>
                    {league.teams.map((teamObj, index) => {
                        // Loop through teams within the league and extract team names
                        const teamNames = Object.keys(teamObj);
                        return teamNames.map((teamName) => (
                            <option key={`${league.name}-${teamName}-${index}`} value={teamName}>
                                - {teamName} -
                            </option>
                        ));
                    })}
                </optgroup>
            );
        });

        return options;
    };


    return (
        <div className='dropdown-widget'>
            <div className='dropdown-list'>
                <select value={selectedValue} onChange={handleDropdownChange} className='dropdown-list-inside'>
                    {getDropdownOptions()}
                </select>
            </div>
            <div className='dropdown-button'>
                {selectedValue && (
                    <Link to={`/leagues/team/${selectedValue}`}>
                        <button>Go to Team Page</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default DropdownList;
