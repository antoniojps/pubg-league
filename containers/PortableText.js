import React from 'react';
import PortableTextBase from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';
import sanity from 'services/sanity';

const serializers = {
  marks: {
    link: ({ mark, children }) => {
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = mark;
      return blank
        ? <a href={href} target="_blank" rel="noopener">{children}</a>
        : <a href={href}>{children}</a>;
    },
  },
};

const PortableText = ({ body }) => (
  <PortableTextBase
    blocks={body}
    imageOptions={{ w: 900, fit: 'max' }}
    serializers={serializers}
    {...sanity.config()}
  />
);

PortableText.propTypes = {
  body: PropTypes.arrayOf(PropTypes.shape({})),
};

PortableText.defaultProps = {
  body: [],
};

export default PortableText;
