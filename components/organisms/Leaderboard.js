import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';

const Leaderboard = ({ teamStats }) => {
  console.log({ teamStats });
  return (
    <>
      <Table.Tabs>
        <Table.Title active>
            Tabela
        </Table.Title>
        <Table.Title>
            Jogadores
        </Table.Title>
        <Table.Title>
            Equipas
        </Table.Title>
      </Table.Tabs>
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
                <td className="team">
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
    </>
  );
};

const Table = styled.table`
  th, td {
    text-align: center;
    border: 0;
  }
  th {
    font-size: ${(props) => props.theme.sizes.xs};
    text-transform: uppercase;
    border: 0 !important;
  }
  th.team {
    width: 50%;
    text-align: left;
  }
  td {
    font-size: ${(props) => props.theme.sizes.xl};
    color: ${(props) => props.theme.colors.base};
    font-weight: ${(props) => props.theme.weight.base};
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
  teamStats: PropTypes.shape({}).isRequired,
};


export default Leaderboard;
