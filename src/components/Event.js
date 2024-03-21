// Event.js

import React from 'react';
import { useParams } from 'react-router-dom';
import eventData from './eventData';

function Event() {
    const { key } = useParams();

    // Look up the event data based on the unique key
    console.log('Event Data:', eventData);
    console.log('Key from URL:', key);
    const eventDataForEvent = eventData.find(event => event.key === key);
    console.log(eventDataForEvent);

    if (!eventDataForEvent) {
        return <div>Event not found</div>;
    }

    return (
        <div>
            <h2>{eventDataForEvent.eventName}</h2>
            <p>Date: {eventDataForEvent.date}</p>
            <p>Info: {eventDataForEvent.info}</p>
        </div>
    );
}

export default Event;
