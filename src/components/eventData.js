// eventData.js

const eventData = [
    {
      "eventName": "Quiz Night",
      "date": "2024-03-20",
      "info": "Deers Leap at 7:30"
    },
    {
      "eventName": "Quiz Night",
      "date": "2024-04-20",
      "info": "Deers Leap at 7:30"
    },
    {
      "eventName": "Quiz Night",
      "date": "2024-05-10",
      "info": "Deers Leap at 7:30"
    },
    {
      "eventName": "Quiz Night",
      "date": "2024-05-20",
      "info": "Deers Leap at 7:30"
    },
    // Add other event data...
  ];
  
  // Add a unique key for each event by combining the event name with the date
  eventData.forEach(event => {
    const dateParts = event.date.split('-'); // Split date into day, month, and year
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    event.key = `${event.eventName.toLowerCase().replace(/\s+/g, '-')}-${year}-${month}-${day}`;
  });
  
  export default eventData;
  