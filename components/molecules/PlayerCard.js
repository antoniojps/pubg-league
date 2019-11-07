import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, TeamLogo } from 'components/atoms';
import { below, above } from 'services/breakpoints';

const PlayerCard = ({
  player, filter, small, className, loading, placeholder,
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
          <TeamLogo src={team.logo} name={team.name} tag={team.tag && (loading ? '...' : null)} />
        </div>
        <Player.Name small={small} loading={loading}>{placeholder ? 'TBD' : (player && player.playerName) }</Player.Name>
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
            <Stat.Value large={!small} medium={!!small} loading={loading}>{highlighted.value}</Stat.Value>
            <Stat.Description large={!small} loading={loading}>{highlighted.label}</Stat.Description>
          </Stat>
        )
        }
        <Action loading={loading}>
          <button className="zi-btn mini" onClick={() => setExtended(!isExtended)} type="button">{computedBtnMessage}</button>
        </Action>
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
      padding-bottom: ${props.theme.spacing.xs3};
    }
  `)}
`;
Player.Name = styled.div((props) => css`
  font-size: ${props.small ? props.theme.sizes.l : props.theme.sizes.xl3};
  font-weight: ${props.theme.weight.base};
  padding-left: ${props.theme.spacing.xs3};
  ${props.loading && css`
    padding-left: 0;
    margin-left: ${props.theme.spacing.xs3};
    width: 100%;
    border-radius: ${props.theme.values.radius};
    background-color: ${props.theme.colors.border};
    color: ${props.theme.colors.border};

  `}
`);

PlayerCard.propTypes = {
  player: PropTypes.shape({}).isRequired,
  filter: PropTypes.oneOf(['kd', 'kills', 'damage', 'adr', 'dbnos', 'wins', 'alive']),
  small: PropTypes.bool,
  loading: PropTypes.bool,
  placeholder: PropTypes.bool,
  className: PropTypes.string,
};

PlayerCard.defaultProps = {
  filter: 'kills',
  small: false,
  loading: false,
  placeholder: false,
  className: '',
};

const Action = styled.div((props) => css`
  margin-top: ${props.theme.spacing.xs2};
  transition: all .3s ease;
  opacity: ${props.loading ? 0 : 1};
`);

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => (props.large ? props.theme.spacing.xs2 : 0)};
  justify-content: center;
  align-items: center;
`;
Stat.Value = styled.div((props) => css`
  font-size: ${(props.large ? props.theme.sizes.xl4 : props.theme.sizes.base)};
  font-size: ${(props.medium && props.theme.sizes.xl)};
  font-size: ${(props.small && props.theme.sizes.xs)};
  font-weight: 700;
  color: ${(props.great && props.theme.colors.red) || (props.good && props.theme.colors.orange)};
  text-align: center;

  ${props.loading && css`
    border-radius: 5px;
    height: ${(props.large ? props.theme.sizes.xl3 : props.theme.sizes.s)};
    height: ${(props.medium && props.theme.sizes.x)};
    height: ${(props.small && props.theme.sizes.xs2)};
    width: ${(props.large ? props.theme.sizes.xl3 : props.theme.sizes.s)};
    width: ${(props.medium && props.theme.sizes.x)};
    width: ${(props.small && props.theme.sizes.xs2)};
    padding: 0 24px 10px 24px;
    background-color: ${props.theme.colors.border};
    color: rgba(0,0,0,0);
  `}
`);

Stat.Description = styled.div((props) => css`
  font-size: ${(props.large ? props.theme.sizes.base : props.theme.sizes.xs)};
  text-transform: uppercase;
  font-weight: ${props.theme.weight.light};
  transition: all .3s ease;
  opacity: ${props.loading ? 0 : 1};
`);

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
