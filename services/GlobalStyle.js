// Special StyledComponent that handles global styles
// https://www.styled-components.com/docs/api#createglobalstyle

import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  html {
    font-size: 16px;
  }

  body {
    min-width: 800px;
  }

  ::selection {
      background-color: #FFEB3B;
  }

  a {
    color: ${(props) => props.theme.colors.grey};
    transition: color 0.2s ease;
    &:hover {
      color: ${(props) => props.theme.colors.greyDarker};
      text-decoration: none;
    }
  }
`;
export default GlobalStyle;
