import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const BadgeStat = ({
  good,
  great,
  value,
  label,
}) => {
  const modifier = useMemo(() => {
    if (great) return 'great';
    if (good) return 'good';
    return '';
  }, [good, great]);
  const labelText = useMemo(() => (label ? ` ${label}` : ''), [label]);
  return (
    <Badge className={`${modifier}`}>
      {value}
      {labelText}
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
  label: PropTypes.string,
};

BadgeStat.defaultProps = {
  good: false,
  great: false,
  label: null,
};

export default BadgeStat;
