import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const BadgeStat = ({
  good,
  great,
  value,
  label,
}) => {
  const modifier = useMemo(() => {
    if (great) return 'danger';
    if (good) return 'warning';
    return '';
  }, [good, great]);
  return (
    <span className={`zi-badge ${modifier}`}>
      {value}
      {' '}
      {label}
    </span>
  );
};

BadgeStat.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  good: PropTypes.bool,
  great: PropTypes.bool,
};

BadgeStat.defaultProps = {
  good: false,
  great: false,
};

export default BadgeStat;
