import styled from 'styled-components'

const Title = styled.p`
  font-weight: ${props => props.theme.weight.bold};
  font-size: ${props => props.theme.sizes.xl6};
  padding-bottom: ${props => props.theme.spacing.xs};
`

export default Title
