import pubg from 'services/pubg/api';
import matchFilter from 'services/pubg/filters/match';

export default async (req, res) => {
  const {
    query: { matchId },
  } = req;

  try {
    const match = await pubg.getMatchData(matchId, 'steam');
    const filteredMatch = matchFilter.filter(match);

    res.status(200).json(filteredMatch);
  } catch (err) {
    const code = (err.response && err.response.status) || 500;
    const message = err.message || 'Internal server error';
    res.status(code).json({ error: message, code });
  }
};
