import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/components/events.css';
import eventData from './eventData';

function Events() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to generate an array of days in the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const daysArray = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      daysArray.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(year, month, day));
    }
    return daysArray;
  };

  // Get the next upcoming event after the current date
  const getNextEvent = () => {
    return eventData
      .map(event => ({
        ...event,
        date: new Date(event.date) // Convert event date strings to Date objects
      }))
      .filter(event => event.date > currentDate) // Filter events that are after the current date
      .sort((a, b) => a.date - b.date)[0]; // Sort by date and pick the earliest one
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="calendar">
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <div className="days-of-week">
          {daysOfWeek.map((dayOfWeek, index) => (
            <div key={index} className="day-of-week">{dayOfWeek}</div>
          ))}
        </div>
        <div className="days">
          {daysInMonth.map((day, index) => {
            const formattedDay = day && day.getDate();
            const eventDataForDay = eventData.find(event => {
              const eventDate = new Date(event.date);
              return eventDate.getDate() === formattedDay &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear();
            });

            return (
              <div
                key={index}
                className={`day${formattedDay === new Date().getDate() ? ' current-day' : ''}`}
              >
                <div className="day-single">
                  {formattedDay}
                </div>
                {eventDataForDay && (
                  <Link to={`/events/${eventDataForDay.key}`}>
                    {eventDataForDay.eventName}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <h2> Next Event </h2>
        <div className="upcoming-events">
          {getNextEvent() ? (
            <div>
              <Link to={`/events/${getNextEvent().key}`}>
                <h3>{getNextEvent().eventName}</h3>
              </Link>
              <p>Date: {getNextEvent().date.toLocaleDateString()}</p>
              <p>Start Time: {getNextEvent().startTime}</p>
            </div>
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
      </div>
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div>
      <div className="calendar-navigation">
        <button onClick={goToPreviousMonth}>Previous Month</button>
        <button onClick={goToNextMonth}>Next Month</button>
      </div>
      {renderCalendar()}
    </div>
  );
}

export default Events;
