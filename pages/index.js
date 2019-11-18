import React, {
  useEffect, useReducer,
} from 'react';
import { Tournament, Seo } from 'containers';
import styled from 'styled-components';
import { isDev } from 'services/constants';

import Error from 'next/error';
import { below } from 'services/breakpoints';
import { contentType, contentDefaults } from 'types';
import tournamentData from 'data/tournament-placeholder.json';
import sanity from 'services/sanity';

const initialState = { refetchToggle: false };

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { refetchToggle: !state.refetchToggle };
    default:
      throw new Error();
  }
}

const TournementDetail = ({
  content: {
    teams, action, title, cgs, _id, faq,
  },
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isDev && _id) {
      const query = `
      *[_type == "tournament" && slug.current == $slug][0]{
        title,
      }
    `;
      const params = { slug: 'major' };

      const subscription = sanity.listen(query, params)
        .subscribe((event) => {
          if (event.type === 'mutation' && event.transition === 'update') {
            dispatch({ type: 'toggle' });
          }
        });

      // to unsubscribe later on
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [_id]);

  if (!_id) return <Error statusCode={404} />;

  return (
    <>
      <Seo
        title={title}
        generateImgFromTitle
      />
      <Tournament
        cgs={cgs}
        action={action}
        teams={teams}
        title={title}
        faq={faq}
        refetchToggle={state.refetchToggle}
      />
    </>
  );
};

TournementDetail.getInitialProps = async () => {
  if (isDev) return { content: tournamentData };
  try {
    const content = await sanity.fetch(`
    *[_type == "tournament" && slug.current == $slug][0]{
      _id,
      title,
      cgs,
      action,
      faq,
      teams[]{
        slot,
        team->{slot,name,tag,logo{asset->{url}}}
      }
    }
  `, { slug: 'major' });

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
