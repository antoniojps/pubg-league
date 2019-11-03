import React from 'react';
import { Tournament } from 'components/organisms';
import { Select } from 'components/atoms';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Seo } from 'containers';
import dummyData from '../data/league-data.json';
// import fetch from 'isomorphic-unfetch';

const TournementDetail = ({ tournament, playerSummaries, teamStats }) => (
  <>
    <Seo
      title="Qualificadores"
    />
    <Tournament tournament={tournament} teamStats={teamStats} playerSummaries={playerSummaries} qualified={8}>
      <TournamentMenu className="zi-layout">
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
`;


export default TournementDetail;
