import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Spacer, Icon } from 'components/atoms';

const PlayerCard = ({
  player, filter, small, className,
}) => {
  const [isExtended, setExtended] = useState(false);

  const playerStats = useMemo(() => {
    const {
      kills, dbnos, damage, computed: {
        adr, kd, wins, alive,
      },
    } = player;
    return [
      {
        label: 'kills',
        value: kills,
        key: 'kills',
      },
      {
        label: 'k/d',
        value: kd,
        highlight: kd > 1.5,
        good: kd > 1,
        great: kd > 1.5,
        key: 'kd',
      },
      {
        label: 'damage',
        value: Math.round(damage),
        key: 'damage',
      },
      {
        label: 'adr',
        value: adr,
        good: adr > 200,
        great: adr > 300,
        key: 'adr',
      },
      {
        label: 'wins',
        value: wins,
        key: 'wins',
      },
      {
        label: 'alive',
        value: alive,
        key: 'alive',
      },
    ];
  }, [player]);

  const computedBtnMessage = useMemo(() => (isExtended ? <Icon icon="expand-less" /> : 'Ver mais...'),
    [isExtended]);

  const highlighted = useMemo(
    () => playerStats.find((stat) => stat.key === filter),
    [filter, playerStats],
  );

  return (
    <Card className={`zi-card ${className}`} small={small}>
      <Player small={small}>
        <Player.Name small={small}>{player.playerName}</Player.Name>
      </Player>
      <StatWrapper>
        {
        isExtended ? (
          <StatGrid>
            {
              playerStats.map(({
                label, value, good, great,
              }) => (
                <Stat>
                  <Stat.Value good={good} great={great} small={small}>{value}</Stat.Value>
                  <Stat.Description>{label}</Stat.Description>
                </Stat>
              ))
            }
          </StatGrid>
        ) : (
          <>
            <Stat large={!small}>
              <Stat.Value large={!small} medium={!!small}>{highlighted.value}</Stat.Value>
              <Stat.Description large={!small}>{highlighted.label}</Stat.Description>
            </Stat>
          </>
        )
        }
      </StatWrapper>
      <Spacer top="xs2">
        <button className="zi-btn mini" onClick={() => setExtended(!isExtended)} type="button">{computedBtnMessage}</button>
      </Spacer>
    </Card>
  );
};

const Card = styled.div`
  padding: ${(props) => (props.small ? props.theme.spacing.xs3 : '1rem')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const Player = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-bottom: ${(props) => (props.small ? props.theme.spacing.xs4 : props.theme.spacing.xs)};
  .zi-avatar {
    overflow: visible;
  }
`;
Player.Name = styled.div`
  font-size: ${(props) => (props.small ? props.theme.sizes.l : props.theme.sizes.xl3)};
  font-weight: ${(props) => props.theme.weight.base};
  padding-left: ${(props) => props.theme.spacing.xs3};
`;

PlayerCard.propTypes = {
  player: PropTypes.shape({}).isRequired,
  filter: PropTypes.oneOf(['kd', 'kills', 'damage', 'adr', 'dbnos', 'wins', 'alive']),
  small: PropTypes.bool,
  className: PropTypes.string,
};

PlayerCard.defaultProps = {
  filter: 'kills',
  small: false,
  className: '',
};

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => (props.large ? props.theme.spacing.xs2 : 0)};
  justify-content: center;
  align-items: center;
`;
Stat.Value = styled.div`
  font-size: ${(props) => (props.large ? props.theme.sizes.xl4 : props.theme.sizes.base)};
  font-size: ${(props) => (props.medium && props.theme.sizes.xl)};
  font-size: ${(props) => (props.small && props.theme.sizes.xs)};
  font-weight: 700;
  color: ${(props) => (props.great && props.theme.colors.red) || (props.good && props.theme.colors.orange)};
`;

Stat.Description = styled.div`
  font-size: ${(props) => (props.large ? props.theme.sizes.base : props.theme.sizes.xs)};
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.weight.light};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
`;

const StatWrapper = styled.div`
  min-width: 150px;
`;


export default PlayerCard;
