import { Request } from './http.service';

/**
 * getMatches
 * Retrieve the list of matches for the selected period time
 *    
 * @returns object
 */
async function getMatches ( period, league ) {
  try {
    let response = await Request(`matches/${ period }/${ league }`);  
    if( response.status === 200 ){  
      response = await response.json();
      return response;
    }
    return [];
  } catch (err) {
    console.error(`Error en al obtener la lista de partidos: ${ err.message }`);
    return {};
  }
}

/**
 * getMatch
 * Retrieve the full data for the selected match
 *    
 * @returns object
 */
async function getMatch ( id ) {
  try {
    let response = await Request(`matches/full/${ id }`);  
    if( response.status === 200 ){  
      response = await response.json();
      return response;
    }
    return [];
  } catch (err) {
    console.error(`Error en al obtener los detalles del partido: ${ err.message }`);
    return {};
  }
}

export const MatchesServices = {
  getMatches,
  getMatch
}