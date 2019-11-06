
import styled from 'styled-components';

export default styled.table`
th, td {
  text-align: center;
  border: 0;
}
th {
  font-size: ${(props) => props.theme.sizes.xs};
  text-transform: uppercase;
  border: 0 !important;
}
th.team {
  min-width: 400px;
  text-align: left;
}
td {
  font-size: ${(props) => props.theme.sizes.xl};
  color: ${(props) => props.theme.colors.base};
  font-weight: ${(props) => props.theme.weight.base};
}
td.small {
      font-size: ${(props) => props.theme.sizes.xs};
      font-weight: ${(props) => props.theme.weight.light};
    }
`;
