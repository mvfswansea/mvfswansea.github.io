// // aws.js

// import AWS from 'aws-sdk';

// // Initialize AWS SDK with environment variables
// AWS.config.update({
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   region: 'eu-west-2'
// });

// const dynamodb = new AWS.DynamoDB.DocumentClient();

// export const fetchLeagueData = async (leagueId) => {
//   try {
//     const params = {
//       TableName: 'Leagues',
//       Key: {
//         id: leagueId
//       }
//     };

//     const data = await dynamodb.get(params).promise();
//     return data.Item;
//   } catch (error) {
//     console.error('Error fetching league data:', error);
//     throw error;
//   }
// };

// export const fetchTeamData = async (teamId) => {
//   try {
//     const params = {
//       TableName: 'Teams',
//       Key: {
//         teamId: teamId // Assuming teamId is the primary key attribute
//       }
//     };

//     const data = await dynamodb.get(params).promise();
//     return data.Item;
//   } catch (error) {
//     console.error('Error fetching team data:', error);
//     throw error;
//   }
// };

// export const fetchPlayerData = async (playerId) => {
//   try {
//     const params = {
//       TableName: 'Players',
//       Key: {
//         playerId: playerId // Assuming playerId is the primary key attribute
//       }
//     };

//     const data = await dynamodb.get(params).promise();
//     return data.Item;
//   } catch (error) {
//     console.error('Error fetching player data:', error);
//     throw error;
//   }
// };
