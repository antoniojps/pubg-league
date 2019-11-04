import React, { useState, useMemo } from 'react';
import { Tournament } from 'components/organisms';
import { Select } from 'components/atoms';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Seo } from 'containers';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { below } from 'services/breakpoints'
import APP_DATA from '../../app.json';

const TournementDetail = ({ tournament, playerSummaries, teamStats }) => {
  const { push, query: { slug } } = useRouter();
  const [qualifier, setQualifier] = useState(slug);

  const handleOnSelect = (value) => {
    setQualifier(value);
    push({
      pathname: '/t',
      query: { slug: value },
    }, `/t/${value}`);
  };

  const options = useMemo(() => {
    const { qualifiers } = APP_DATA;
    return qualifiers.map(({ slug: qualifierSlug, title }) => ({
      label: title,
      value: qualifierSlug,
    }));
  }, []);

  const qualifierActive = useMemo(() => APP_DATA.qualifiers.find((quali) => slug === quali.slug), [options, slug]);

  if (!tournament) return <Error statusCode={404} />;
  return (
    <>
      <Seo
        title={qualifierActive.title}
      />
      <Tournament tournament={tournament} teamStats={teamStats} playerSummaries={playerSummaries} qualified={8}>
        <TournamentMenu className="zi-layout">
          <h3>{qualifierActive.title}</h3>
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
  const { qualifiers } = APP_DATA;
  const qualifier = qualifiers.find(({ slug }) => slug === slugQuery);
  if (!qualifier) {
    return {
      tournament: null,
    };
  }

  const { cgs } = qualifier;

  const res = await fetch(
    `https://api.cgs.gg/mono-service/api/v2/tournament/${cgs}/summary`,
  );
  const data = await res.json();
  return {
    ...data,
  };
};


TournementDetail.propTypes = {
  tournament: PropTypes.shape({}),
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
};

TournementDetail.defaultProps = {
  tournament: null,
  playerSummaries: [],
  teamStats: [],
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
