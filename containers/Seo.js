import React, { useMemo } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import SEO_DATA from '../app.json';

const Seo = ({ title, description, generateImgFromTitle }) => {
  const computedTitle = useMemo(() => {
    if (title) return `${title} - ${SEO_DATA.title}`;
    return SEO_DATA.title;
  },
  [title]);


  const computedImg = useMemo(() => {
    const titleEncoded = encodeURI(title);
    const generatedImg = `https://og-image.xixinhora.now.sh/${titleEncoded}.png?theme=light&md=1&fontSize=200px&images=https%3A%2F%2Fmajor.shootsgud.com%2Fsml_wide_blbg.png`;
    const defaultImg = SEO_DATA.url + SEO_DATA.image.src;
    return generateImgFromTitle ? generatedImg : defaultImg;
  }, [title, generateImgFromTitle]);

  return (
    <Head>
      <title>{computedTitle}</title>
      <meta name="description" key="description" content={description || SEO_DATA.description} />
      <meta name="keywords" key="keywords" content={SEO_DATA.keywords.join(' ')} />
      {/* Facebook & search engines */}
      <meta property="og:url" key="og:url" content={SEO_DATA.url} />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:title" key="og:title" content={computedTitle} />
      <meta property="og:description" key="og:description" content={description || SEO_DATA.description} />
      <meta property="og:site_name" key="og:site_name" content={computedTitle} />
      <meta property="og:image" key="og:image" content={computedImg} />
      <meta property="og:image:width" key="og:image:width" content={SEO_DATA.image.width} />
      <meta property="og:image:height" key="og:image:height" content={SEO_DATA.image.height} />
      {/* Twitter */}
      <meta property="twitter:card" key="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" key="twitter:url" content={SEO_DATA.url} />
      <meta property="twitter:title" key="twitter:title" content={computedTitle} />
      <meta property="twitter:description" key="twitter:description" content={description || SEO_DATA.description} />
      <meta property="twitter:image" key="twitter:image" content={computedImg} />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  generateImgFromTitle: PropTypes.bool,
};

Seo.defaultProps = {
  title: null,
  description: null,
  generateImgFromTitle: false,
};

export default Seo;
