import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';
import { Spacer, Icon } from 'components/atoms';

export const TableHeader = ({
  children, onClick, active, order, theme,
}) => {
  const icon = useMemo(() => {
    if (!active) return 'sort';
    if (order === 'asc') {
      return 'asc';
    }
    if (order === 'desc') {
      return 'desc';
    }
    return 'sort';
  }, [order, active]);

  const color = useMemo(() => (active ? theme.colors.base : theme.colors.grey), [active]);

  return (
    <Th onClick={onClick} active={active}>
      <Content>
        <Spacer right="xs3">
          <Icon icon={icon} height={10} color={color} />
        </Spacer>
        {children}
      </Content>
    </Th>
  );
};
const Th = styled.th((props) => css`
  color: ${props.active ? props.theme.colors.base : props.theme.colors.grey};
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: ${props.theme.colors.base};
  }
`);

const Content = styled.div`
  display: flex;
  align-items: center;
`;

TableHeader.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  order: PropTypes.oneOf(['asc', 'desc']),
  theme: PropTypes.shape({}).isRequired,
};

TableHeader.defaultProps = {
  children: null,
  onClick: () => null,
  active: false,
  order: null,
};

export default withTheme(TableHeader);
