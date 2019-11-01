import React, { useState } from 'react';
import styled from 'styled-components';
import { Spacer } from 'components/atoms';
import PropTypes from 'prop-types';

const PlayerCard = ({ player }) => {
  const [isExtended, setExtended] = useState(false);

  return (
    <Card className="zi-card">
      <Player>
        <img className="zi-avatar" src="/team-22.png" />
        <Player.Name>{player.playerName}</Player.Name>
      </Player>
      {
        isExtended ? (
          'showing more'
        ) : (
          <>
            <Stat>
              <Stat.Value>{player.kills}</Stat.Value>
              <Stat.Description>kills</Stat.Description>
            </Stat>
            <button className="zi-btn mini" onClick={() => setExtended(true)} type="button">VER MAIS...</button>
          </>
        )
      }
    </Card>
  );
};

const Card = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Player = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  .zi-avatar {
    overflow: visible;
  }
`;
Player.Name = styled.div`
  font-size: ${(props) => props.theme.sizes.xl3};
  font-weight: ${(props) => props.theme.weight.base};
  padding-left: ${(props) => props.theme.spacing.xs3};
`;

PlayerCard.propTypes = {
  player: PropTypes.shape({}),
};

PlayerCard.defaultProps = {
  label: null,
};

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.xs} 0px;
  justify-content: center;
  align-items: center;
`;
Stat.Value = styled.div`
  font-size: ${(props) => props.theme.sizes.xl4};
  font-weight: 700;
`;

Stat.Description = styled.div`

`;

export default PlayerCard;
