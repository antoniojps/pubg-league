import React, { useMemo } from 'react';
import useToggle from 'hooks/useToggle';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export const Collapse = ({ question, answer, children }) => {
  const [isOpen, toggle] = useToggle();
  const icon = useMemo(() => (isOpen ? 'zi-icon-minus' : 'zi-icon-plus'), [isOpen]);

  return (
    <div className="zi-collapse">
      <div className="zi-collapse-title" onClick={toggle}>
        <h3>{question}</h3>
        <i className={icon} />
      </div>
      {isOpen && (
      <p className="zi-collapse-content">
        {answer || children}
      </p>
      )}
    </div>
  );
};

Collapse.propTypes = {
  children: PropTypes.node,
  question: PropTypes.string,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Collapse.defaultProps = {
  children: null,
  answer: null,
  question: '',
};

export default Collapse;
