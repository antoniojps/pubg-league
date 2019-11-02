import React from 'react';
import Head from 'next/head';
import { Tournament } from 'components/organisms';
import PropTypes from 'prop-types';
import dummyData from '../data/league-data.json';
// import fetch from 'isomorphic-unfetch';

const Home = ({ tournament, playerSummaries, teamStats }) => (
  <>
    <Head>
      <title>Shootsgud Major League</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Tournament tournament={tournament} teamStats={teamStats} playerSummaries={playerSummaries} />
  </>
);

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
