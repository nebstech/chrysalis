import { FaRegCheckSquare, FaRegDotCircle, FaAlignLeft } from 'react-icons/fa';
import styles from './ServiceType.module.css';
import PropTypes from 'prop-types';

export default function ServiceType({ type }) {
  let elem;
  switch (type) {
    case 'text':
      elem = (
        <>
          <FaAlignLeft />
          Text
        </>
      );
      break;
    case 'radio':
      elem = (
        <>
          <FaRegDotCircle />
          Radio
        </>
      );
      break;
    case 'checkbox':
      elem = (
        <>
          <FaRegCheckSquare />
          Checkbox
        </>
      );
      break;
    default:
      elem = <>{type}</>;
      break;
  }

  return (
    <div className={styles.flex}>
      {elem}
    </div>
  );
}

ServiceType.propTypes = {
  type: PropTypes.string.isRequired,
};
