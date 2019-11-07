import React from 'react';
import { PlayerItem, Spacer, TeamLogo } from 'components/atoms';
import styled, { css } from 'styled-components';
import useToggle from 'hooks/useToggle';

const TeamTableRow = ({
  rank, teamRef, teamId, rankPoints, killPoints, teamMember, loading, teamStats, teamMemberStats,
}) => {
  const [isOpen, toggle] = useToggle();

  const handleRowClick = () => {
    console.log('row click');
    toggle();
  };

  return (
    <>
      <tr key={teamId} onClick={handleRowClick}>
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
      {true && teamMemberStats && teamMemberStats.length > 0 && (
        <tr>
          <Players colSpan="6">
            {teamMemberStats.map((player) => (
              <PlayerItem player={player} />
            ))}
          </Players>
        </tr>
      )}
    </>
  );
};

const Players = styled.td((props) => css`
  width: 100%;
  padding: ${props.theme.spacing.xs};
  text-align: left !important;
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
