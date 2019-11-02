import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';
import { Table } from 'components/atoms';

const LeaderboardTeams = ({ teamStats }) => (
  <TableTeams>
    <Table className="zi-table">
      <thead>
        <tr>
          <th>Lugar</th>
          <th className="team">Equipa</th>
          <th>PTS Colocação</th>
          <th>PTS Kills</th>
          <th>PTS Totais</th>
        </tr>
      </thead>
      <tbody>
        {
            teamStats.map(({
              rank, teamMember, teamId, rankPoints, killPoints,
            }) => (
              <tr key={teamId}>
                <td>
                    #
                  {rank}
                </td>
                <td className="team small">
                  {teamMember.join(', ')}
                </td>
                <td>{rankPoints}</td>
                <td>{killPoints}</td>
                <td className="points">{rankPoints + killPoints}</td>
              </tr>
            ))
            }
      </tbody>
    </Table>
  </TableTeams>
);

const TableTeams = styled.div`
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
      &:nth-child(n+9){
        background-color: #f2f2f2;
      }
    }

    td {
      &.team {
        display: flex;
        align-items: center;
        text-align: left;
        font-size: ${(props) => props.theme.sizes.base};
      }
      &.points {
        color: ${(props) => props.theme.colors.orange};
      }
    }
  }
`;

LeaderboardTeams.propTypes = {
  teamStats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default LeaderboardTeams;
