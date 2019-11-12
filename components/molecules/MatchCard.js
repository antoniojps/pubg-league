import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { pt } from 'date-fns/locale';
import { format, formatDistance } from 'date-fns';

const mapKeys = ['Baltic_Main', 'Savage_Main', 'Desert_Main', 'Erangel_Main'];

const maps = [
  {
    key: 'Savage_Main',
    name: 'Sanhok',
    image: '/sanhok-banner.png',
  },
  {
    key: 'Desert_Main',
    name: 'Miramar',
    image: '/miramar-banner.png',
  },
  {
    key: 'Baltic_Main',
    name: 'Erangel',
    image: '/erangel-banner.png',
  },
  {
    key: 'Erangel_Main',
    name: 'Erangel',
    image: '/erangel-banner.png',
  },
];

const MatchCard = ({
  map,
  teamName,
  teamLogo,
  createdAt,
  duration,
  totalParticipants,
  totalTeams,
}) => {
  const mapData = useMemo(() => maps.find(({ key }) => key === map), [map]);
  const createdDateWords = useMemo(() => {
    const createdDate = new Date(createdAt);
    const date = format(createdDate, 'LL MMM Y', {
      locale: pt,
    });
    const hour = format(createdDate, 'H');
    const min = format(createdDate, 'mm');
    return `${date}, ${hour}h${min}min`;
  }, [createdAt]);

  return (
    <Card className="zi-card">
      <Card.Top bg={mapData.image}>
        <Team>
          {teamLogo && <Team.Logo logo={teamLogo} />}
          <Team.Name>{teamName}</Team.Name>
        </Team>
      </Card.Top>
      <Card.Bottom>
        <p>
          Iniciou a 
{' '}
<span className="bold">{createdDateWords}</span>
        </p>
      </Card.Bottom>
    </Card>
  );
};

const Team = styled.div(
  (props) => css`
    position: relative;
    display: flex;
    z-index: 100;
    align-items: center;
    padding: ${props.theme.spacing.xs2};
  `,
);

Team.Logo = styled.div(
  (props) => css`
    width: 80px;
    height: 80px;
    background: url(${props.logo || '/erangel-banner.png'});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: -8%;
    left: ${props.theme.spacing.xs2};
  `,
);

Team.Name = styled.div(
  (props) => css`
    color: ${props.theme.colors.baseInverse};
    font-weight: ${props.theme.weight.xbold};
    font-size: ${props.theme.sizes.xl};
    margin-left: calc(80px + 10px);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
);

const Card = styled.div(
  (props) => css`
    width: 300px;
    padding: 0px;
    transition: box-shadow 0.2s ease 0s;
    cursor: pointer;
    &:hover {
      box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.12) !important;
    }
  `,
);

Card.Top = styled.div(
  (props) => css`
    background-color: ${props.theme.colors.bgInverse};
    border-top-right-radius: ${props.theme.values.radius};
    border-top-left-radius: ${props.theme.values.radius};
    height: 66px;
    position: relative;
    overflow: hidden;
    display: flex;
    &:after {
      content: '';
      background: url(${props.bg || '/erangel-banner.png'});
      opacity: 0.4;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
    }
  `,
);

Card.Bottom = styled.div(
  (props) => css`
    padding: ${props.theme.spacing.xs2};
    span.bold {
      font-weight: ${props.theme.weight.bold};
    }
  `,
);

MatchCard.propTypes = {
  map: PropTypes.oneOf(mapKeys),
  teamName: PropTypes.string.isRequired,
  teamLogo: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  totalTeams: PropTypes.string.isRequired,
  totalParticipants: PropTypes.string.isRequired,
};

MatchCard.defaultProps = {
  map: mapKeys[0],
};

export default MatchCard;
