import React, { useState, useMemo } from 'react';
import { Tournament } from 'components/organisms';
import { Select } from 'components/atoms';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Seo } from 'containers';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { below } from 'services/breakpoints';
import { contentType, contentDefaults } from 'types';
import CGS_DATA_PLACEHOLDER from '../../data/cgs-placeholder.json';
import sanity from '../../services/sanity';

const qualifiers = [
  {
    slug: 'qualificador-a',
    title: 'Qualificador 1',
  },
  {
    slug: 'qualificador-b',
    title: 'Qualificador 2',
  },
];

const TournementDetail = ({
  tournament, playerSummaries, teamStats, content: {
    teams, action, title,
  },
}) => {
  const { push, query: { slug } } = useRouter();
  const [qualifier, setQualifier] = useState(slug);

  const handleOnSelect = (value) => {
    setQualifier(value);
    push({
      pathname: '/t',
      query: { slug: value },
    }, `/t/${value}`);
  };

  const options = useMemo(() => qualifiers.map(({ slug: qualifierSlug, title: label }) => ({
    label,
    value: qualifierSlug,
  })), []);

  if (!tournament) return <Error statusCode={404} />;

  return (
    <>
      <Seo
        title={title}
        generateImgFromTitle
      />
      <Tournament tournament={tournament} teamStats={teamStats} playerSummaries={playerSummaries} qualified={8} action={action} teams={teams} title={title}>
        <TournamentMenu className="zi-layout">
          <h3>{title}</h3>
          <Select
            options={options}
            value={qualifier}
            onSelect={handleOnSelect}
          />
        </TournamentMenu>
      </Tournament>
    </>
  );
};

TournementDetail.getInitialProps = async (context) => {
  const { slug: slugQuery } = context.query;

  try {
    const content = await sanity.fetch(`
    *[_type == "tournament" && slug.current == $slug][0]{
      _id,
      title,
      cgs,
      action,
      teams[]{
        slot,
        team->{slot,name,tag,logo{asset->{url}}}
      }
    }
  `, { slug: slugQuery });

    const { cgs, _id } = content;

    if (!_id) {
      return {
        tournament: null,
      };
    }

    let data = {};
    try {
      const res = await fetch(
        `https://api.cgs.gg/mono-service/api/v2/tournament/${cgs}/summary`,
      );
      data = await res.json();
    } catch (err) {
      data = CGS_DATA_PLACEHOLDER;
    }
    return {
      content,
      ...data,
    };
  } catch (err) {
    return {};
  }
};


TournementDetail.propTypes = {
  tournament: PropTypes.shape({}),
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
  content: contentType,
};

TournementDetail.defaultProps = {
  tournament: null,
  playerSummaries: [],
  teamStats: [],
  content: contentDefaults,

};

const TournamentMenu = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    margin: 0;
  }

  ${below.md`
    h3 {
      display: none;
    }
  `}
`;


export default TournementDetail;
