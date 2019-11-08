import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { modifiersType } from 'types';

const LAYOUT_MODIFIERS = {
  stretch: () => `
    width: 100%;
    padding: 0;
  `,
};

const Layout = ({ children, modifiers, header: Header }) => (
  <Styles modifiers={modifiers}>
    <Header />
    <div className="zi-layout">{children}</div>
  </Styles>
);

const Styles = styled.div`
  .zi-layout {
    ${applyStyleModifiers(LAYOUT_MODIFIERS)};
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  modifiers: modifiersType,
};

Layout.defaultProps = {
  header: () => '',
  modifiers: [],
};

export default Layout;
