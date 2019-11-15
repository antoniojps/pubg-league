import React, { useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import useToggle from 'hooks/useToggle';
import useOnClickOutside from 'hooks/useOnClickOutside';
import PropTypes from 'prop-types';
import Link from 'next/link';

const externalLinkProps = {
  target: '_blank', rel: 'noopener noreferrer',
};

export const Popover = ({ children, links }) => {
  const [isOpen, toggle] = useToggle();
  const ref = useRef();

  const computeClass = useMemo(() => {
    const pre = 'zi-popover-dropdown left';
    return isOpen ? `${pre} visible` : pre;
  }, [isOpen]);

  const handleToggle = (e) => {
    e.stopPropagation();
    toggle();
  };

  const close = (e) => {
    e.stopPropagation();
    if (isOpen) toggle();
  };

  useOnClickOutside(ref, close);

  return (
    <Wrapper className="zi-popover" ref={ref}>
      <span className="zi-popover-host" onClick={handleToggle}>
        {children}
      </span>
      <div className={computeClass}>
        {links.map(({
          href, title, text, as, isExternal = false,
        }) => {
          const external = isExternal ? externalLinkProps : {};
          return (
            <div className="zi-popover-item" key={href + text} onClick={close}>
              <Link href={href} as={as}>
                <a title={title} {...external}>{text}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div((props) => css`
  .zi-popover-dropdown {
    top: 80%;
    opacity: 0;
    transition: opacity 0.2s ease;

    &.visible {
      opacity: 1;
    }
  }
`);

Popover.propTypes = {
  children: PropTypes.node,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      as: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
};

Popover.defaultProps = {
  children: null,
  links: [],
};

export default Popover;
