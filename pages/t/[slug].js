import React, { useState, useMemo } from 'react';
import { Tournament, Seo } from 'containers';
import { Select } from 'components/atoms';
import styled from 'styled-components';

import Error from 'next/error';
import { useRouter } from 'next/router';
import { below } from 'services/breakpoints';
import { contentType, contentDefaults } from 'types';
import sanity from '../../services/sanity';

const qualifiers = [
  {
    slug: 'qualifier-a',
    title: 'Qualificador 1',
  },
  {
    slug: 'qualifier-b',
    title: 'Qualificador 2',
  },
];

const TournementDetail = ({
  content: {
    teams, action, title, cgs, _id,
  },
}) => {
  const { push, query: { slug } } = useRouter();
  const [qualifier, setQualifier] = useState(slug);

  const handleOnSelect = (value) => {
    setQualifier(value);
    push({
      pathname: '/t/[slug]',
      query: { slug: value },
    }, `/t/${value}`);
  };

  const options = useMemo(() => qualifiers.map(({ slug: qualifierSlug, title: label }) => ({
    label,
    value: qualifierSlug,
  })), []);

  if (!_id) return <Error statusCode={404} />;

  return (
    <>
      <Seo
        title={title}
        generateImgFromTitle
      />
      <Tournament cgs={cgs} action={action} teams={teams} title={title}>
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

    return {
      content,
    };
  } catch (err) {
    return {};
  }
};


TournementDetail.propTypes = {
  content: contentType,
};

TournementDetail.defaultProps = {
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
