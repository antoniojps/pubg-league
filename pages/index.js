import React from 'react';
import { Tournament } from 'components/organisms';
import PropTypes from 'prop-types';
import { Seo } from 'containers';
import fetch from 'isomorphic-unfetch';
import APP_DATA from '../app.json';


const Home = ({ tournament, playerSummaries, teamStats }) => (
  <>
    <Seo />
    <Tournament tournament={tournament} teamStats={teamStats} playerSummaries={playerSummaries} action={APP_DATA.major.action} />
  </>
);

Home.getInitialProps = async () => {
  const res = await fetch(
    `https://api.cgs.gg/mono-service/api/v2/tournament/${APP_DATA.major.cgs}/summary`,
  );
  const data = await res.json();

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
