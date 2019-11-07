import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tournament } from 'components/organisms';
import { below } from 'services/breakpoints';
import { teamsType, actionType } from 'types';
import CGS_DATA_PLACEHOLDER from '../data/cgs-placeholder.json';

const TournamentContainer = ({
  teams, action, title, cgs, children,
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestCgs = async () => {
      try {
        setLoading(true);
        if (!cgs) throw Error('Invalid cgs');
        const res = await fetch(
          `https://api.cgs.gg/mono-service/api/v2/tournament/${cgs}/summary`,
        );
        if (!res.ok) throw Error(res.status);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        let { message } = err;
        if (message === '404') message = 'Error fetching tournament stats';
        setLoading(false);
        setError(message);
        setData(CGS_DATA_PLACEHOLDER);
      }
    };
    requestCgs();
  }, [cgs]);

  useEffect(() => {
    console.log({ data, loading, error });
  }, [data, loading, error]);

  return (
    <Tournament
      tournament={data ? data.tournament : null}
      teamStats={data ? data.teamStats : []}
      playerSummaries={data ? data.playerSummaries : []}
      qualified={8}
      action={action}
      teams={teams}
      title={title}
      loading={loading}
    >
      {children}
    </Tournament>
  );
};

TournamentContainer.propTypes = {
  title: PropTypes.string,
  action: actionType,
  cgs: PropTypes.string,
  teams: teamsType,
  children: PropTypes.node,
};

TournamentContainer.defaultProps = {
  action: {
    href: 'https://www.twitch.tv/shootsgud',
    title: 'Stream',
    style: 'primary',
  },
  cgs: null,
  teams: [],
  title: 'Tournament',
  children: null,
};


export default TournamentContainer;
