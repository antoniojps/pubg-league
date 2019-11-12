/*
Utils for match data filtering
*/

const points = {
  1: 10,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  6: 2,
  7: 1,
  8: 1,
  default: 0,
};

const computePoints = (rank) => {
  if (typeof rank === 'number' && rank < 9 && rank > 0) {
    return points[rank];
  }
  return points.default;
};

/**
 * filters array of matches to correct GraphQL Type PubgMatch
 * @param {object} - match data
 * @returns {object}
 */
function filterArr(matchesArr) {
  const filteredMatchesArr = matchesArr.map((match) => filter(match));
  return filteredMatchesArr;
}

/**
 * filters match data to correct GraphQL Type PubgMatch
 * @param {object} - match data
 * @returns {object}
 */
function filter(obj) {
  const match = obj.data;
  const { attributes } = match;
  const rosters = getRosters(obj);

  return {
    matchId: match.id,
    gameMode: attributes.gameMode,
    createdAt: attributes.createdAt,
    map: attributes.mapName,
    isCustomMatch: attributes.isCustomMatch,
    duration: attributes.duration,
    server: attributes.shardId,
    totalParticipants: getParticipants(obj).length,
    rosters: filterRosters({ rosters, match: obj }),
  };
}

/**
 * filters rosters data to correct GraphQL Type PubgRoster
 * @param {object} - { rosters array, match obj }
 * @returns {object}
 */
function filterRosters({ rosters, match }) {
  const matchParticipants = getParticipants(match);

  const filteredRosters = rosters.map((roster) => {
    const rosterParticipants = getRosterParticipantsArr(roster);
    const rosterParticipantsData = getRosterParticipants(
      matchParticipants,
      rosterParticipants,
    );

    const stats = {
      won: roster.attributes.won === 'true',
      rank: roster.attributes.stats.rank,
      rankPoints: computePoints(roster.attributes.stats.rank),
      kills: getRosterKills(rosterParticipantsData),
      killPoints: getRosterKills(rosterParticipantsData),
      damage: getRosterDamage(rosterParticipantsData),
      dbnos: getRosterDbnos(rosterParticipantsData),
    };

    const participants = filterRosterParticipants(rosterParticipantsData);

    return {
      id: roster.id,
      teamId: roster.attributes.stats.teamId,
      ...stats,
      playerSummaries: participants,
    };
  });

  return filteredRosters;
}

/**
 * filters roster data to correct GraphQL Type PubgParticipant
 * @param {object} - rosterParticipantsData
 * @returns {object}
 */
function filterRosterParticipants(rosterParticipantsData) {
  const participants = rosterParticipantsData.map((participant) => ({
    id: participant.id,
    actor: participant.attributes.actor,
    shardId: participant.attributes.shardId,
    ...participant.attributes.stats,
  }));
  return participants;
}

/**
 * gets Array of roster Objects in match
 * @param {object} - match data
 * @returns {array}
 */
function getRosters(obj) {
  const rosters = obj.included
    .filter((includedObj) => includedObj.type === 'roster')
    .sort(
      (obj1, obj2) => obj1.attributes.stats.rank - obj2.attributes.stats.rank,
    );
  return rosters;
}

/**
 * gets Array of participants Objects in match
 * @param {object} - match data
 * @returns {array}
 */
function getParticipants(obj) {
  return obj.included.filter((includedObj) => includedObj.type === 'participant');
}

/**
 * gets Array of participants IDs in roster Object
 * @param {object} - roster type
 * @returns {array}
 */
function getRosterParticipantsArr(rosterObj) {
  return rosterObj.relationships.participants.data.map(
    (participant) => participant.id,
  );
}

/**
 * gets Array of Participant Objects in Roster by finding the participants with the roster participants id´
 * sorts Participants by kills
 * @param {array} - Array of participants
 * @param {array} - Array of roster participants IDs
 * @returns {array}
 */
function getRosterParticipants(matchParticipants, rosterParticipantsArr) {
  return rosterParticipantsArr
    .map((id) => matchParticipants.find((participant) => participant.id === id))
    .sort(
      (obj1, obj2) => obj2.attributes.stats.kills - obj1.attributes.stats.kills,
    );
}

function _getRosterStats(rosterParticipantsObj, key = 'kills') {
  return rosterParticipantsObj
    .map((participant) => participant.attributes.stats[key])
    .reduce((accumulator, current) => accumulator + current);
}

function getRosterKills(rosterParticipantsObj) {
  return _getRosterStats(rosterParticipantsObj, 'kills');
}

function getRosterDamage(rosterParticipantsObj) {
  return Math.round(_getRosterStats(rosterParticipantsObj, 'damageDealt'));
}

function getRosterDbnos(rosterParticipantsObj) {
  return _getRosterStats(rosterParticipantsObj, 'DBNOs');
}

export default {
  filterArr,
  filter,
  getRosters,
  getParticipants,
  getRosterParticipants,
  getRosterParticipantsArr,
  getRosterKills,
  getRosterDamage,
  getRosterDbnos,
};
