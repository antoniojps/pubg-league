import React, { useMemo } from 'react';
import { PlayerCard } from 'components/molecules';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import placeholderData from 'data/top-players-placeholder.json';
import { below } from 'services/breakpoints';

const filters = {
  kills: 'kills',
  damage: 'damage',
  kd: 'kd',
  adr: 'adr',
};

const PlayerHighlights = ({
  playerSummaries, filter, onFilterChange, loading,
}) => {
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

  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return;
    onFilterChange(newFilter);
  };

  const hasData = useMemo(() => !loading && playerSummaries.length > 0, [playerSummaries, loading]);

  return (
    <Wrapper>
      <PlayerStart>
        <PlayerCard
          className="stretch"
          player={hasData ? topOnePlayer : null}
          filter={filter}
          loading={loading}
          placeholder={playerSummaries.length === 0}
          stretch
        />
      </PlayerStart>
      <PlayerEnd>
        <h3>Melhores jogadores</h3>
        <div className="zi-switcher">
          <a className={filter === filters.kills ? 'active' : ''} onClick={() => handleFilterChange(filters.kills)}>Kills</a>
          <a className={filter === filters.damage ? 'active' : ''} onClick={() => handleFilterChange(filters.damage)}>Damage</a>
          <a className={filter === filters.kd ? 'active' : ''} onClick={() => handleFilterChange(filters.kd)}>K/D</a>
          <a className={filter === filters.adr ? 'active' : ''} onClick={() => handleFilterChange(filters.adr)}>ADR</a>
        </div>
        <PlayerList>
          {hasData
            ? restTopPlayers.map((player) => (
              <PlayerCard
                key={player.playerName}
                loading={loading}
                className="card"
                player={player}
                filter={filter}
                small
              />
            ))
            : placeholderData.map((player) => (
              <PlayerCard
                key={player.playerName}
                loading={loading}
                className="card"
                player={player}
                filter={filter}
                placeholder
                small
              />
            ))}
        </PlayerList>
        {(!hasData && !loading) && (
        <p className="zi-comment">Dados disponíveis após um jogo.</p>
        )}
      </PlayerEnd>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 70%;
  grid-template-rows: 1fr;
  grid-column-gap: ${(props) => props.theme.spacing.m};
  ${below.md`
    display: flex;
    flex-direction: column;
  `}
`;

const PlayerStart = styled.div`
  .stretch {
    height: 100%;
  }
`;

const PlayerEnd = styled.div`
  h3 {
    margin-top: ${(props) => props.theme.spacing.xs4};
    margin-bottom: ${(props) => props.theme.spacing.xs};
    ${below.md`
      margin-top: ${(props) => props.theme.spacing.xs};
      margin-bottom: ${(props) => props.theme.spacing.xs};
    `}
  }
  .zi-switcher {
    margin-bottom: ${(props) => props.theme.spacing.xs2};
    ${below.md`
      overflow-x: scroll;
      max-width: 100%;
    `}
    a.active {
      background-color: ${(props) => props.theme.colors.bgInverse};
      color: ${(props) => props.theme.colors.baseInverse};
      &::after {
        border-right: 1px solid ${(props) => props.theme.colors.bgInverse};
      }
    }
  }
  .zi-comment {
    margin-bottom: 0;
  }
`;

const PlayerList = styled.div`
  display: flex;
  .card {
    margin-right: ${(props) => props.theme.spacing.xs};
    &:last-child {
      margin-right: 0;
    }
    ${below.md`
      width: 100%;
    `}
  }
  ${below.lg`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: ${(props) => props.theme.spacing.xs4};
    grid-row-gap: ${(props) => props.theme.spacing.xs4};
    .card {
      margin-right: 0;
    }
  `}
  ${below.md`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .card {
      margin: ${(props) => props.theme.spacing.xs3};
    }
  `}
`;

PlayerHighlights.propTypes = {
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  filter: PropTypes.oneOf([...Object.keys(filters)]),
  onFilterChange: PropTypes.func,
  loading: PropTypes.bool,
};

PlayerHighlights.defaultProps = {
  playerSummaries: [],
  filter: filters.kills,
  onFilterChange: () => null,
  loading: false,
};

export default PlayerHighlights;
