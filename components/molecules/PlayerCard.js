import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import prettyMilliseconds from 'pretty-ms';
import { Spacer } from 'components/atoms';

const PlayerCard = ({ player }) => {
  const [isExtended, setExtended] = useState(false);
  const playerStats = useMemo(() => {
    const {
      kills, dbnos, damage, headshotKills, survivedTime, playerMatchStat: matches,
    } = player;
    const matchesPlayed = matches.length;
    const matchesDead = matches.filter(({ participant: { deathType } }) => deathType !== 'alive');
    const deaths = matchesDead.length;
    const kd = (kills / deaths).toFixed(2);
    const adr = Math.round(damage / matchesPlayed);

    const alive = prettyMilliseconds(survivedTime * 1000, { unitCount: 2 });
    return [
      {
        label: 'kills',
        value: kills,
      },
      {
        label: 'adr',
        value: adr,
      },
      {
        label: 'kd',
        value: kd,
      },
      {
        label: 'dbnos',
        value: dbnos,
      },
      {
        label: 'hs',
        value: headshotKills,
      },
      {
        label: 'alive',
        value: alive,
      },
    ];
  }, player);

  const computedBtnMessage = useMemo(() => (isExtended ? 'Ver menos' : 'Ver mais...'),
    [isExtended]);

  return (
    <Card className="zi-card">
      <Player>
        <img className="zi-avatar" src="/team-22.png" />
        <Player.Name>{player.playerName}</Player.Name>
      </Player>
      {
        isExtended ? (
          <StatGrid>
            {
              playerStats.map(({ label, value }) => (
                <Stat>
                  <Stat.Value>{value}</Stat.Value>
                  <Stat.Description>{label}</Stat.Description>
                </Stat>
              ))
            }
          </StatGrid>
        ) : (
          <>
            <Stat large>
              <Stat.Value large>{player.kills}</Stat.Value>
              <Stat.Description large>kills</Stat.Description>
            </Stat>
          </>
        )
      }
      <Spacer top="xs2">
        <button className="zi-btn mini" onClick={() => setExtended(!isExtended)} type="button">{computedBtnMessage}</button>
      </Spacer>
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
  padding-bottom: ${(props) => props.theme.spacing.xs};
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
  player: PropTypes.shape({}).isRequired,
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
  font-weight: 700;
`;

Stat.Description = styled.div`
  font-size: ${(props) => (props.large ? props.theme.sizes.base : props.theme.sizes.xs)};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;

`;


export default PlayerCard;
