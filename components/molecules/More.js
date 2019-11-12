import React, { useMemo } from 'react';
import useToggle from 'hooks/useToggle';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export const More = ({ children }) => {
  const [isOpen, toggle] = useToggle();
  const icon = useMemo(() => (isOpen ? 'zi-icon-down' : 'zi-icon-up'), [isOpen]);
  const message = useMemo(() => (isOpen ? 'Show less' : 'Show more'), [isOpen]);
  return (
    <Container>
      <div className="zi-more">
        <button className="zi-btn circular small auto" type="button" onClick={toggle}>
          {message}
          <i className={`suffix ${icon}`} />
        </button>
      </div>
      {isOpen && (
        <Content>
          {children}
        </Content>
      )}
    </Container>
  );
};

More.propTypes = {
  children: PropTypes.node,
};

More.defaultProps = {
  children: null,
};

const Content = styled.div((props) => css`
`);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default More;
