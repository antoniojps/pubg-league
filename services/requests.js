import axios from 'axios';
import queryString from 'query-string';

// config
const ax = axios.create({
  baseURL: process.env.API,
});

/**
 * gets multiple matches data and returns array of matches objects
 * @param {array} - [matchesIDs]
 * @param {boolean} - summary
 * @returns {promise}
 */
export const getMatches = async (matchesIdArr, summary = false) => {
  const queryObj = {
    matchId: matchesIdArr,
    summary,
  };
  const endpoint = `/match?${queryString.stringify(queryObj)}`;
  const matches = await ax.get(endpoint);
  return matches.data;
};
