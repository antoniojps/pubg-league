import axios from 'axios';

// config
const ax = axios.create({
  baseURL: 'https://api.playbattlegrounds.com/shards/',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${process.env.PUBG_APIKEY}`,
    Accept: 'application/vnd.api+json',
    'Accept-Encoding': 'gzip',
  },
});

/**
 * gets player matches
 * @param {string} - player name - case sensitive
 * @param {string} - platform-server (pc-eu/pc-na...)
 * @returns {promise}
 */
async function getPlayerMatches(player, shards = 'steam') {
  const url = `${encodeURI(shards)}/players?filter[playerNames]=${encodeURI(
    player,
  )}`;
  const playerMatches = await ax.get(url);
  return playerMatches.data;
}

/**
 * gets match data
 * @param {string} - match id
 * @param {string} - platform-server (pc-eu/pc-na...)
 * @returns {promise}
 */
async function getMatchData(matchID, shards = 'steam') {
  const url = `${encodeURI(shards)}/matches/${encodeURI(matchID)}`;
  const match = await ax.get(url);
  return match.data;
}

/**
 * gets multiple matches data and returns array of matches objects
 * @param {array} - [matchesIDs]
 * @param {string} - platform-server (pc-eu/pc-na...)
 * @returns {promise}
 */
async function getMatchListData(matchesIdArr, shards = 'steam') {
  const matchesDataObj = await Promise.all(
    matchesIdArr.map((matchID) => getMatchData(matchID, shards)),
  );
  return matchesDataObj;
}

export default {
  getPlayerMatches,
  getMatchData,
  getMatchListData,
};
