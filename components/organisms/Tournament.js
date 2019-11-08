import React, {
  useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Title, Spacer, Loader } from 'components/atoms';
import { Tabs } from 'components/molecules';
import {
  Layout, PlayerHighlights, Leaderboard, Sponsors,
} from 'components/organisms';
import styled from 'styled-components';
import { actionType, teamsType } from 'types';
import { computedPlayerSummariesWithTeam } from 'services/generators';

const tabs = [
  {
    title: 'Liga',
    to: '/',
    as: '/',
    pathname: '/',
  },
  {
    title: 'Qualificadores',
    as: '/t/qualificador-a',
    to: '/t?slug=qualificador-a',
    pathname: '/t/[slug]',
  },
];

const Tournament = ({
  tournament, playerSummaries, teamStats, children, qualified, action, teams, loading,
}) => {
  const [topFilter, setTopFilter] = useState('kills');
  const [tableFilter, setTableFilter] = useState('table');
  const computedPlayerSummariesHighlights = useMemo(() => computedPlayerSummariesWithTeam({
    playerSummaries,
    teamStats,
    teams,
  }),
  [playerSummaries]);

  const computedPlayerSummariesTable = useMemo(() => computedPlayerSummariesWithTeam({
    playerSummaries,
    teamStats,
    teams,
  }),
  [playerSummaries]);

  return (
    <Wrapper>
      <Layout>
        <Header>
          <Title>
Resultados
            {' '}
            {loading && (
              <Spacer left="xs">
                <Loader size="3em" />
              </Spacer>
            )}
          </Title>
          <a target="_blank" rel="noopener noreferrer" href={action.href} className={`zi-btn mini ${action.style || 'warning'}`}>{action.title}</a>
        </Header>
      </Layout>
      <Tabs tabs={tabs} />
      {children}
      <div className="zi-layout">
        <Spacer bottom="m">
          <PlayerHighlights
            playerSummaries={computedPlayerSummariesHighlights}
            filter={topFilter}
            onFilterChange={(newFilter) => setTopFilter(newFilter)}
            loading={loading}
          />
        </Spacer>
        <Spacer bottom="xl4">
          <Leaderboard
            teams={teams}
            filter={tableFilter}
            tournament={tournament}
            playerSummaries={computedPlayerSummariesTable}
            teamStats={teamStats}
            qualified={qualified}
            onFilterChange={(newFilter) => setTableFilter(newFilter)}
            loading={loading}
          />
        </Spacer>
      </div>
    </Wrapper>
  );
};

Tournament.propTypes = {
  tournament: PropTypes.shape({}),
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
  children: PropTypes.node,
  qualified: PropTypes.number,
  action: actionType,
  teams: teamsType,
  loading: PropTypes.bool,
};

Tournament.defaultProps = {
  tournament: null,
  playerSummaries: [],
  teamStats: [],
  children: null,
  qualified: null,
  action: {
    style: 'warning',
    title: 'Inscrever',
    href: 'https://battlefy.com/hypedgg/shootsgud-major-league-q1/5dbf28e43a111776867837b2/info?infoTab=details',
  },
  teams: [],
  loading: false,
};

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${(props) => props.theme.spacing.xs};
`;

const Wrapper = styled.div`
  .zi-layout {
    padding-bottom: 0;
  }
`;

export default Tournament;
