import React, { useEffect, useState } from 'react';
import { MatchList } from 'components/organisms';
import { getMatches } from 'services/requests';
import { teamsType } from 'types';
import PropTypes from 'prop-types';

const Matches = ({ matchIds, teams, loading }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loadingMatches, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      try {
        setLoading(true);
        if (!matchIds || matchIds.length === 0) {
          setLoading(false);
          setError('No matches');
          setData([]);
          return;
        }
        const matches = await getMatches(matchIds, true);
        setData(matches);
        setLoading(false);
      } catch (err) {
        let { message } = err;
        if (message === '404') message = 'Error fetching matches';
        setLoading(false);
        setError(message);
        setData([]);
      }
    };
    request();
  }, [matchIds]);

  return (
    <MatchList loading={loading || loadingMatches} matches={data} teams={teams} />
  );
};

Matches.propTypes = {
  matchIds: PropTypes.arrayOf(PropTypes.string),
  teams: teamsType,
  loading: PropTypes.bool,
};

Matches.defaultProps = {
  matchIds: [],
  teams: [],
  loading: true,
};

export default Matches;
