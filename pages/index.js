import React from 'react';
import { Tournament } from 'components/organisms';
import PropTypes from 'prop-types';
import { Seo } from 'containers';
import fetch from 'isomorphic-unfetch';
import sanity from 'services/sanity';
import { contentType, contentDefaults } from 'types';
import CGS_DATA_PLACEHOLDER from '../data/cgs-placeholder.json';


const Home = ({
  tournament, playerSummaries, teamStats, content: {
    title, teams, action,
  },
}) => (
  <>
    <Seo />
    <Tournament tournament={tournament} teamStats={teamStats} playerSummaries={playerSummaries} action={action} title={title} teams={teams} />
  </>
);

Home.getInitialProps = async () => {
  const slug = 'major';
  const content = await sanity.fetch(`
    *[_type == "tournament" && slug.current == $slug][0]{
      title,
      cgs,
      action,
      teams[]{
        slot,
        team->{slot,name,tag,logo{asset->{url}}}
      }
    }
  `, { slug });

  let data = {};
  try {
    const res = await fetch(
      `https://api.cgs.gg/mono-service/api/v2/tournament/${content.cgs}/summary`,
    );
    data = await res.json();
  } catch (err) {
    data = CGS_DATA_PLACEHOLDER;
  }
  return {
    ...data,
    content,
  };
};


Home.propTypes = {
  tournament: PropTypes.shape({}),
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
  content: contentType,
};

Home.defaultProps = {
  tournament: null,
  playerSummaries: [],
  teamStats: [],
  content: contentDefaults,
};

export default Home;
