import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const BadgeStat = ({
  good,
  great,
  value,
}) => {
  const modifier = useMemo(() => {
    if (great) return 'great';
    if (good) return 'good';
    return '';
  }, [good, great]);
  return (
    <Badge className={`${modifier}`}>
      {value}
    </Badge>
  );
};

const Badge = styled.span((props) => css`
  font-size: 1rem;
  font-weight: ${props.theme.weight.base};
  color: ${props.theme.colors.base};

  &.great {
    color: ${props.theme.colors.red};
  }
  &.good {
    color: ${props.theme.colors.yellow};
  }
`);

BadgeStat.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  good: PropTypes.bool,
  great: PropTypes.bool,
};

BadgeStat.defaultProps = {
  good: false,
  great: false,
};

export default BadgeStat;
