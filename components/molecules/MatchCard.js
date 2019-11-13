import React, { useMemo } from 'react';
import styled, { css, withTheme } from 'styled-components';
import { Icon, Loader } from 'components/atoms';
import PropTypes from 'prop-types';
import { pt } from 'date-fns/locale';
import { format } from 'date-fns';
import prettyMilliseconds from 'pretty-ms';

export const mapKeys = ['Baltic_Main', 'Savage_Main', 'Desert_Main', 'Erangel_Main'];

const maps = [
  {
    key: 'Savage_Main',
    name: 'Sanhok',
    icon: 'sanhok',
    image: '/sanhok-banner.png',
    color: 'green',
  },
  {
    key: 'Desert_Main',
    name: 'Miramar',
    icon: 'miramar',
    image: '/miramar-banner.png',
    color: 'yellow',
  },
  {
    key: 'Baltic_Main',
    name: 'Erangel',
    icon: 'erangel',
    image: '/erangel-banner.png',
    color: 'green',
  },
  {
    key: 'Erangel_Main',
    name: 'Erangel',
    icon: 'erangel',
    image: '/erangel-banner.png',
    color: 'green',
  },
];

const loadingMap = {
  name: 'Map',
};


const MatchCard = ({
  map,
  teamName,
  teamLogo,
  createdAt,
  duration,
  totalParticipants,
  totalTeams,
  number,
  theme,
  loading,
}) => {
  const mapData = useMemo(() => (loading ? loadingMap : maps.find(({ key }) => key === map)), [map, loading]);
  const createdDateWords = useMemo(() => {
    if (!createdAt) return '';
    const createdDate = new Date(createdAt);
    const date = format(createdDate, 'LL MMM Y', {
      locale: pt,
    });
    const hour = format(createdDate, 'H');
    const min = format(createdDate, 'mm');
    return `${date}, ${hour}h${min}min`;
  }, [createdAt]);
  const matchDuration = useMemo(() => duration && prettyMilliseconds(duration * 1000, { unitCount: 2 }), [duration]);
  const color = useMemo(() => (loading ? theme.colors.border : theme.colors[mapData.color]), [map, theme, mapData, loading]);
  return (
    <Card className="zi-card">
      <Card.Top bg={mapData.image}>
        <Team>
          {teamLogo && <Team.Logo logo={teamLogo} />}
          <Team.Name>{teamName}</Team.Name>
        </Team>
      </Card.Top>
      <Card.Bottom loading={loading}>
        <Card.BottomTop>
          <p>
            {createdDateWords}
                       :
            {matchDuration}
          </p>
          <p>
            {totalTeams}
            {' '}
          equipas,
            {' '}
            {totalParticipants}
            {' '}
          jogadores
          </p>
        </Card.BottomTop>
        <Card.Actions>
          <Card.Legend color={color}>
          #
            {number}
            {' '}
            {mapData.name}
            {/* <Spacer left="xs4">
              <Icon icon="arrow-forward" height={12} color={color} />
            </Spacer> */}
          </Card.Legend>
          <Card.Map>
            {loading ? (
              <Loader size="14px" />
            ) : (
              <Icon icon={mapData.icon} height={16} color={color} />
            )}
          </Card.Map>
        </Card.Actions>
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
    background: url(${props.logo});
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
    padding: 0;
    cursor: grab;
  `,
);

Card.BottomTop = styled.div((props) => css`
  margin-bottom: ${props.theme.spacing.xs};
`);

Card.Legend = styled.div((props) => css`
  display: flex;
  align-items: center;
  color: ${props.color || props.theme.colors.primary};
  ${props.loading && css`
    width: 70%;
    border-radius: ${props.theme.values.radius};
    background-color: ${props.theme.colors.border};
    color: ${props.theme.colors.border};
    p {
      color: ${props.theme.colors.border} !important;
    }
  `}
`);

Card.Map = styled.div`
  display: flex;
  align-items: flex-end;
`;

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
      top: 0;
      transition: opacity 0.2s ease;
      opacity: ${props.bg ? 0.4 : 0.1};
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

    p {
      margin: 0;
      margin-bottom: ${props.theme.spacing.xs};
      font-size: ${props.theme.sizes.xs} !important;
      line-height: ${props.theme.sizes.xs} !important;
      margin-bottom: ${props.theme.spacing.xs4};
      font-weight: ${props.theme.weight.light};
      color: ${props.theme.colors.grey};
      ${props.loading && css`
        border-radius: ${props.theme.values.radius};
        background-color: ${props.theme.colors.border};
        color: ${props.theme.colors.border};
      `}
    }
  `,
);

Card.Actions = styled.div(
  (props) => css`
    text-transform: uppercase;
    font-weight: ${props.theme.weight.bold};
    font-size: ${props.theme.sizes.s};
    color: ${props.theme.colors.primary};
    display: flex;
    justify-content: space-between;
    align-items: end;
  `,
);

MatchCard.propTypes = {
  map: PropTypes.oneOf(mapKeys),
  teamName: PropTypes.string,
  teamLogo: PropTypes.string,
  createdAt: PropTypes.string,
  duration: PropTypes.number,
  totalTeams: PropTypes.number,
  totalParticipants: PropTypes.number,
  number: PropTypes.number,
  theme: PropTypes.oneOfType([PropTypes.shape({})]),
  loading: PropTypes.bool,
};

MatchCard.defaultProps = {
  map: mapKeys[0],
  loading: true,
  teamName: '',
  teamLogo: null,
  createdAt: null,
  duration: 0,
  totalTeams: 0,
  totalParticipants: 0,
  number: 0,
  theme: {},
};

export default withTheme(MatchCard);
