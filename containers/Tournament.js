import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tournament } from 'components/organisms';
import { teamsType, actionType } from 'types';
import usePrevious from 'hooks/usePrevious';
import { toast } from 'react-toastify';
import { isDev } from 'services/constants';
import CGS_DATA_PLACEHOLDER from '../data/cgs-placeholder.json';
import CGS_DATA_PLACEHOLDER_DUMMY from '../data/cgs-placeholder-dummy.json';

const TournamentContainer = ({
  teams, action, title, cgs, children, refetchToggle, faq,
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const prevRefetchToggle = usePrevious(refetchToggle);
  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    const requestCgs = async () => {
      try {
        setLoading(true);
        if (isDev) {
          setData(CGS_DATA_PLACEHOLDER_DUMMY);
          setLoading(false);
        } else {
          if (!cgs) throw Error('Invalid cgs');
          const res = await fetch(
            `https://api.cgs.gg/mono-service/api/v2/tournament/${cgs}/summary`,
          );
          if (!res.ok) throw Error(res.status);
          const json = await res.json();
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        let { message } = err;
        if (message === '404') message = 'Error fetching tournament stats';
        setLoading(false);
        setError(message);
        setData(CGS_DATA_PLACEHOLDER);
      }
    };
    requestCgs();
  }, [cgs, refetchToggle]);

  // notify on refetch
  useEffect(() => {
    if (toastId) toast.dismiss(toastId);

    if (refetchToggle !== prevRefetchToggle && typeof prevRefetchToggle === 'boolean') {
      const newToastId = toast('Estatísticas atualizadas!', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: false,
      });
      setToastId(newToastId);
    }
  }, [refetchToggle]);

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
      faq={faq}
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
  refetchToggle: PropTypes.bool,
  faq: PropTypes.arrayOf(PropTypes.shape({})),
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
  refetchToggle: false,
  faq: [],
};


export default TournamentContainer;
