import React from 'react';
import Head from 'next/head';
import { Tournament } from 'components/organisms';
import { Select } from 'components/atoms';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dummyData from '../data/league-data.json';
// import fetch from 'isomorphic-unfetch';

const TournementDetail = ({ tournament, playerSummaries, teamStats }) => (
  <>
    <Head>
      <title>Liga Nacional de PUBG</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Tournament tournament={tournament} teamStats={teamStats} playerSummaries={playerSummaries} qualified={8}>
      <TournamentMenu className="zi-layout">
        <h2>Qualificadores A</h2>
        <Select options={[{ label: 'Qualificador A', value: 'a' }, { label: 'Qualificador B', value: 'b' }]} value="a" onSelect={(value) => null} />
      </TournamentMenu>
    </Tournament>
  </>
);

TournementDetail.getInitialProps = async () => {
  // const res = await fetch(
  //   'https://api.cgs.gg/mono-service/api/v2/tournament/dreamcup-portugal-temporada-2-split-3/summary'
  // )
  // const data = await res.json()
  const data = dummyData;
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
  h2 {
    margin: 0;
  }
`;


export default TournementDetail;
