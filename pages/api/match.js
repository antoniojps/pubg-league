import pubg from 'services/pubg/api';
import matchFilter from 'services/pubg/filters/match';

export default async (req, res) => {
  const {
    query: { matchId, summary = false },
  } = req;

  try {
    if (!matchId) {
      res.status(400).json({ error: 'Invalid matchId', code: 400 });
      return;
    }
    if (Array.isArray(matchId) && matchId.length > 0) {
      const matches = await pubg.getMatchListData(matchId, 'steam');
      const filteredMatches = matchFilter.filterArr(matches, summary);
      res.status(200).json(filteredMatches);
      return;
    }
    const match = await pubg.getMatchData(matchId, 'steam');
    const filteredMatch = matchFilter.filter(match, summary);
    res.status(200).json([filteredMatch]);
  } catch (err) {
    const code = (err.response && err.response.status) || 500;
    const message = err.message || 'Internal server error';
    res.status(code).json({ error: message, code });
  }
};
