import React from 'react';
import { FaRegSquare, FaRegDotCircle, FaRegEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function ServiceType({ type }) {
  let elem;
  switch (type) {
    case 'text':
      elem = (
        <>
          <FaRegEdit /> Text
        </>
      );
      break;
    case 'radio':
      elem = (
        <>
          <FaRegDotCircle /> Radio
        </>
      );
      break;
    case 'checkbox':
      elem = (
        <>
          <FaRegSquare /> Checkbox
        </>
      );
      break;
    default:
      elem = <>{type}</>;
      break;
  }

  return <span>{elem}</span>;
}

ServiceType.propTypes = {
  type: PropTypes.string.isRequired,
};
