import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Spacer, Icon, TeamLogo } from 'components/atoms';
import { below, above } from 'services/breakpoints';

const PlayerCard = ({
  player, filter, small, className,
}) => {
  const [isExtended, setExtended] = useState(false);

  const playerStats = useMemo(() => {
    if (!player) {
      return [{
        label: 'kills',
        value: 0,
        key: 'kills',
      },
      {
        label: 'k/d',
        value: 0,
        highlight: 0 > 1.5,
        good: 0 > 1,
        great: 0 > 1.5,
        key: 'kd',
      },
      {
        label: 'damage',
        value: Math.round(0),
        key: 'damage',
      },
      {
        label: 'adr',
        value: 0,
        good: 0 > 200,
        great: 0 > 300,
        key: 'adr',
      },
      {
        label: 'wins',
        value: 0,
        key: 'wins',
      },
      {
        label: 'dbnos',
        value: 0,
        key: 'dbnos',
      }];
    }
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
        label: 'dbnos',
        value: dbnos,
        key: 'dbnos',
      },
    ];
  }, [player]);

  const computedBtnMessage = useMemo(() => (isExtended ? <Icon icon="expand-less" /> : 'Ver mais...'),
    [isExtended]);

  const highlighted = useMemo(
    () => {
      const highlightedStat = playerStats.find((stat) => stat.key === filter);
      if (!highlightedStat) {
        return {
          value: 0,
          label: 'kills',
        };
      }
      return highlightedStat;
    },
    [filter, playerStats],
  );

  const team = useMemo(() => {
    if (player && player.computed && player.computed.team) {
      const { ref } = player.computed.team;

      return {
        ...ref,
      };
    }
    return {
      logo: null,
      name: '',
      tag: '',
    };
  }, [player]);

  return (
    <Card className={`zi-card ${className}`} small={small}>
      <Player small={small}>
        <div className="logo">
          <TeamLogo src={team.logo} name={team.name} tag={team.tag} />
        </div>
        <Player.Name small={small}>{(player && player.playerName) || 'TBD' }</Player.Name>
      </Player>
      <StatWrapper>
        {
        isExtended ? (
          <StatGrid>
            {
              playerStats.map(({
                label, value, good, great,
              }) => (
                <Stat key={label}>
                  <Stat.Value good={good} great={great} small={small}>{value}</Stat.Value>
                  <Stat.Description>{label}</Stat.Description>
                </Stat>
              ))
            }
          </StatGrid>
        ) : (

          <Stat large={!small}>
            <Stat.Value large={!small} medium={!!small}>{highlighted.value}</Stat.Value>
            <Stat.Description large={!small}>{highlighted.label}</Stat.Description>
          </Stat>
        )
        }
        <Spacer top="xs2">
          <button className="zi-btn mini" onClick={() => setExtended(!isExtended)} type="button">{computedBtnMessage}</button>
        </Spacer>
      </StatWrapper>
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

  .zi-btn mini {
    padding: 0;
  }
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
  ${above.md((props) => css`
    .logo {
      padding-bottom: ${props.small ? props.theme.spacing.xs3 : 0};
    }
  `)}
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
  text-align: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  ${below.md`
    margin-right: ${(props) => props.theme.spacing.xs};
    margin-left: ${(props) => props.theme.spacing.xs};
  `}
`;


export default PlayerCard;
