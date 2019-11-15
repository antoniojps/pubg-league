import { Layout } from 'components/organisms';
import { Spacer } from 'components/atoms';
import { PostCard } from 'components/molecules';
import { Seo } from 'containers';
import styled from 'styled-components';
import sanity from 'services/sanity';

const Blog = ({ content }) => (
  <>
    <Seo title="Blog" generateImgFromTitle />
    <Layout>
      <Aside>
        <Aside.Inner>
          <h1>Blog</h1>
          <p className="zi-caption">Resumos das Jornadas, notícias, avisos...</p>
        </Aside.Inner>
      </Aside>
      {content.map((post) => (
        <Spacer top="xs">
          <PostCard {...post} />
        </Spacer>
      ))}

    </Layout>
  </>
);

Blog.getInitialProps = async (context) => {
  // It's important to default the slug so that it doesn't return "undefined"
  const content = await sanity.fetch(`
    *[_type == "post"] | order(publishedAt desc)
  `);
  const contentPreview = content.map((value) => {
    const block = (value.body || []).find((block) => block._type === 'block');
    return {
      title: value.title,
      slug: value.slug,
      publishedAt: value.publishedAt,
      id: value._id,
      body: block
        ? block.children
          .filter((child) => child._type === 'span')
          .map((span) => span.text)
          .join('')
        : '',
    };
  });
  return { content: contentPreview };
};

Blog.propTypes = {
};

Blog.defaultProps = {
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

export default Blog;
