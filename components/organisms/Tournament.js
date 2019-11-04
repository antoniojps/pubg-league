import React, {
  useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Title, Spacer } from 'components/atoms';
import { Tabs } from 'components/molecules';
import {
  Layout, PlayerHighlights, Leaderboard, Sponsors,
} from 'components/organisms';
import styled from 'styled-components';
import prettyMilliseconds from 'pretty-ms';
import { actionType } from 'types';

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
  tournament, playerSummaries, teamStats, children, qualified, action,
}) => {
  const [topFilter, setTopFilter] = useState('kills');
  const [tableFilter, setTableFilter] = useState('table');
  const computedPlayerSummariesHighlights = useMemo(() => playerSummaries.map((player) => {
    const {
      kills, damage, survivedTime, playerMatchStat: matches, playerName,
    } = player;
    // add team name and image here to the team object
    const team = teamStats.find(({ teamMember }) => teamMember.includes(playerName));
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
        team,
      },
      ...player,
    };
  }),
  [playerSummaries]);

  const computedPlayerSummariesTable = useMemo(() => playerSummaries.map((player) => {
    const {
      kills, damage, survivedTime, playerMatchStat: matches, playerName,
    } = player;
      // add team name and image here to the team object
    const team = teamStats.find(({ teamMember }) => teamMember.includes(playerName));
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
        team,
      },
      ...player,
    };
  }),
  [playerSummaries]);

  return (
    <Wrapper>
      <Layout header={() => <Sponsors />}>
        <Header>
          <Title>Resultados</Title>
          <a target="_blank" rel="noopener noreferrer" href={action.href} className={`zi-btn mini ${action.style}`}>{action.text}</a>
        </Header>
      </Layout>
      <Tabs tabs={tabs} />
      {children}
      <div className="zi-layout">
        <Spacer bottom="m">
          <PlayerHighlights playerSummaries={computedPlayerSummariesHighlights} filter={topFilter} onFilterChange={(newFilter) => setTopFilter(newFilter)} />
        </Spacer>
        <Spacer bottom="xl4">
          <Leaderboard filter={tableFilter} tournament={tournament} playerSummaries={computedPlayerSummariesTable} teamStats={teamStats} qualified={qualified} onFilterChange={(newFilter) => setTableFilter(newFilter)} />
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
};

Tournament.defaultProps = {
  tournament: null,
  playerSummaries: [],
  teamStats: [],
  children: null,
  qualified: null,
  action: {
    style: 'warning',
    text: 'Inscrever',
    href: 'https://battlefy.com/hypedgg/shootsgud-major-league-q1/5dbf28e43a111776867837b2/info?infoTab=details',
  },
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
