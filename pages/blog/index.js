import { Layout } from 'components/organisms';
import { Seo } from 'containers';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Blog = () => (
  <>
    <Seo title="Blog" generateImgFromTitle />
    <Layout>
      <Aside>
        <Aside.Inner>
          <h1>Blog</h1>
          <p className="zi-caption">Resumos das Jornadas, notícias, avisos...</p>
        </Aside.Inner>
      </Aside>
      <p className="zi-note">Página em desenvolvimento!</p>

    </Layout>
  </>
);

Blog.getInitialProps = async () => ({});

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
