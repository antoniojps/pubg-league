import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const Tab = ({
  title, active, as, pathname,
}) => {
  const linkClass = useMemo(() => (active ? 'active' : ''), [active]);
  return (
    <TabStyle>
      <Link href={pathname} as={as}>
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
  as: PropTypes.string,
  pathname: PropTypes.string,
  active: PropTypes.bool,
};

Tab.defaultProps = {
  title: '',
  to: '/',
  as: '/',
  pathname: '/',
  active: false,
};

export default Tab;
