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
    case 'sort':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(18, 12, height)}
          height={height}
          viewBox="0 0 18 22"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M-3-1h24v24H-3z" />
            <path
              fill={iconColor}
              fillRule="nonzero"
              d="M5.04 22h-.72c-.596 0-1.08-.462-1.08-1.031V5.5H1.082C.12 5.5-.361 4.387.317 3.74l3.6-3.438a1.116 1.116 0 011.527 0l3.6 3.438c.675.645.202 1.76-.764 1.76H6.12v15.469c0 .57-.483 1.031-1.08 1.031zm6.84-20.969V16.5H9.72c-.959 0-1.443 1.111-.764 1.76l3.6 3.438a1.116 1.116 0 001.527 0l3.6-3.438c.676-.645.2-1.76-.764-1.76h-2.16V1.031C14.76.461 14.277 0 13.68 0h-.72c-.596 0-1.08.462-1.08 1.031z"
            />
          </g>
        </svg>
      );
    case 'desc':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(18, 12, height)}
          height={height}
          viewBox="0 0 18 12"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M-3-6h24v24H-3z" />
            <path
              fill={iconColor}
              fillRule="nonzero"
              d="M0 0h6v2H0V0zm0 12v-2h18v2H0zm0-7h12v2H0V5z"
            />
          </g>
        </svg>
      );
    case 'asc':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(18, 12, height)}
          height={height}
          viewBox="0 0 18 12"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
            transform="translate(-91 -210) translate(88 204)"
          >
            <path d="M0 0L24 0 24 24 0 24z" />
            <path
              fill={iconColor}
              fillRule="nonzero"
              d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
            />
          </g>
        </svg>
      );
    case 'arrow-forward':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(24, 24, height)}
          height={height}
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill={iconColor}
            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
          />
        </svg>
      );
    case 'miramar':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(12, 16, height)}
          height={height}
          viewBox="0 0 12 16"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M-6-4h24v24H-6z" />
            <path
              fill={iconColor}
              fillRule="nonzero"
              d="M0 15.167h10.376c-2.093-1.131-3.139-1.944-3.139-2.438V8.228c2.064-.402 3.284-1.243 3.662-2.522.567-1.918.872-3.357-.523-3.357S9.2 4.835 8.501 5.445c-.465.407-.886.712-1.264.915V1.826C7.15.431 6.525-.164 5.362.04 4.2.243 3.648 1.014 3.706 2.35l.61 6.847c-1.424.177-2.136-.361-2.136-1.612v-2.14c-.145-.522-.465-.784-.96-.784-.493 0-.9.262-1.22.785V8.67c0 .872.407 1.497 1.22 1.875.815.378 1.352.596 1.614.654h1.482v1.7c-.261.32-.974.712-2.136 1.177-1.163.465-1.89.828-2.18 1.09z"
            />
          </g>
        </svg>
      );
    case 'erangel':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(19, 16, height)}
          height={height}
          viewBox="0 0 19 16"
        >
          <path
            fill={iconColor}
            d="M9.322 12.49l.12 2.94h-1.2v-2.676l-.695.369.178.124h-.412l-1.352.717.781 1.112-2.635-1.193.101 2.1H3.201v-1.911L.983 15.076l1.286-1.829H0l3.126-2.173H.983L2.9 9.504l-1.588-.108L2.899 7.91H1.487l2.355-2.935v-.003l.001.002.008-.01v.019L6.237 7.91H4.825l1.588 1.485-1.588.107 1.078.884 2.247-1.83H5.589l2.29-2.2-1.898-.15 1.898-2.08H6.192L9.007.015V.011l.001.002L9.017 0v.026l2.852 4.1h-1.687l1.898 2.08-1.898.15L12.29 8.38l1.092-1.02H11.97l2.355-2.936v-.003.002l.008-.01v.019L16.72 7.36h-1.412l1.588 1.484-1.588.108 1.916 1.57H15.08l3.126 2.173h-2.269l1.286 1.829-2.635-1.193.1 2.1h-1.005V13.52l-1.256.568.044.073-.094-.05-.912.413.46-.653-2.604-1.381zm-3.499 1.28l.314-.523h-.682l.368.523zm.781-1.301l.522-.87H5.354l1.25.87zm-1.757-1.222l.212-.173h-.46l.248.173zm7.255-2.691H9.911l1.983 1.615 1.488-1.22-1.588-.107.308-.288zm.223 1.966l.591.482.693-.482h-1.284zm-.266 1.077h-1.124l.331.552.793-.552zm-.466 1.096l.533.89.626-.89h-1.16z"
          />
        </svg>
      );
    case 'sanhok':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={getWidth(20, 16, height)}
          height={height}
          viewBox="0 0 20 16"
        >
          <path
            fill={iconColor}
            d="M12.53 5.247c1.073-.803 1.91-.964 2.511-.483.676.541.947 1.434.812 2.679 1.542-.65 2.61-.528 3.205.365.596.893.853 1.515.771 1.866-1.04-1.183-1.786-1.705-2.239-1.566-.453.14-.64.418-.56.835.297 1.37.297 2.267 0 2.692-.298.424-.542.758-.73 1.002.196-1.518.212-2.445.044-2.782a.758.758 0 00-.491-.424c-1.055-.284-1.937.15-2.571 1.177-.423.684-.622 2.312-.596 4.883-.67.015-1.221.02-1.651.015h-1.69c.7-3.08.7-5.146 0-6.196-.7-1.05-1.312-1.978-1.837-2.783-.63.385-.945 1.313-.945 2.783v4.043c-.805-1.155-1.208-2.503-1.208-4.043V7.735c-.42-.105-.787.245-1.102 1.05-.315.805-.473 1.103-.473.893-.087-1.243.126-2.103.637-2.58.512-.477.94-.766 1.285-.866-.14-.468-.523-.573-1.15-.314-.628.259-1.497.865-2.61 1.817-.034-.84.263-1.505.893-1.995.63-.49 1.103-.77 1.418-.84-1.54 0-2.608.542-3.203 1.627A95.924 95.924 0 000 8.47c.58-3.148 1.676-4.862 3.286-5.143 1.61-.282 2.86-.177 3.75.313C6.946 1.877 7.54.774 8.82.332c1.28-.443 2.33-.443 3.15 0-1.308.185-2.267.666-2.878 1.442-.61.776-.806 1.503-.587 2.18.771-1.054 1.594-1.404 2.467-1.05.845.343 1.364 1.124 1.557 2.343zm-.069.052c-1.29-1.059-2.328-1.314-3.115-.767-.805.56-.98.963-.525 1.208 1.68 1.47 2.52 2.66 2.52 3.57 0 .418-.006 1.078-.017 1.982.614-1.262 1.266-2.045 1.958-2.349.752-.33 1.167-.534 1.246-.613-.27-.592-.546-.887-.826-.887h-1.867c.424-.758.978-1.137 1.664-1.137.686 0 1.12.217 1.299.65-.054-.92-.42-1.38-1.096-1.38H12.12a9.28 9.28 0 01.342-.277z"
          />
        </svg>
      );
    default:
      return 'Invalid Icon';
  }
};

Icon.propTypes = {
  icon: PropTypes.oneOf(['expand-more', 'expand-less', 'arrow-forward', 'twitter', 'discord', 'twitch', 'facebook', 'sort', 'miramar', 'erangel', 'sanhok', 'desc', 'asc'])
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
