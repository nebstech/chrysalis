
import PropTypes from 'prop-types';
import { RequestTextField } from '../../../classes/service/service';

export default function TaskDetailTextField({ field }) {
  return (
    <textarea value={field.value} disabled={true} />
  );
}

TaskDetailTextField.propTypes = {
  field: PropTypes.instanceOf(RequestTextField).isRequired,
};
