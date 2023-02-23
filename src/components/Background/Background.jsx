import React from 'react';
import PropTypes from 'prop-types';
import css from './Background.module.css';

const Background = ({ type, children }) => {
  const bgType = css[`mainBg${type}`];

  return <div className={`${css.mainBg} ${bgType}`}>{children}</div>;
};

Background.propTypes = {
  type: PropTypes.oneOf(['Primary', 'Secondary']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Background;
