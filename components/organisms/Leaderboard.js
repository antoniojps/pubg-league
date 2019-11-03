import React, { useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LeaderboardTeams, LeaderboardPlayers } from 'components/molecules';

const filters = {
  table: 'table',
  players: 'players',
};

const Leaderboard = ({
  teamStats, playerSummaries, tournament, filter, qualified, onFilterChange,
}) => {
  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return;
    onFilterChange(newFilter);
  };

  const computedGamesCounterMessage = useMemo(() => {
    if (!tournament) return '...';
    const playedMatches = tournament.tournamentMatches.length;
    if (tournament.planedGamesCount) {
      return `${playedMatches}/${tournament.planedGamesCount} Jogos`;
    }
    return `${playedMatches} Jogo(s)`;
  }, [tournament]);

  return (
    <>
      <TableHeader>
        <Table.Tabs>
          <Table.Title active={filter === filters.table} onClick={() => handleFilterChange(filters.table)}>
            Tabela
          </Table.Title>
          {playerSummaries.length > 0 && (
          <Table.Title active={filter === filters.players} onClick={() => handleFilterChange(filters.players)}>
          Jogadores
          </Table.Title>
          )}
        </Table.Tabs>

        <GamesCounter>
          {computedGamesCounterMessage}
        </GamesCounter>
      </TableHeader>
      { filter === filters.table && <LeaderboardTeams teamStats={teamStats} qualified={qualified} />}
      { filter === filters.players && <LeaderboardPlayers playerSummaries={playerSummaries} />}
    </>
  );
};

const Table = styled.table`
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const GamesCounter = styled.div`
  font-size: ${(props) => props.theme.sizes.xl};
  color: ${(props) => props.theme.colors.base};
  font-weight: ${(props) => props.theme.weight.base};
`;

Table.Tabs = styled.div`
  display: flex;
`;

Table.Title = styled.div`
  font-size: ${(props) => props.theme.sizes.xl};
  padding: ${(props) => props.theme.spacing.xs4};
  margin-right: ${(props) => props.theme.spacing.xs3};
  color: ${(props) => (props.active ? props.theme.colors.base : props.theme.colors.grey)};
  font-weight: ${(props) => (props.active ? props.theme.weight.base : props.theme.weight.xbase)};
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: ${(props) => props.theme.colors.base};
  }
`;

Leaderboard.propTypes = {
  teamStats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filter: PropTypes.oneOf(['table', 'players', 'teams']),
  qualified: PropTypes.number,
  onFilterChange: PropTypes.func,
  tournament: PropTypes.shape({}),
};

Leaderboard.defaultProps = {
  filter: 'table',
  qualified: null,
  onFilterChange: () => null,
  tournament: null,
};

export default Leaderboard;
