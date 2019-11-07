import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';
import { Table, TeamLogo, Spacer } from 'components/atoms';
import dataPlaceholder from 'data/leaderboard-teams-placeholder.json';
import { teamsType } from 'types';

const LeaderboardTeams = ({
  teamStats, qualified, teams, loading,
}) => {
  const isQualifier = useMemo(() => typeof qualified === 'number', [qualified]);

  const teamsStatsComputed = useMemo(() => {
    if (!loading && teamStats.length > 0) {
      return teamStats.map((team) => {
        const teamReference = teams.find(({ slot }) => team.teamId === slot);
        let teamData = {};
        let restTeamData = {};
        let teamLogo = null;
        if (teamReference) {
          teamData = teamReference.team;
          const { logo, ...rest } = teamData;
          if (logo && logo.asset && logo.asset.url) teamLogo = logo.asset.url;
          restTeamData = rest;
        }
        return {
          ...team,
          ref: {
            ...restTeamData,
            logo: teamLogo,
          },
        };
      });
    }
    return dataPlaceholder;
  }, [teamStats, teams, loading]);

  return (
    <TableTeams isQualifier={isQualifier} qualified={qualified}>
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
              teamsStatsComputed.map(({
                rank, ref, teamId, rankPoints, killPoints, teamMember,
              }) => (
                <tr key={teamId}>
                  <td>
                      #
                    {rank}
                  </td>
                  <td className="team">
                    {ref && ref.name ? (
                      <>
                        <Spacer right="xs3">
                          <TeamLogo src={ref.logo} name={ref.name} tag={ref.tag} loading={loading} />
                        </Spacer>
                        <TeamName loading={loading || teamStats.length === 0}>
                          {ref.name}
                        </TeamName>
                      </>
                    ) : (
                      <TeamMembers>
                        {teamMember.join(', ')}
                      </TeamMembers>
                    )}

                  </td>
                  <td>{loading ? <Points /> : rankPoints}</td>
                  <td>{loading ? <Points /> : killPoints}</td>
                  <td className="points">{loading ? <Points /> : rankPoints + killPoints}</td>
                </tr>
              ))
              }
        </tbody>
      </Table>
      {isQualifier && (
      <p className="zi-caption">
Qualificam-se as equipas a partir do
        {' '}
        {qualified}
º lugar.
      </p>
      )}
    </TableTeams>
  );
};

const TableTeams = styled.div`
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
      &:nth-child(${(props) => `n+${props.qualified + 1}`}){
        ${(props) => props.isQualifier && 'background-color: #ffe2e2'};
      }
    }

    td {
      &.team {
        display: inline-flex;
        align-items: center;
        text-align: left;
      }
      &.points {
        color: ${(props) => props.theme.colors.orange};
      }
    }
  }
`;

const Points = styled.div((props) => css`
    background-color: ${props.theme.colors.bgInverse};
    color: ${props.theme.colors.bgInverse};
    font-size: 10px;
    opacity: 0.1;
    border-radius: ${props.theme.values.radius};
    width: 12px;
    height: 14px;
    margin-left: auto;
    margin-right: auto;
`);

const TeamName = styled.div((props) => css`
  opacity: 1;
  transition: opacity .3s ease;
  ${props.loading && css`
    background-color: ${props.theme.colors.bgInverse};
    color: ${props.theme.colors.bgInverse};
    font-size: 10px;
    opacity: 0.1;
    border-radius: ${props.theme.values.radius};
    min-width: 150px;
  `}
`);

const TeamMembers = styled.div((props) => css`
  font-size: ${props.theme.sizes.xs};
  font-weight: ${props.theme.weight.light};
  display: flex;
  align-items: center;
`);

LeaderboardTeams.propTypes = {
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
  qualified: PropTypes.number,
  teams: teamsType,
  loading: PropTypes.bool,
};

LeaderboardTeams.defaultProps = {
  teamStats: dataPlaceholder,
  qualified: false,
  teams: [],
  loading: false,
};

export default LeaderboardTeams;
