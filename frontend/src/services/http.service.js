/**
 * Request.
 * All request should pass over this method. This will add the authentication token in the headers
 * and prepend the endpoint of the service.
 * 
 * @param {string} method GET/POST/PUSH/PUT/UPDATE/DELETE.
 * @param {string} endpoint api endpoint.
 * @param {object} [data = {}] if method is GET it will be part of the querystring.
 * @param {string} [type = null] content type if it must be different from application/json.
 * 
 * @returns {object} serverResponse or json object. Depends of parsed.
 */
export const Request = async (endpoint = '') => {

  if(endpoint === '') {
      return null;
  }

  const API = 'http://127.0.0.1:3010/';

  const response = await fetch(API + endpoint);

  return response;
};
