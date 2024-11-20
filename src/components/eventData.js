
// Currently cannot handle more than one event a day

const eventData = [
  // All season 11 game weeks first
  {
    "eventName": "MVF Football S11W1",
    "date": "2024-10-22",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W2",
    "date": "2024-10-29",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W3",
    "date": "2024-11-05",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W4",
    "date": "2024-11-12",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W5",
    "date": "2024-11-19",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W6",
    "date": "2024-11-26",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W7",
    "date": "2024-12-03",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W8",
    "date": "2024-12-10",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W9",
    "date": "2024-12-17",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W10",
    "date": "2025-01-07",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W11",
    "date": "2025-01-14",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W12",
    "date": "2025-01-21",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W13",
    "date": "2025-01-28",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
  {
    "eventName": "MVF Football S11W14",
    "date": "2025-02-04",
    "info": "Purefootball at 19:30",
    "startTime": "19:30"
  },
// End of Season 11 gameweeks
  {
    "eventName": "Good Food Club - The Cow Shed",
    "date": "2024-11-22",
    "info": "The Cow Shed in Clydach at 18:30",
    "startTime": "18:30"
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
