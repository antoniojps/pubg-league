import React from 'react';
import { Tournament, Seo } from 'containers';

import { contentType, contentDefaults } from 'types';
import sanity from 'services/sanity';

const Home = ({
  content: {
    teams, action, title, cgs,
  },
}) => (
  <>
    <Seo
      title={title}
    />
    <Tournament cgs={cgs} action={action} teams={teams} title={title} />
  </>
);

Home.getInitialProps = async () => {
  const slugQuery = 'major';

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


Home.propTypes = {
  content: contentType,
};

Home.defaultProps = {
  content: contentDefaults,
};

export default Home;
