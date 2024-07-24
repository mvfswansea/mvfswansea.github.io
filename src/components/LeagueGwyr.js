// import React, { useState, useEffect } from 'react';
// import { fetchLeagueData } from './aws';
// import LeaguesHome from './LeaguesHome';


// function LeagueGwyr() {
//   const [leagueData, setLeagueData] = useState(null);

//   useEffect(() => {
//     const fetchLeague = async () => {
//       try {
//         const data = await fetchLeagueData('2');
//         setLeagueData(data);
//       } catch (error) {
//         console.error('Error fetching league data:', error);
//       }
//     };

//     fetchLeague();
//   }, []);

//   if (!leagueData) {
//     return <div>No league data available.</div>;
//   }

//   return <LeaguesHome leagueData={leagueData} />;
// }

// export default LeagueGwyr;
