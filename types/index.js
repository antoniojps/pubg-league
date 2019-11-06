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
  number,
} = PropTypes;

export const modifiersType = oneOfType([string, arrayOf(string)]);

export const actionType = shape({
  style: oneOf(['success', '', 'warning', 'danger']),
  title: string,
  href: string,
});

export const teamsType = arrayOf([shape({
  slot: number,
  team: shape({
    logo: shape({
      asset: shape({
        url: string,
      }),
    }),
    name: string,
    tag: string,
  }),
})]);

export const contentType = shape({
  title: string,
  action: {
    href: string,
    style: oneOf(['success', '', 'warning', 'danger']),
    title: string,
  },
  cgs: string,
  teams: arrayOf([shape({
    slot: number,
    team: shape({
      logo: shape({
        asset: shape({
          url: string,
        }),
      }),
      name: string,
      tag: string,
    }),
  })]),
});

export const contentDefaults = {
  action: {
    href: 'https://www.twitch.tv/shootsgud',
    title: 'Stream',
    style: 'primary',
  },
  cgs: null,
  teams: [],
  title: 'Tournament',
};
