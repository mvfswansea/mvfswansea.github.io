import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/css/components/events.css';
import eventData from './eventData'; // Import the event data

function Events() {
  // Initialize state for the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to generate an array of days in the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

    const daysArray = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      daysArray.push(null); // Add null for empty cells before the first day of the month
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(year, month, day));
    }
    return daysArray;
  };

  // Function to render the calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);

    // Array of days of the week
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
              const eventDate = event.date.split('-');
              const eventDay = parseInt(eventDate[2], 10); // Assuming day is the last part of the date string
              return eventDay === formattedDay;
            });

            return (
              <div
                key={index}
                className={`day${formattedDay === new Date().getDate() ? ' current-day' : ''}`}
              >
                {formattedDay}
                {eventDataForDay && (
                  <Link to={`/events/${eventDataForDay.key}`}>
                    {eventDataForDay.eventName}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Function to navigate to the next month
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
