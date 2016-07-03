import React, { PropTypes } from 'react';

const Button = ({ type, children, onClick }) => (
  <button type={type} onClick={onClick}>{children}</button>
);

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.any,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  children: null,
  onClick: null,
};

export default Button;
