import styled from 'styled-components';

const Title = styled.h1`
  font-weight: ${(props) => props.theme.weight.bold};
  font-size: ${(props) => props.theme.sizes.xl6};
  margin: 0;
`;

export default Title;
