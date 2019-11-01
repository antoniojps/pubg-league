import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const Tab = ({ title, to, active }) => {
  const linkClass = useMemo(() => (active ? 'active' : ''), [active]);
  return (
    <TabStyle>
      <Link href={to}>
        <a className={linkClass}>{title}</a>
      </Link>
    </TabStyle>
  );
};

const TabStyle = styled.div`
  a {
    font-size: ${(props) => props.theme.sizes.xl3};
    padding: ${(props) => props.theme.spacing.xs3};
    margin-right: ${(props) => props.theme.spacing.xs};
    &.active {
      font-weight: ${(props) => props.theme.weight.bold};
      color: ${(props) => props.theme.colors.base};
      border-bottom: 2px solid ${(props) => props.theme.colors.base};
    }
  }
`;

Tab.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  active: PropTypes.bool,
};

Tab.defaultProps = {
  title: '',
  to: '/',
  active: false,
};

export default Tab;
