import React from 'react';
import { BadgeStat, Spacer, TeamLogo } from 'components/atoms';
import styled, { css } from 'styled-components';
import useToggle from 'hooks/useToggle';

const TeamTableRow = ({
  rank, teamRef, teamId, rankPoints, killPoints, teamMember, loading, teamStats, teamMemberStats, qualified,
}) => {
  const [isOpen, toggle] = useToggle();

  const handleRowClick = () => {
    toggle();
  };

  return (
    <>
      <tr key={teamId} onClick={handleRowClick} className={(qualified && rank > qualified) ? 'team-row disqualified' : 'team-row'}>
        <td>
                        #
          {rank}
        </td>
        <td className="team">
          {teamRef && teamRef.name ? (
            <>
              <Spacer right="xs3">
                <TeamLogo src={teamRef.logo} name={teamRef.name} tag={teamRef.tag} loading={loading} />
              </Spacer>
              <TeamName loading={loading || teamStats.length === 0}>
                {teamRef.name}
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
      {(teamMemberStats && teamMemberStats.length > 0 && isOpen) && (
        <>
          <tr>
            <td />
            <td className="left header">Nome</td>
            <td className="header">K/D</td>
            <td className="header">ADR</td>
            <td className="header">KILLS</td>
          </tr>
          {teamMemberStats.map(({ playerName, computed: { kd, adr }, kills }) => (
            <tr key={playerName}>
              <td className="small" />
              <td className="small left">
                {playerName}
              </td>
              <td className="small">
                <BadgeStat value={kd} great={kd >= 2.5} good={kd >= 1.5} />
              </td>
              <td className="small">
                <BadgeStat value={adr} great={adr >= 300} good={adr >= 200} />
              </td>
              <td className="small">
                <BadgeStat value={kills} />
              </td>
            </tr>
          ))}
        </>
      )}
    </>
  );
};

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

export default TeamTableRow;
