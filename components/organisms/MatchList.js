import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MatchCard } from 'components/molecules';
import styled, { css } from 'styled-components';
import { matchType, teamsType } from 'types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import useBreakpoints from 'hooks/useBreakpoints';

const MatchList = ({ matches, loading, teams }) => {
  const matchesOrdered = useMemo(() => matches.sort((matchA, matchB) => {
    const { createdAt: createdAtA } = matchA;
    const { createdAt: createdAtB } = matchB;
    if (createdAtA > createdAtB) return 1;
    if (createdAtA < createdAtB) return -1;
    return 0;
  }), [matches]);

  const matchesWithTeams = useMemo(() => matchesOrdered.map((match) => {
    const teamReference = teams.find(({ slot }) => match.winner.teamId === slot);

    let teamData = {};
    let restTeamData = {};
    let teamLogo = null;
    if (teamReference) {
      teamData = teamReference.team;
      const { logo, ...rest } = teamData;
      if (logo && logo.asset && logo.asset.url) teamLogo = logo.asset.url;
      restTeamData = rest;
    }
    const computed = {
      ...match,
      winner: {
        ...match.winner,
        data: {
          ...restTeamData,
          logo: teamLogo,
        },
      },
    };

    return computed;
  }), [matchesOrdered, teams]);

  const sliderSettings = useMemo(() => {
    return {
      infinite: false,
      arrows: false,
      slidesToShow: 3,
      initialSlide: matches.length - 3,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            initialSlide: matches.length - 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            initialSlide: matches.length - 1,
          },
        },
      ],
    };
  }, [matches]);
  return (
    <div>
      <h4>Jogos</h4>
      <Wrapper>
        {matches.length > 0
          ? (
            <Slider
              {...sliderSettings}
            >
              {
                matchesWithTeams.map((match, index) => (
                  <MatchCard
                    key={match.matchId}
                    teamLogo={match.winner.data.logo}
                    teamName={match.winner.data.name}
                    loading={loading}
                    number={index + 1}
                    modifiers={[index === 0 ? 'spacingLeft' : '', index === (match.totalTeams - 1) ? 'spacingRight' : '']}
                    {...match}
                  />
                ))
              }
            </Slider>
          )
          : <MatchCard loading />}
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div((props) => css`
  margin-top: ${props.theme.spacing.xs};
  .slick-slide {
    padding-bottom: 20px;
    padding-right: ${props.theme.spacing.xs4};
    padding-left: ${props.theme.spacing.xs4};
  }
  .slick-slider {
    display: flex;
  }

`);

MatchList.propTypes = {
  matches: PropTypes.arrayOf(matchType),
  loading: PropTypes.bool,
  teams: teamsType,
};

MatchList.defaultProps = {
  matches: [],
  loading: true,
  teams: [],
};

export default MatchList;
