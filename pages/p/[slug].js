import { useMemo } from 'react';
import { Layout, Sponsors } from 'components/organisms';
import BlockContent from '@sanity/block-content-to-react';
import Error from 'next/error';
import { Seo } from 'containers';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pt } from 'date-fns/locale';
import { format, formatDistance } from 'date-fns';

import sanity from '../../services/sanity';


const Post = ({
  _id, title, body, publishedAt,
}) => {
  if (!_id) return <Error statusCode={404} />;

  const date = useMemo(() => {
    const publishedDate = new Date(publishedAt);
    const nowDate = new Date();
    const dateInWords = format(publishedDate, 'EEEE, d LLLL yyyy', { locale: pt });
    const dateDistance = formatDistance(publishedDate, nowDate, { locale: pt });
    return `Publicado - ${dateInWords} (à ${dateDistance})`;
  },
  [publishedAt]);

  return (
    <>
      <Seo title={title} generateImgFromTitle />
      <Layout>
        <Aside>
          <Aside.Inner>
            <h1>{title}</h1>
            <p className="zi-caption">{date}</p>
          </Aside.Inner>
        </Aside>
        <ReadingContainer>
          <BlockContent blocks={body} imageOptions={{ w: 900, fit: 'max' }} {...sanity.config()} />
        </ReadingContainer>
      </Layout>
    </>
  );
};

Post.getInitialProps = async (context) => {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query;
  const content = await sanity.fetch(`
    *[_type == "post" && slug.current == $slug][0]
  `, { slug });
  return { ...content };
};

Post.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.arrayOf(PropTypes.shape({})),
};

Post.defaultProps = {
  _id: null,
  title: '',
  body: [],
};

const Aside = styled.aside`
  margin-top: ${(props) => props.theme.spacing.m};
`;

Aside.Inner = styled.div`
  h1 {
    color: #000;
    font-weight: 600;
    max-width: 900px;
    text-align: center;
    margin: 0px auto;
  }
`;

const ReadingContainer = styled.div`
  max-width: 682px;
  margin-left: auto;
  margin-right: auto;
  a {
    color :${(props) => props.theme.colors.primary};
  }
`;

export default Post;
