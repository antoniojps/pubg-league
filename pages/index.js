import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Layout } from 'components/organisms';
import styled from 'styled-components';
import { Title, Select } from 'components/atoms';
import { Tabs } from 'components/molecules';
// import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import dummyData from 'data/league-data.json';

const seasonOptions = [
  {
    value: '2019',
    label: '2019',
  },
];

const tabs = [
  {
    title: 'Liga',
    to: '/',
  },
  {
    title: 'Qualificadores',
    to: '/qualificadores',
  },
];

const seasonDefault = '2019';

const Home = ({ tournament, playerSummaries, teamStats }) => {
  const [season, setSeason] = useState(seasonDefault);

  const handleSeasonChange = (valueSelected) => {
    setSeason(valueSelected);
  };

  useEffect(() => {
    console.log({ tournament, playerSummaries, teamStats });
  }, [tournament, playerSummaries, teamStats]);

  return (
    <HomeStyle>
      <Head>
        <title>Liga Nacional de PUBG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header>
          <Title>Resultados</Title>
          <Select
            options={seasonOptions}
            value={season}
            onSelect={handleSeasonChange}
          />
        </Header>
      </Layout>
      <Tabs tabs={[]} />
    </HomeStyle>
  );
};

Home.getInitialProps = () => {
  // const res = await fetch(
  //   'https://api.cgs.gg/mono-service/api/v2/tournament/dreamcup-portugal-temporada-2-split-3/summary'
  // )
  // const data = await res.json()
  const data = dummyData;
  return {
    ...data,
  };
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${(props) => props.theme.spacing.xs};
`;
const HomeStyle = styled.div`
  .zi-layout {
    padding-bottom: 0;
  }
`;

Home.propTypes = {
  tournament: PropTypes.shape({}),
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
};

Home.defaultProps = {
  tournament: null,
  playerSummaries: [],
  teamStats: [],
};

export default Home;
