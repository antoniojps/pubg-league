import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { BadgeStat } from 'components/atoms';

const PlayerItem = ({ player }) => (
  <Player>
    {player.playerName}
    <Player.Stats>
      <BadgeStat value={player.computed.kd} label="KD" good={player.computed.kd > 1.5} great={player.computed.kd > 2} />
    </Player.Stats>
  </Player>
);

const Player = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => transparentize(0.3, props.theme.colors.bgInverse)};
  padding-bottom: ${(props) => props.theme.spacing.xs4};
  display: flex;
  align-items: center;
`;

Player.Stats = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.theme.spacing.xs3};
`;

PlayerItem.propTypes = {
  player: PropTypes.shape({
    playerName: PropTypes.string,
    computed: PropTypes.shape({
      kd: PropTypes.number,
    }),
  }),
};

PlayerItem.defaultProps = {
  label: 'emoji',
};

export default PlayerItem;
