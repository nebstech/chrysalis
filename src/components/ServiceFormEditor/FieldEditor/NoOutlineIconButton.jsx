import React from 'react';
import PropTypes from 'prop-types';
import styles from './NoOutlineIconButton.module.css';

const NoOutlineIconButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.iconButton}>
      {children}
    </button>
  );
};

NoOutlineIconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NoOutlineIconButton;
