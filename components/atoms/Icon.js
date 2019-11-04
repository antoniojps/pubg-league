/* eslint-disable react/style-prop-object */
/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

const getWidth = (originalWidth, originalHeight, currentHeight) => Math.round(currentHeight * (originalWidth / originalHeight));

export const icons = ['expand-more', 'expand-less'];

const Icon = ({
  icon, color, height, theme, modifiers,
}) => {
  const isInverseModifierActive = typeof modifiers === 'string'
    ? modifiers === 'inverse'
    : modifiers.includes('inverse');
  const iconColor = color
    || (isInverseModifierActive ? theme.colors.baseInverse : theme.colors.base);

  switch (icon) {
    case 'expand-more':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(24, 24, height)}
          height={height}
          viewBox="0 0 24 24"
        >
          <g fill={iconColor} fillRule="evenodd">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </g>
        </svg>
      );
    case 'expand-less':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(24, 24, height)}
          height={height}
          viewBox="0 0 24 24"
        >
          <g fill={iconColor} fillRule="evenodd">
            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </g>
        </svg>
      );
    case 'twitter':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(24, 24, height)}
          height={height}
          viewBox="0 0 24 20"
        >
          <path
            fill={iconColor}
            d="M7.548 19.2c9.056 0 14.01-7.387 14.01-13.794 0-.21 0-.418-.015-.626A9.934 9.934 0 0024 2.27a9.95 9.95 0 01-2.828.763A4.879 4.879 0 0023.337.352a9.962 9.962 0 01-3.127 1.176 4.985 4.985 0 00-5.916-.954c-1.964 1.035-2.98 3.24-2.475 5.376C7.859 5.754 4.17 3.913 1.67.885.363 3.1 1.031 5.934 3.195 7.356A4.946 4.946 0 01.96 6.75v.062c0 2.308 1.653 4.295 3.95 4.752a4.991 4.991 0 01-2.223.083c.645 1.975 2.494 3.328 4.6 3.367A9.98 9.98 0 010 17.023a14.1 14.1 0 007.548 2.173"
          />
        </svg>
      );
    case 'discord':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(24, 24, height)}
          height={height}
          viewBox="0 0 24 24"
        >
          <g fill={iconColor}>
            <path d="M10.328 10.068c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
            <path d="M20.54 0H4.46A2.466 2.466 0 002 2.472v16.224a2.466 2.466 0 002.46 2.472h13.608l-.636-2.22 1.536 1.428 1.452 1.344L23 24V2.472A2.466 2.466 0 0020.54 0zm-4.632 15.672s-.432-.516-.792-.972c1.572-.444 2.172-1.428 2.172-1.428-.492.324-.96.552-1.38.708-.6.252-1.176.42-1.74.516a8.406 8.406 0 01-3.108-.012 10.073 10.073 0 01-1.764-.516 7.032 7.032 0 01-.876-.408c-.036-.024-.072-.036-.108-.06a.166.166 0 01-.048-.036 4.21 4.21 0 01-.336-.204s.576.96 2.1 1.416c-.36.456-.804.996-.804.996-2.652-.084-3.66-1.824-3.66-1.824 0-3.864 1.728-6.996 1.728-6.996 1.728-1.296 3.372-1.26 3.372-1.26l.12.144c-2.16.624-3.156 1.572-3.156 1.572s.264-.144.708-.348c1.284-.564 2.304-.72 2.724-.756.072-.012.132-.024.204-.024A9.782 9.782 0 0117.3 7.308s-.948-.9-2.988-1.524l.168-.192s1.644-.036 3.372 1.26c0 0 1.728 3.132 1.728 6.996 0 0-1.02 1.74-3.672 1.824z" />
          </g>
        </svg>
      );
    case 'twitch':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(23, 24, height)}
          height={height}
          viewBox="0 0 23 24"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M-1 0h24v24H-1z" />
            <g fill={iconColor} fillRule="nonzero">
              <path d="M1.895 0L0 4.499v16.343h5.684V24h3.158L12 20.842h4.421l6.316-6.316V0H1.895zM20.21 13.263l-3.158 3.158h-5.685L8.211 19.58v-3.16H4.42V2.526h15.79v10.737z" />
              <path d="M16.421 12.632h-3.158V6.316h3.158v6.316zm-5.053 0H8.211V6.316h3.157v6.316z" />
            </g>
          </g>
        </svg>
      );
    case 'facebook':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(24, 24, height)}
          height={height}
        >
          <path
            fill={iconColor}
            d="M22.575 0H1.319C.59 0 0 .59 0 1.32v21.255c0 .73.591 1.32 1.319 1.32h11.443v-9.253H9.65v-3.607h3.113v-2.66c0-3.086 1.885-4.767 4.638-4.767 1.32 0 2.452.099 2.782.142v3.225l-1.91.001c-1.497 0-1.786.712-1.786 1.756v2.302h3.572l-.467 3.606h-3.105v9.254h6.089a1.32 1.32 0 001.32-1.319V1.318A1.32 1.32 0 0022.575 0z"
          />
        </svg>
      );
    default:
      return 'Invalid Icon';
  }
};

Icon.propTypes = {
  icon: PropTypes.oneOf(['expand-more', 'expand-less', 'twitter', 'discord', 'twitch', 'facebook'])
    .isRequired,
  color: PropTypes.string,
  height: PropTypes.number,
  modifiers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

Icon.defaultProps = {
  color: null,
  height: 24,
  modifiers: [],
};

export default withTheme(Icon);
