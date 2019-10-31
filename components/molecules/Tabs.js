import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Tabs = ({ tabs }) => {
  const router = useRouter()

  return (
    <div>
      <Line />
    </div>
  )
}

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.border};
`

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      to: PropTypes.string
    })
  )
}

Tabs.defaultProps = {
  tabs: []
}

export default Tabs
