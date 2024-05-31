import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckIcon,
  ClockIcon,
  Cross1Icon,
  EnvelopeClosedIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import styles from './StatusTab.module.css';

export default function StatusTab({ status }) {
  switch (status) {
    case 'pending':
      return (
        <div className={styles.iconStyle}>
          <EnvelopeClosedIcon /> Pending
        </div>
      );
    case 'accepted':
      return (
        <div className={styles.iconStyle}>
          <ClockIcon /> Accepted
        </div>
      );
    case 'inProgress':
      return (
        <div className={styles.iconStyle}>
          <RocketIcon /> In Progress
        </div>
      );
    case 'rejected':
      return (
        <div className={styles.iconStyle}>
          <Cross1Icon /> Rejected
        </div>
      );
    case 'done':
      return (
        <div className={styles.iconStyle}>
          <CheckIcon /> Done
        </div>
      );
    default:
      return null;
  }
}

StatusTab.propTypes = {
  status: PropTypes.oneOf(['pending', 'accepted', 'inProgress', 'rejected', 'done']).isRequired,
};
