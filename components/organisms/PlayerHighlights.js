import React, { useState, useMemo } from 'react';
import { PlayerCard } from 'components/molecules';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const filters = {
  kills: 'kills',
  damage: 'damage',
  kd: 'kd',
  adr: 'adr',
};

const PlayerHighlights = ({ playerSummaries }) => {
  const [filter, setFilter] = useState(filters.kills);

  const topPlayers = useMemo(() => {
    const orderedByFilterTopPlayers = playerSummaries.sort((playerA, playerB) => {
      let statA = playerA[filter];
      let statB = playerB[filter];

      if (filter === filters.kd || filter === filters.adr) {
        const { computed: computedA } = playerA;
        const { computed: computedB } = playerB;
        statA = computedA[filter];
        statB = computedB[filter];
      }

      if (statA < statB) return 1;
      if (statA > statB) return -1;

      // when kills are the same order by damage aswell
      if (filter === filters.kills) {
        const damageA = playerA.damage;
        const damageB = playerB.damage;
        if (damageA < damageB) return 1;
        if (damageA > damageB) return -1;
      }

      return 0;
    });
    return orderedByFilterTopPlayers;
  }, [filter, playerSummaries]);


  const topFivePlayers = useMemo(() => {
    const newTopFivePlayers = topPlayers.slice(0, 5);
    return newTopFivePlayers;
  }, [topPlayers, filter]);

  const [topOnePlayer, ...restTopPlayers] = topFivePlayers;


  return (
    <Wrapper>
      <PlayerStart>
        <PlayerCard className="stretch" player={playerSummaries ? topOnePlayer : null} filter={filter} stretch />
      </PlayerStart>
      <PlayerEnd>
        <h3>Melhores jogadores</h3>
        <div className="zi-switcher">
          <a className={filter === filters.kills ? 'active' : ''} onClick={() => setFilter(filters.kills)}>Kills</a>
          <a className={filter === filters.damage ? 'active' : ''} onClick={() => setFilter(filters.damage)}>Damage</a>
          <a className={filter === filters.kd ? 'active' : ''} onClick={() => setFilter(filters.kd)}>K/D</a>
          <a className={filter === filters.adr ? 'active' : ''} onClick={() => setFilter(filters.adr)}>ADR</a>
        </div>
        <PlayerList>
          {restTopPlayers.map((player) => <PlayerCard className="card" player={player} filter={filter} small />)}
        </PlayerList>
      </PlayerEnd>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 70%;
  grid-template-rows: 1fr;
  grid-column-gap: ${(props) => props.theme.spacing.m};
`;

const PlayerStart = styled.div`
  .stretch {
    height: 100%;
  }
`;

const PlayerEnd = styled.div`
  h3 {
    margin-top: ${(props) => props.theme.spacing.xs4};
  }
  .zi-switcher {
    margin-bottom: ${(props) => props.theme.spacing.xs2};
    a.active {
      background-color: ${(props) => props.theme.colors.bgInverse};
      color: ${(props) => props.theme.colors.baseInverse};
      &::after {
        border-right: 1px solid ${(props) => props.theme.colors.bgInverse};
      }
    }
  }
`;

const PlayerList = styled.div`
  display: flex;
  .card {
    margin-right: ${(props) => props.theme.spacing.xs};
    &:last-child {
      margin-right: 0;
    }
  }
`;

PlayerHighlights.propTypes = {
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
};

PlayerHighlights.defaultProps = {
  playerSummaries: null,
};

export default PlayerHighlights;
