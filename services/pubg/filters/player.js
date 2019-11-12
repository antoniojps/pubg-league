/*
Utils for PUBG player data filtering
*/

/**
 * gets Array of Player matches
 * sorts by more recent
 * @param {array} - Array of participants
 * @param {array} - Array of roster participants IDs
 * @returns {array}
 */
function getPlayerMatchesArr(playerObj, limit = 1) {
  const max = 10;
  let matchesLimit = limit;

  if (matchesLimit > max) matchesLimit = max;

  const matches = playerObj.data[0].relationships.matches.data.map(
    (match) => match.id,
  );
  const { length } = matches;
  if (length > matchesLimit) {
    const itemsToRemove = length - matchesLimit;
    return matches
      .reverse()
      .splice(itemsToRemove, matchesLimit)
      .reverse();
  }
  return matches;
}

export default {
  getPlayerMatchesArr,
};
