import React from 'react'
import PropTypes from 'prop-types'
import '@zeit-ui/style'

const Layout = ({ children }) => {
  return <div className="zi-layout">{children}</div>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
