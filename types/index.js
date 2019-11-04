/*
  Centralized PropTypes
  Read more here: https://medium.freecodecamp.org/react-pattern-centralized-proptypes-f981ff672f3b
*/

import PropTypes from 'prop-types';

const {
  string,
  oneOfType,
  arrayOf,
  shape,
  oneOf,
} = PropTypes;

export const modifiersType = oneOfType([string, arrayOf(string)]);

export const actionType = shape({
  style: oneOf(['success', '', 'warning', 'danger']),
  text: string,
  href: string,
});
