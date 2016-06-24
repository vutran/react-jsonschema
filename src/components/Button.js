import React, { PropTypes } from 'react';

const Button = ({ type, children, onClick }) => (
  <button type={type || 'button'} onClick={onClick}>{children}</button>
);

Button.propTypes = {
  type: PropTypes.oneOfType(['button', 'submit']),
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default Button;
