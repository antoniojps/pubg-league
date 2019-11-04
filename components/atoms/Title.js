import styled from 'styled-components';
import { below } from 'services/breakpoints';

const Title = styled.h1`
  font-weight: ${(props) => props.theme.weight.bold};
  font-size: ${(props) => props.theme.sizes.xl6};
  margin: 0;
  ${below.md`
    font-size: ${(props) => props.theme.sizes.xl4};
  `}
`;

export default Title;
