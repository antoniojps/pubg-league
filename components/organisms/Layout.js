import React from 'react';
import PropTypes from 'prop-types';
import '@zeit-ui/style';
import Nav from './Nav';

const Layout = ({ children }) => (
  <>
    <Nav />
    <div className="zi-layout">{children}</div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
