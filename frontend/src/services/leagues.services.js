import { Request } from './http.service';

/**
 * getLeagues
 * Retrieve the list of available leagues to request the matches
 *    
 * @returns object
 */
async function getLeagues ( ) {
  try {
    let response = await Request(`leagues/all`);
    if(response.status === 200) {
      response = await response.json();
    }
    return response;
  } catch (err) {
    console.error(`Error en al obtener la lista de ligas: ${ err.message }`);
    return {};
  }
}

export const LeaguesServices = {
  getLeagues
}