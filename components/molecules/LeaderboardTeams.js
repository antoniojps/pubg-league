import React, { useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten, transparentize } from 'polished';
import {
  Table,
} from 'components/atoms';
import {
  TeamTableRow,
} from 'components/molecules';
import dataPlaceholder from 'data/leaderboard-teams-placeholder.json';
import { teamsType } from 'types';
import { findTeamIndividualStatsFromSummaries } from 'services/generators';


const LeaderboardTeams = ({
  teamStats, qualified, teams, loading, playerSummaries,
}) => {
  const isQualifier = useMemo(() => typeof qualified === 'number', [qualified]);

  const teamsStatsComputed = useMemo(() => {
    if (!loading && teamStats.length > 0) {
      return teamStats.map((team) => {
        const teamMemberStats = findTeamIndividualStatsFromSummaries({ teamMembers: team.teamMember, playerSummaries });
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
          teamMemberStats,
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
              rank, ref, teamId, rankPoints, killPoints, teamMember, teamMemberStats,
            }) => (
              <TeamTableRow
                key={teamId}
                rank={rank}
                teamRef={ref}
                teamId={teamId}
                rankPoints={rankPoints}
                killPoints={killPoints}
                teamMember={teamMember}
                teamMemberStats={teamMemberStats}
                loading={loading}
                teamStats={teamStats}
                qualified={qualified}
              />
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
  .team-row {
    cursor: pointer;
    &:hover {
      background-color: ${(props) => transparentize(0.9, props.theme.colors.bgInverse)} !important;
    }
    &:first-child {
        background-color: ${(props) => lighten(0.35, props.theme.colors.yellow)};
      }
    &:nth-child(even){
      background-color: #f2f2f2;
    }
  }

  table {
    tbody tr {
      &.disqualified {
        background-color: ${(props) => lighten(0.45, props.theme.colors.red)} !important;
      }
    }

    td {
      &.team {
        display: inline-flex;
        align-items: center;
        text-align: left;
        width: 100%;
      }
      &.points {
        color: ${(props) => props.theme.colors.orange};
      }
    }
  }
`;

LeaderboardTeams.propTypes = {
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
  qualified: PropTypes.number,
  teams: teamsType,
  loading: PropTypes.bool,
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
};

LeaderboardTeams.defaultProps = {
  teamStats: dataPlaceholder,
  qualified: false,
  teams: [],
  loading: false,
  playerSummaries: [],
};

export default LeaderboardTeams;
