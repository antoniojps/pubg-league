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
import prettyMilliseconds from 'pretty-ms';
import { actionType, teamsType } from 'types';

const tabs = [
  {
    title: 'Liga',
    to: '/',
  },
  {
    title: 'Qualificadores',
    pathname: '/t/[slug]',
    to: '/t/qualificador-a',
  },
];

const Tournament = ({
  tournament, playerSummaries, teamStats, children, qualified, action, teams, loading,
}) => {
  const [topFilter, setTopFilter] = useState('kills');
  const [tableFilter, setTableFilter] = useState('table');
  const computedPlayerSummariesHighlights = useMemo(() => playerSummaries.map((player) => {
    const {
      kills, damage, survivedTime, playerMatchStat: matches, playerName,
    } = player;


    // get team reference from cms
    const team = teamStats.find(({ teamMember }) => teamMember.includes(playerName));
    const { teamId } = team;
    const teamReference = teams.find(({ slot }) => teamId === slot);
    let teamData = {};
    let restTeamData = {};
    let teamLogo = null;
    if (teamReference) {
      teamData = teamReference.team;
      const { logo, ...rest } = teamData;
      if (logo && logo.asset && logo.asset.url) teamLogo = logo.asset.url;
      restTeamData = rest;
    }

    const matchesPlayed = matches.length;
    const matchesDead = matches.filter(({ participant: { deathType } }) => deathType !== 'alive');
    const wins = matches.filter(({ participant: { winPlace } }) => winPlace === 1).length;
    const deaths = matchesDead.length;
    const kd = Number((kills / deaths).toFixed(2));
    const adr = Math.round(damage / matchesPlayed);

    const aliveRounded = prettyMilliseconds(survivedTime * 1000, { unitCount: 2 });
    // remove ugly tilt added by pretty-ms
    const aliveArr = aliveRounded.split('~');
    const alive = aliveArr.length > 1 ? aliveArr[1] : aliveArr[0];
    return {
      computed: {
        matchesPlayed,
        deaths,
        wins,
        kd,
        adr,
        alive,
        team: {
          ...team,
          ref: {
            ...restTeamData,
            logo: teamLogo,
          },
        },
      },
      ...player,
    };
  }),
  [playerSummaries]);

  const computedPlayerSummariesTable = useMemo(() => playerSummaries.map((player) => {
    const {
      kills, damage, survivedTime, playerMatchStat: matches, playerName,
    } = player;

    // get team reference from cms
    const team = teamStats.find(({ teamMember }) => teamMember.includes(playerName));
    const { teamId } = team;
    const teamReference = teams.find(({ slot }) => teamId === slot);
    let teamData = {};
    let restTeamData = {};
    let teamLogo = null;
    if (teamReference) {
      teamData = teamReference.team;
      const { logo, ...rest } = teamData;
      if (logo && logo.asset && logo.asset.url) teamLogo = logo.asset.url;
      restTeamData = rest;
    }

    const matchesPlayed = matches.length;
    const matchesDead = matches.filter(({ participant: { deathType } }) => deathType !== 'alive');
    const wins = matches.filter(({ participant: { winPlace } }) => winPlace === 1).length;
    const deaths = matchesDead.length;
    const kd = Number((kills / deaths).toFixed(2));
    const adr = Math.round(damage / matchesPlayed);

    const aliveRounded = prettyMilliseconds(survivedTime * 1000, { unitCount: 2 });
    // remove ugly tilt added by pretty-ms
    const aliveArr = aliveRounded.split('~');
    const alive = aliveArr.length > 1 ? aliveArr[1] : aliveArr[0];
    return {
      computed: {
        matchesPlayed,
        deaths,
        wins,
        kd,
        adr,
        alive,
        team: {
          ...team,
          ref: {
            ...restTeamData,
            logo: teamLogo,
          },
        },
      },
      ...player,
    };
  }),
  [playerSummaries]);

  return (
    <Wrapper>
      <Layout header={() => <Sponsors />}>
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
