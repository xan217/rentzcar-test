const HTTP = require('./http');

const api_url = 'https://api.football-data.org/v4/'

const getMatches = async (league = null, dateFrom, dateTo) => {
  if (!league) return [];  
  const url = `${api_url}competitions/${league}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
  
  let result = await HTTP.get(url);
  return result.data;
}

const getMatch = async (matchID) => {
  if (!matchID) return {};  
  const url = `${api_url}matches/${matchID}`;
  
  let result = await HTTP.get(url);
  return result.data;
}

module.exports = {
  getMatches,
  getMatch
}