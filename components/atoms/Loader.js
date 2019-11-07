import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Loader = styled.div((props) => css`
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.4em solid ${props.theme.colors.greyLigther};
  border-right: 0.4em solid  ${props.theme.colors.greyLigther};
  border-bottom: 0.4em solid  ${props.theme.colors.greyLigther};
  border-left: 0.4em solid ${props.theme.colors.grey};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
  border-radius: 50%;
  width: ${props.width || '5em'};
  height: ${props.height || '5em'};
  &:after {
    border-radius: 50%;
    width: ${props.width || '5em'};
    height: ${props.height || '5em'};
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`);

const LoaderMessage = (
  { children, className, size },
) => (
  <LoaderWrapper>
    <Loader className={className} width={size} height={size} />
    {children}
  </LoaderWrapper>
);

const LoaderWrapper = styled.div((props) => css`
  font-size: ${props.theme.sizes.s};
  text-align: center;
  font-weight: ${props.theme.weight.xlight};
  color: ${props.theme.colors.grey};
`);

LoaderMessage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string,
};

LoaderMessage.defaultProps = {
  children: null,
  className: '',
  size: '5em',
};

export default LoaderMessage;
