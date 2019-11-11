import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';
import {
  Table, TeamLogo, Spacer, TableHeader, BadgeStat,
} from 'components/atoms';

const filters = {
  kills: 'kills',
  kd: 'kd',
  adr: 'adr',
  matchesPlayed: 'matchesPlayed',
};

const orders = {
  asc: 'asc',
  desc: 'desc',
};

const LeaderboardPlayers = ({ playerSummaries }) => {
  const [filter, setFilter] = useState(filters.kills);
  const [order, setOrder] = useState(orders.asc);

  const topPlayers = useMemo(() => {
    const orderedByFilterTopPlayers = playerSummaries.sort((playerA, playerB) => {
      let statA = playerA[filter];
      let statB = playerB[filter];

      if (filter === filters.kd || filter === filters.adr || filter === filters.matchesPlayed) {
        const { computed: computedA } = playerA;
        const { computed: computedB } = playerB;
        statA = computedA[filter];
        statB = computedB[filter];
      }

      if (order === orders.asc) {
        if (statA < statB) return 1;
        if (statA > statB) return -1;
      }

      if (order === orders.desc) {
        if (statA < statB) return -1;
        if (statA > statB) return 1;
      }


      // when kills are the same order by damage aswell
      if (filter === filters.kills) {
        const damageA = playerA.damage;
        const damageB = playerB.damage;
        if (order === orders.asc) {
          if (damageA < damageB) return 1;
          if (damageA > damageB) return -1;
        }
        if (order === orders.desc) {
          if (damageA < damageB) return -1;
          if (damageA > damageB) return 1;
        }
      }

      return 0;
    });
    return orderedByFilterTopPlayers;
  }, [filter, playerSummaries, order]);

  const handleHeaderClick = (nextFilter) => {
    const nextOrder = order === orders.asc ? orders.desc : orders.asc;
    setFilter(nextFilter);
    setOrder(nextOrder);
  };

  return (
    <TablePlayers>
      <Table className="zi-table">
        <thead>
          <tr>
            <th>Lugar</th>
            <th className="team">Jogador</th>
            <TableHeader
              onClick={() => handleHeaderClick(filters.kills)}
              active={filter === filters.kills}
              order={order}
            >
Kills

            </TableHeader>
            <TableHeader
              onClick={() => handleHeaderClick(filters.kd)}
              active={filter === filters.kd}
              order={order}
            >
K/D

            </TableHeader>
            <TableHeader
              onClick={() => handleHeaderClick(filters.adr)}
              active={filter === filters.adr}
              order={order}
            >
ADR

            </TableHeader>
            <TableHeader
              onClick={() => handleHeaderClick(filters.matchesPlayed)}
              active={filter === filters.matchesPlayed}
              order={order}
            >
Matches
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {
            topPlayers.map((player, index) => (
              <tr key={player.playerName}>
                <td>
                      #
                  {index + 1}
                </td>
                <td className="player">
                  <Spacer right="xs3">
                    <TeamLogo src={player.computed.team.ref.logo} name={player.computed.team.ref.name} tag={player.computed.team.ref.tag} />
                  </Spacer>
                  {player.playerName}
                </td>
                <td>{player.kills}</td>
                <td>
                  <BadgeStat value={player.computed.kd} great={player.computed.kd >= 2.5} good={player.computed.kd >= 1.5} />
                </td>
                <td>
                  <BadgeStat value={player.computed.adr} great={player.computed.adr >= 300} good={player.computed.adr >= 200} />
                </td>
                <td>{player.computed.matchesPlayed}</td>
              </tr>
            ))
            }
        </tbody>
      </Table>
    </TablePlayers>
  );
};


const TablePlayers = styled.div`
  overflow-x: auto;
  table {
    tbody tr {
      &:first-child {
        background-color: ${(props) => lighten(0.35, props.theme.colors.yellow)};
      }
      &:nth-child(2){
        background-color: ${(props) => lighten(0.4, props.theme.colors.yellow)} !important;
      }
      &:nth-child(3){
        background-color: ${(props) => lighten(0.42, props.theme.colors.yellow)};
      }
      &:nth-child(even){
        background-color: #f2f2f2;
      }
    }

    th.left {
      text-align: left;
    }

    td {
      &.player {
        display: flex;
        align-items: center;
        text-align: left;
      }
    }
  }
`;

LeaderboardPlayers.propTypes = {
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default LeaderboardPlayers;
