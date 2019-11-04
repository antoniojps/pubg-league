import styled from 'styled-components';
import PropTypes from 'prop-types';

const Clamp = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.lines};
  -webkit-box-orient: vertical;
`;

Clamp.propTypes = {
  lines: PropTypes.number,
};

Clamp.defaultProps = {
  lines: 2,
};

export default Clamp;
