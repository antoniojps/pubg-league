import React from 'react';
import { Tournament } from 'components/organisms';
import PropTypes from 'prop-types';
import { Seo } from 'containers';
import dummyData from '../data/league-data.json';
// import fetch from 'isomorphic-unfetch';

const Home = ({ tournament, playerSummaries, teamStats }) => (
  <>
    <Seo />
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
