import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { LeaderboardTeams, LeaderboardPlayers } from 'components/molecules';

const filters = {
  table: 'table',
  players: 'players',
  teams: 'teams',
};

const Leaderboard = ({
  teamStats, playerSummaries, filter, qualified,
}) => {
  const router = useRouter();

  const handleFilterChange = (newFilter) => {
    if (newFilter === filter) return;
    const { query, pathname, push } = router;
    const newQuery = {
      ...query,
      table: newFilter,
    };
    const to = `${pathname}?${queryString.stringify(newQuery)}`;
    push(to);
  };

  return (
    <>
      <Table.Tabs>
        <Table.Title active={filter === filters.table} onClick={() => handleFilterChange(filters.table)}>
            Tabela
        </Table.Title>
        <Table.Title active={filter === filters.players} onClick={() => handleFilterChange(filters.players)}>
            Jogadores
        </Table.Title>
        <Table.Title active={filter === filters.teams} onClick={() => handleFilterChange(filters.teams)}>
            Equipas
        </Table.Title>
      </Table.Tabs>
      { filter === filters.table && <LeaderboardTeams teamStats={teamStats} qualified={qualified} />}
      { filter === filters.players && <LeaderboardPlayers playerSummaries={playerSummaries} />}
    </>
  );
};

const Table = styled.table`
`;

Table.Tabs = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing.xs};
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
};

Leaderboard.defaultProps = {
  filter: 'table',
  qualified: null,
};

export default Leaderboard;
