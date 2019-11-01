import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tab } from 'components/atoms';
import { useRouter } from 'next/router';

const Tabs = ({ tabs }) => {
  const { asPath } = useRouter();
  return (
    <>
      <TabsList className="zi-layout">
        {tabs.map(({ title, to }) => (
          <Tab key={title} title={title} to={to} active={asPath === to} />
        ))}
      </TabsList>
      <Line />
    </>
  );
};


const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.border};
  margin-top: ${(props) => props.theme.spacing.xs4};
`;

const TabsList = styled.div`
  display: flex;
  padding-top: 0;
`;

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      to: PropTypes.string,
    }),
  ),
};

Tabs.defaultProps = {
  tabs: [],
};

export default Tabs;
