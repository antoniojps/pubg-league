import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Title, Spacer } from 'components/atoms';
import { Tabs } from 'components/molecules';
import { Layout, PlayerHighlights, Leaderboard } from 'components/organisms';
import styled from 'styled-components';
import prettyMilliseconds from 'pretty-ms';
import { useRouter } from 'next/router';

const tabs = [
  {
    title: 'Liga',
    to: '/',
  },
  {
    title: 'Qualificadores',
    to: '/qualificadores',
  },
];

const Tournament = ({ tournament, playerSummaries, teamStats }) => {
  const computedPlayerSummaries = useMemo(() => playerSummaries.map((player) => {
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

  const { query: { table: tableFilter = 'table', top: topFilter = 'kills' } } = useRouter();

  return (
    <Wrapper>
      <Layout>
        <Header>
          <Title>Resultados</Title>
          <span className="zi-tag danger">EM DIRECTO!</span>
        </Header>
      </Layout>
      <Tabs tabs={tabs} />
      <div className="zi-layout">
        <Spacer bottom="m">
          <PlayerHighlights playerSummaries={computedPlayerSummaries} filter={topFilter} />
        </Spacer>
        <Leaderboard filter={tableFilter} playerSummaries={computedPlayerSummaries} teamStats={teamStats} />
      </div>
    </Wrapper>
  );
};

Tournament.propTypes = {
  tournament: PropTypes.shape({}),
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
};

Tournament.defaultProps = {
  tournament: null,
  playerSummaries: [],
  teamStats: [],
};

const Header = styled.div`
  display: flex;
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
