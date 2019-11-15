import React, {
  useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Title, Spacer, Loader } from 'components/atoms';
import { Tabs, Collapse } from 'components/molecules';
import {
  Layout,
  PlayerHighlights,
  Leaderboard,
} from 'components/organisms';
import { Matches } from 'containers';
import styled from 'styled-components';
import { actionType, teamsType } from 'types';
import { computedPlayerSummariesWithTeam } from 'services/generators';
import BlockContent from '@sanity/block-content-to-react';
import sanity from '../../services/sanity';

const tabs = [
  {
    title: 'Liga',
    to: '/',
    as: '/',
    pathname: '/',
  },
  {
    title: 'Qualificadores',
    as: '/t/qualifier-a',
    to: '/t?slug=qualifier-a',
    pathname: '/t/[slug]',
  },
];

const Tournament = ({
  tournament, playerSummaries, teamStats, children, qualified, action, teams, loading, faq,
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

  const matchIds = useMemo(() => {
    if (!tournament || !tournament.tournamentMatches) return [];
    return tournament.tournamentMatches.map(({ matchId }) => matchId);
  }, [tournament]);

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
        <Spacer bottom="m">
          <Matches matchIds={matchIds} teams={teams} loading={loading} />
        </Spacer>
        <Spacer bottom="xs">
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
        <Spacer bottom="xl4">
          {faq && faq.length > 0 && (
            <div className="zi-card">
              <p className="zi-subtitle">FAQ</p>
              {faq.map(({ answer, question, _key }) => (
                <Collapse key={_key} question={question}>
                  <BlockContent blocks={answer} imageOptions={{ w: 900, fit: 'max' }} {...sanity.config()} />
                </Collapse>
              ))}
            </div>
          )}
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
  faq: PropTypes.arrayOf(PropTypes.shape({})),
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
  faq: [],
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
