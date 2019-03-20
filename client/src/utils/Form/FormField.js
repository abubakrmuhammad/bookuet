import React from 'react';

const FormField = ({ fieldData, changed, id }) => {
  const render = () => {
    let template = null;

    switch (fieldData.element) {
      case 'input':
        template = (
          <div className='formBlock'>
            {fieldData.showLabel ? <div className='label_inputs'>{fieldData.config.label}</div> : null}
            <input
              {...fieldData.config}
              value={fieldData.value}
              onBlur={event => changed({ event, id, blur: true })}
              onChange={event => changed({ event, id })}
            />
          </div>
        );
        break;
      case 'select':
        template = (
          <div className='formBlock'>
            {fieldData.showLabel ? <div className='label_inputs'>{fieldData.config.label}</div> : null}
            <select onChange={event => changed({ event, id })} onBlur={event => changed({ event, id, blur: true })}>
              <option value=''>Select an Option</option>
              {fieldData.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        );
        break;
      case 'textarea':
        template = (
          <div className='formBlock'>
            {fieldData.showLabel ? <div className='label_inputs'>{fieldData.config.label}</div> : null}
            <textarea
              {...fieldData.config}
              value={fieldData.value}
              onBlur={event => changed({ event, id, blur: true })}
              onChange={event => changed({ event, id })}
            />
          </div>
        );
        break;
      default:
        template = null;
    }

    return template;
  };

  const showError = () => {
    let errorMessage = null;

    if (fieldData.validation && !fieldData.valid) {
      errorMessage = <div className='error_label'>{fieldData.validationMessage}</div>;
    }

    return errorMessage;
  };

  return (
    <div>
      {render()}
      {showError()}
    </div>
  );
};

export default FormField;
