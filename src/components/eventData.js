// eventData.js

const eventData = [
    {
      "eventName": "Something Happening",
      "date": "2024-07-27",
      "info": "At 7:30"
    },
    {
      "eventName": "MVF Football",
      "date": "2024-07-30",
      "info": "Purefootball at 7:30"
    },
    
    // Currently cannot handle more than one event a day
    
    {
      "eventName": "Beer O Clock",
      "date": "2024-07-30",
      "info": "Purefootball at 8:30"
    },
    {
      "eventName": "Hungry Men",
      "date": "2024-07-29",
      "info": "All Day"
    },
    {
      "eventName": "MVF Football",
      "date": "2024-08-06",
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
  