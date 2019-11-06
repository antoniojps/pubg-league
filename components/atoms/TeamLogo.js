import React from 'react';
import PropTypes from 'prop-types';

const TeamLogo = ({ src, tag, name }) => {
  if (!tag) return null;


  if (!src) {
    return (
      <span className="zi-avatar" title={name}>
        <span className="zi-avatar-string">{tag}</span>
      </span>
    );
  }

  return (
    <img className="zi-avatar" src={src} alt={name} />
  );
};

TeamLogo.propTypes = {
  src: PropTypes.string,
  tag: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

TeamLogo.defaultProps = {
  src: null,
};

export default TeamLogo;
