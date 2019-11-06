import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';
import { Table, TeamLogo, Spacer } from 'components/atoms';

const filters = {
  kills: 'kills',
  damage: 'damage',
  kd: 'kd',
  adr: 'adr',
};

const LeaderboardPlayers = ({ playerSummaries }) => {
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

  return (
    <TablePlayers>
      <Table className="zi-table">
        <thead>
          <tr>
            <th>Lugar</th>
            <th className="team">Jogador</th>
            <th>Equipa</th>
            <th>Kills</th>
            <th>Damage</th>
            <th>Knocks</th>
            <th>HS Kills</th>
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
                <td className="small">
                    slot
                  {' '}
                  {' '}
                  {player.computed.team.teamId}
                </td>
                <td>{player.kills}</td>
                <td>{Math.round(player.damage)}</td>
                <td>{player.dbnos}</td>
                <td>{player.headshotKills}</td>
              </tr>
            ))
            }
        </tbody>
      </Table>
    </TablePlayers>
  );
};


const TablePlayers = styled.div`
  overflow: scroll;
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
