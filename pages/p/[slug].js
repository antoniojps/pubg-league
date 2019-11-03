import { Layout } from 'components/organisms';
import { Title } from 'components/atoms';
import BlockContent from '@sanity/block-content-to-react';
import Error from 'next/error';
import { Seo } from 'containers';
import PropTypes from 'prop-types';
import sanity from '../../services/sanity';

const Post = ({ _id, title, body }) => {
  if (!_id) return <Error statusCode={404} />;
  return (
    <>
      <Seo title={title} />
      <Layout>
        <Title>{title}</Title>
        <BlockContent blocks={body} imageOptions={{ w: 900, fit: 'max' }} {...sanity.config()} />
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
  body: PropTypes.arrayOf([PropTypes.shape({})]),
};

Post.defaultProps = {
  _id: null,
  title: '',
  body: [],
};


export default Post;
