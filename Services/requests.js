const HTTP = require('./http');

const getMatches = async (league = null, dateFrom, dateTo) => {
  if (!league) return [];  
  const url = `https://api.football-data.org/v4/competitions/${league}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`
  
  let result = await HTTP.get(url);
  return result.data;
}

const getLeagues = () => {
  return {
    'BL1' : {id: 2088, name: 'Bundesliga'},
    'DED' : {id: 2016, name: 'Eredivisie'},
    'BSA' : {id: 2032, name: 'Campeonato Brasileiro Série A'},
    'PD'  : {id: 2224, name: 'Primera Division'},
    'FL1' : {id: 2255, name: 'Ligue 1'},
    'PPL' : {id: 2187, name: 'Primeira Liga'},
    'EC'  : {id: 2077, name: 'European Championship'},
    'SA'  : {id: 2114, name: 'Serie A'},
    'PL'  : {id: 2072, name: 'Premier League'},
  };
}

module.exports = {
  getMatches,
  getLeagues
}