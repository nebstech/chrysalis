import React from 'react';
import PropTypes from 'prop-types';
import { ServiceCheckboxField, ServiceField } from '../../../classes/service/formField';

export default function CheckboxFieldEditor({ field, onChange }) {
  function editChoice(index) {
    return (evt) => {
      const newChoices = [...field.choices];
      newChoices.splice(index, 1, evt.currentTarget.value);
      const newField = new ServiceCheckboxField(field.prompt, newChoices);
      onChange(newField);
    };
  }

  function newChoice() {
    const newChoices = [...field.choices, ``];
    const newField = new ServiceCheckboxField(field.prompt, newChoices);
    onChange(newField);
  }

  function deleteChoice(index) {
    return () => {
      if (field.choices.length === 1) {
        return;
      }
      const newChoices = [...field.choices];
      newChoices.splice(index, 1);
      const newField = new ServiceCheckboxField(field.prompt, newChoices);
      onChange(newField);
    };
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {field.choices.map((choice, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={deleteChoice(idx)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            ✕
          </button>
          <input
            type="text"
            placeholder={`Choice ${idx + 1}`}
            value={choice}
            onChange={editChoice(idx)}
            style={{ flex: 1, padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      ))}
      <button onClick={newChoice} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #007bff', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
        ＋ Add new choice
      </button>
    </div>
  );
}

CheckboxFieldEditor.propTypes = {
  field: PropTypes.instanceOf(ServiceField).isRequired,
  onChange: PropTypes.func.isRequired,
};
