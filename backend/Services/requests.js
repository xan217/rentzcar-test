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

const getLeagues = async () => {
  
  const leagues = [
    {id: 2267, name: "FIFA World Cup",                  code: "WC"},
    {id: 2077, name: "UEFA Champions League",           code: "CL"},
    {id: 2088, name: "Bundesliga",                      code: "BL1"},
    {id: 2163, name: "Eredivisie",                      code: "DED"},
    {id: 2032, name: "Campeonato Brasileiro Série A",   code: "BSA"},
    {id: 2224, name: "Primera Division",                code: "PD"},
    {id: 2081, name: "Ligue 1",                         code: "FL1"},
    {id: 2092, name: "Championship",                    code: "ELC"},
    {id: 2187, name: "Primeira Liga",                   code: "PPL"},
    //{id: 2077, name: "European Championship",           code: "EC"},
    {id: 2114, name: "Serie A",                         code: "SA"},
    {id: 2072, name: "Premier League",                  code: "PL"},
    {id: 2159, name: "Copa Libertadores",               code: "SCLIA"}
  ];

  return leagues;
}

module.exports = {
  getMatches,
  getMatch,
  getLeagues
}