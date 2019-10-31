import React, { useMemo } from 'react'
import styled, { withTheme, css } from 'styled-components'
import PropTypes from 'prop-types'

const spacing = {
  xs4: 'xs4',
  xs3: 'xs3',
  xs2: 'xs2',
  xs: 'xs',
  s: 's',
  sm: 'sm',
  m: 'm',
  l: 'l',
  xl: 'xl',
  xl1: 'xl1',
  xl2: 'xl2',
  xl3: 'xl3',
  xl4: 'xl4',
  xl5: 'xl5',
  xl6: 'xl6'
}

const spacingTypes = Object.keys(spacing)

const Spacer = ({
  theme,
  top,
  bottom,
  left,
  right,
  spacing,
  useMargin,
  children,
  debugMode
}) => {
  const spacingStyles = useMemo(() => {
    // get value from theme depending on key : eg: 'xl'
    const computeSpacing = key => {
      // if the key is false or 0 the component will remove spacing
      if (key === false || key === 0) return 0

      const themeSpacing = theme.spacing[key]
      if (!themeSpacing) {
        // eslint-disable-next-line no-console
        console.error(`Invalid spacing prop: ${key}`)
        return theme.spacing[spacing.m]
      }
      return themeSpacing
    }

    const topSpacing = top || (spacing || false)
    const rightSpacing = right || (spacing || false)
    const bottomSpacing = bottom || (spacing || false)
    const leftSpacing = left || (spacing || false)

    const computedSpacing = `${computeSpacing(topSpacing)} ${computeSpacing(
      rightSpacing
    )} ${computeSpacing(bottomSpacing)} ${computeSpacing(leftSpacing)}`

    return computedSpacing
  }, [theme.spacing, top, right, bottom, left, spacing])

  return (
    <SpacingStyles
      spacing={spacingStyles}
      useMargin={useMargin}
      addBorder={debugMode}
    >
      {children}
    </SpacingStyles>
  )
}

const SpacingStyles = styled.div`
  border: ${props => (props.addBorder ? '1px solid red' : 0)};
  ${props =>
    props.useMargin
      ? css`
          margin: ${props.spacing};
        `
      : css`
          padding: ${props.spacing};
        `};
`

const spacingPropType = PropTypes.oneOfType([
  PropTypes.oneOf(spacingTypes),
  PropTypes.bool
])

Spacer.propTypes = {
  theme: PropTypes.shape({}),
  spacing: spacingPropType,
  top: spacingPropType,
  right: spacingPropType,
  bottom: spacingPropType,
  left: spacingPropType,
  useMargin: PropTypes.bool,
  debugMode: PropTypes.bool,
  children: PropTypes.node.isRequired
}

Spacer.defaultProps = {
  spacing: false,
  top: null,
  right: null,
  bottom: null,
  left: null,
  useMargin: false,
  debugMode: false
}

export default withTheme(Spacer)
